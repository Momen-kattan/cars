import { FormControl, Paper, Avatar, IconButton, Button } from "@mui/material";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
interface FileListItem {
  file: File;
  url: string;
}
interface Props {
  fileList: FileListItem[];
  setFileList: (e: any) => void;
  setNumFilesSelected: (e: any) => void;
  setValues: (e: any) => void;
}
const UploadImage = ({
  fileList,
  setFileList,
  setNumFilesSelected,
  setValues,
}: Props) => {
  const handleDelete = (index: number, setter?: Function) => {
    const newFileList = [...fileList];
    newFileList.splice(index, 1);
    setFileList(newFileList);
    setter?.((values: { file: [] }) => ({
      ...values,
      file: values.file.filter((_, i) => i !== index),
    }));
    setNumFilesSelected(
      (prevNumFilesSelected: number) => prevNumFilesSelected - 1
    );
  };

  return (
    <>
      {(fileList as [])?.length > 0 && (
        <Paper
          sx={{
            width: "30vw",
            height: "50vh",
            overflow: "scroll",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {fileList?.map((img, index) => (
            <div key={index} style={{ position: "relative" }}>
              <Avatar
                src={img.url}
                alt="uploaded car"
                variant="square"
                sx={{ height: "15vh", width: "12vw" }}
              />
              <IconButton
                onClick={() => handleDelete(index, setValues)}
                style={{ position: "absolute", top: 0, right: 0 }}
              >
                <ClearIcon />
              </IconButton>
            </div>
          ))}
        </Paper>
      )}
    </>
  );
};

export default UploadImage;
