import { Button } from "@mui/material";
import React from "react";
interface FileListItem {
  file: File;
  url: string;
}
interface Porps {
  setValues: (e: any) => void;
  setFileList: (e: any) => void;
  setNumFilesSelected: (e: any) => void;
  numFilesSelected: number;
}
const UploadFileButton = ({
  numFilesSelected,
  setFileList,
  setNumFilesSelected,
  setValues,
}: Porps) => {
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter?: Function
  ) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const promises = Array.from(selectedFiles).map((selectedFile) => {
        return new Promise((resolve) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(selectedFile);
          fileReader.onload = () => {
            const dataUrl = fileReader.result as string;
            resolve({
              file: selectedFile,
              url: dataUrl,
              type: selectedFile.type,
            });
          };
        });
      });
      Promise.all(promises).then((fileList) => {
        setFileList((prevFileList: FileListItem[]) => {
          const newFileList = [...prevFileList];
          fileList.forEach((file: any) => {
            if (!newFileList.some((f) => f.file === file.file)) {
              newFileList.push(file);
            }
          });
          return newFileList;
        });
        setter?.((values: { file: [] }) => ({
          ...values,
          file: [...values.file, ...selectedFiles],
        }));
        setNumFilesSelected(
          (prevNumFilesSelected: number) =>
            prevNumFilesSelected + selectedFiles.length
        );
      });
    }
  };
  return (
    <>
      <Button variant="contained" component="label">
        Upload File
        <input
          type="file"
          hidden
          required
          accept="image/*"
          multiple
          onChange={(e) => handleFileChange(e, setValues)}
          name="file"
        />
      </Button>
      <p>Number of files selected: {numFilesSelected}</p>
    </>
  );
};

export default UploadFileButton;
