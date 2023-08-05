import { Box, Button, FormControl, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import setAuthToken from "../../interceptor";
import { TextField } from "./components";
import CarBrand from "./components/CarBrand";
import CarModel from "./components/CarModel";
import CarType from "./components/CarType";
import CleanTitle from "./components/CleanTitle";
import Country from "./components/Country";
import Cylinders from "./components/Cylinders";
import DamageList from "./components/DamageList";
import DriveType from "./components/DriveType";
import EngineCapacity from "./components/EngineCapacity";
import EngineType from "./components/EngineType";
import GearType from "./components/GearType";
import MainSection from "./components/MainSection";
import ManufacturingYear from "./components/ManufacturingYear";
import Province from "./components/Province";
import UploadFileButton from "./components/UploadFileButton";
import UploadImage from "./components/UploadImage";
import useProfile from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { checkoutSchema } from "./utils/checkoutSchema";
import axiosInstance from "../../services/APIClient";

const initialValues = {
  mileage: "",
  color: "",
  type: "",
  manufacturing_year: "",
  clean_title: "",
  engine_type: "",
  gear_type: "",
  cylinders: "",
  notes: "",
  location: "",
  car_models: "",
  damageList: [],
  file: "",
  damage: "",
  engine_capacity: "",
  driveType: "",
  technical_condition: [],
};
interface FileListItem {
  file: File;
  url: string;
}

const SellYourCar = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [fileList, setFileList] = useState<FileListItem[]>([]);
  const [damageState, SetDamageState] = useState("");
  const [provineceData, setProvineceData] = useState<any>([]);
  const [carModelData, setCarModelData] = useState<any>([]);
  const [numFilesSelected, setNumFilesSelected] = useState<number>(0);
  const { data: profile } = useProfile();
  const navigate = useNavigate();
  const client = useQueryClient();

  const onSubmit = async (values: any) => {
    await axiosInstance.post("/car/", values).then((res) => {
      const imageParameter = { file: values.file, car_id: res.data.id };
      axiosInstance.post("/upload_images", imageParameter, {
        headers: { "Content-type": "multipart/form-data" },
      });
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
  }, []);

  return (
    <Box m="20px ">
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        // validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setValues,
          resetForm,
        }) => {
          console.log(values);
          return (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  sx={{ height: "50px" }}
                  label="Mileage on (km)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mileage}
                  name="mileage"
                  error={!!touched.mileage && !!errors.mileage}
                  helperText={touched.mileage && errors.mileage}
                  required
                />
                <TextField
                  sx={{ height: "50px" }}
                  label=" your car color"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.color}
                  name="color"
                  error={!!touched.color && !!errors.color}
                  helperText={touched.color && errors.color}
                  required
                />

                <TextField
                  label="Notes and Special specifications about your car:"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.notes}
                  name="notes"
                  error={!!touched.notes && !!errors.notes}
                  helperText={touched.notes && errors.notes}
                />
                <CarType value={values.type} handle={handleChange} />
                <EngineCapacity
                  value={values.engine_capacity}
                  handle={handleChange}
                />
                <ManufacturingYear
                  value={values.manufacturing_year}
                  handle={handleChange}
                />
                <EngineType value={values.engine_type} handle={handleChange} />
                <GearType value={values.gear_type} handle={handleChange} />
                <Cylinders value={values.cylinders} handle={handleChange} />
                <Country SetProvinece={setProvineceData} />
                <Province Provinece={provineceData} handle={handleChange} />
                <CarBrand SetCarModel={setCarModelData} />
                <CarModel handle={handleChange} carModels={carModelData} />
                <CleanTitle handle={handleChange} value={values.clean_title} />
                <DamageList
                  SetValue={setValues}
                  clean_title={values.clean_title}
                  value={values.damageList}
                  damageState={damageState}
                  SetDamageState={SetDamageState}
                />
                <FormControl></FormControl>
                <DriveType handle={handleChange} />
                <FormControl variant="outlined">
                  <h2>Add your car images:</h2>
                  <UploadImage
                    fileList={fileList}
                    setFileList={setFileList}
                    setNumFilesSelected={setNumFilesSelected}
                    setValues={setValues}
                  />
                  <UploadFileButton
                    setFileList={setFileList}
                    numFilesSelected={numFilesSelected}
                    setNumFilesSelected={setNumFilesSelected}
                    setValues={setValues}
                  />
                </FormControl>
                <MainSection values={values} setValues={setValues} />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Stack direction="row" spacing={3}>
                  {profile?.user_kind === "Company" ? (
                    <Button
                      type="submit"
                      color="secondary"
                      onClick={() => {
                        setValues({
                          ...values,
                          damage: damageState,
                        });
                        window.location.reload();
                      }}
                      variant="contained"
                    >
                      save and add another car
                    </Button>
                  ) : (
                    <></>
                  )}

                  <Button
                    type="submit"
                    color="secondary"
                    onClick={() => {
                      setValues({
                        ...values,
                        damage: damageState,
                      });
                    }}
                    variant="contained"
                  >
                    submit your car information
                  </Button>
                </Stack>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default SellYourCar;
