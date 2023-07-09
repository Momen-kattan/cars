import React, { ChangeEvent, EventHandler, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { Formik } from "formik";
import { checkoutSchema } from "./utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TextField } from "./components";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import useCountry from "../../hooks/useCountry";
import setAuthToken from "../../interceptor";
import useBrands from "../../hooks/useBrands";
import useCar from "../../hooks/useCar";
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
  price: "",
  location: "",
  brand: "",
  car_models: "",
  file: "",
};
interface FileListItem {
  file: File;
  url: string;
}
const years = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);
const SellYourCar = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [fileList, setFileList] = useState<FileListItem[]>([]);
  const [handle, setHandle] = useState<any>([]);
  const [provineceData, setProvineceData] = useState<any>([]);
  const [carModelData, setCarModelData] = useState<any>([]);
  const {
    data: countrys,
    error: errorCountry,
    isLoading: loadCountry,
  } = useCountry();
  const {
    data: brands,
    error: errorBrands,
    isLoading: loadBrands,
  } = useBrands();
  const { data: cars, error: errorCars, isLoading: LoadCars } = useCar();
  const onSubmit = async (values: any) => {
    return await axios.post("http://192.168.43.198:8000/car/", values, {
      headers: { "Content-type": "multipart/form-data" },
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
  }, []);
  const handleSelect = async (event: any) => {
    let provinece = await axios.get(
      `https://abdelwahapbak2.pythonanywhere.com/province/${event.target.value}`
    );
    setProvineceData(provinece.data);
  };

  const handleChose = async (event: any) => {
    let car_model = await axios.get(
      `https://abdelwahapbak2.pythonanywhere.com/car_model/${event.target.value}`
    );
    setCarModelData(car_model.data);
  };

  const { mutate } = useMutation(onSubmit);
  // const handleFileChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   setter?: Function
  // ) => {
  //   const selectedFile = event.target.files?.[0];
  //   if (selectedFile) {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(selectedFile);
  //     fileReader.onload = () => {
  //       const dataUrl = fileReader.result as string;
  //       setImageUrl([...(imageUrl as string[]), dataUrl]);
  //       setter?.((values: { file: [] }) => ({
  //         ...values,
  //         file: [...values.file, selectedFile],
  //       }));
  //     };
  //   }
  // };
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter?: Function
  ) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles?.length; i++) {
        const selectedFile = selectedFiles[i];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(selectedFile);
        fileReader.onload = () => {
          const dataUrl = fileReader.result as string;
          setFileList((prevFileList) => [
            ...prevFileList,
            { file: selectedFile, url: dataUrl },
          ]);
          setter?.((values: { file: [] }) => ({
            ...values,
            file: [...values.file, selectedFile],
          }));
        };
      }
    }
  };
  return (
    <Box m="20px ">
      <Formik
        onSubmit={mutate}
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
        }) => {
          return (
            <form
              onSubmit={handleSubmit}
              method="Post"
              encType="multipart/form-data"
            >
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  label="Mileage (km)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mileage}
                  name="mileage"
                  error={!!touched.mileage && !!errors.mileage}
                  helperText={touched.mileage && errors.mileage}
                />
                <TextField
                  label="color"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.color}
                  name="color"
                  error={!!touched.color && !!errors.color}
                  helperText={touched.color && errors.color}
                />
                <TextField
                  label="Price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="notes about your car  "
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.notes}
                  name="notes"
                  error={!!touched.notes && !!errors.notes}
                  helperText={touched.notes && errors.notes}
                />
                <FormControl variant="outlined">
                  <InputLabel sx={{ fontSize: 20 }}>
                    Select your car type
                  </InputLabel>
                  <Select
                    labelId="type"
                    id="type"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    required
                    label="type"
                    autoComplete="type"
                  >
                    <MenuItem value={"COUPE"}>COUPE</MenuItem>
                    <MenuItem value={"SPORTS CAR"}>SPORTS CAR</MenuItem>
                    <MenuItem value={"HATCHBACK"}>HATCHBACK</MenuItem>
                    <MenuItem value={"CONVERTIBLE"}>CONVERTIBLE</MenuItem>
                    <MenuItem value={"SUV"}>SUV</MenuItem>
                    <MenuItem value={"MINIVAN"}>MINIVAN</MenuItem>
                    <MenuItem value={"PICKUP"}>PICKUP</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel
                    id="manufacturing_year_label"
                    sx={{ fontSize: 20 }}
                  >
                    Manufacturing Year
                  </InputLabel>
                  <Select
                    labelId="manufacturing_year_label"
                    id="manufacturing_year"
                    value={values.manufacturing_year}
                    onChange={handleChange}
                    name="manufacturing_year"
                    label="Manufacturing Year"
                    error={
                      touched.manufacturing_year && !!errors.manufacturing_year
                    }
                    renderValue={(selected) => selected || "Select Year"}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel sx={{ fontSize: 20 }}>
                    Select your engine_type
                  </InputLabel>
                  <Select
                    labelId="engine_type"
                    id="engine_type"
                    name="engine_type"
                    value={values.engine_type}
                    onChange={handleChange}
                    required
                    label="engine_type"
                    autoComplete="engine_type"
                  >
                    <MenuItem value={"ESS"}>
                      Internal petrol combustion engine
                    </MenuItem>
                    <MenuItem value={"DSL"}>
                      Diesel internal combustion engine
                    </MenuItem>
                    <MenuItem value={"BEV"}>battery electric vehicle</MenuItem>
                    <MenuItem value={"HEV"}>Hybrid electric vehicle</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel sx={{ fontSize: 20 }}>
                    Select your gear_type
                  </InputLabel>
                  <Select
                    labelId="gear_type"
                    id="gear_type"
                    name="gear_type"
                    value={values.gear_type}
                    onChange={handleChange}
                    defaultValue="Automatic"
                    required
                    label="gear_type"
                    autoComplete="gear_type"
                  >
                    <MenuItem value={"Manual"}>Manual</MenuItem>
                    <MenuItem value={"Automatic"}>Automatic</MenuItem>
                    <MenuItem value={"Easytronic"}>Easytronic</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel id="cylinders-label" sx={{ fontSize: 20 }}>
                    Cylinders
                  </InputLabel>
                  <Select
                    labelId="cylinders-label"
                    id="cylinders"
                    name="cylinders"
                    value={values.cylinders}
                    onChange={handleChange}
                    label="Cylinders"
                    error={touched.cylinders && !!errors.cylinders}
                    renderValue={(selected) => selected || "Select cylinders"}
                  >
                    <MenuItem value="V2">V2</MenuItem>
                    <MenuItem value="V4">V4</MenuItem>
                    <MenuItem value="V6">V6</MenuItem>
                    <MenuItem value="V8">V8</MenuItem>
                    <MenuItem value="V10">V10</MenuItem>
                    <MenuItem value="V12">V12</MenuItem>
                  </Select>
                  {touched.cylinders && errors.cylinders && (
                    <FormHelperText>{errors.cylinders}</FormHelperText>
                  )}
                </FormControl>

                <FormControl>
                  <InputLabel id="country-label" sx={{ fontSize: 20 }}>
                    Select your country{" "}
                  </InputLabel>
                  <Select
                    labelId="country-label"
                    // id="location"
                    // name="location"
                    onChange={handleSelect}
                    error={!!touched.location && !!errors.location}
                    required
                    label="Select your location"
                    autoComplete="location"
                  >
                    {countrys?.map((country) => (
                      <MenuItem key={country.country_name} value={country.id}>
                        {country.country_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel id="province-label" sx={{ fontSize: 20 }}>
                    Select your province{" "}
                  </InputLabel>
                  <Select
                    labelId="province-label"
                    id="location"
                    name="location"
                    onChange={handleChange}
                    error={!!touched.location && !!errors.location}
                    required
                    label="Select your location"
                    autoComplete="location"
                  >
                    {provineceData?.map((province: any) => (
                      <MenuItem
                        key={province.province_name}
                        value={province.id}
                      >
                        {province.province_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl
                  component="fieldset"
                  error={!!touched.clean_title && !!errors.clean_title}
                >
                  <FormLabel component="legend">Clean title:</FormLabel>
                  <RadioGroup
                    aria-label="clean_title"
                    name="clean_title"
                    value={values.clean_title}
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                  {touched.clean_title && errors.clean_title && (
                    <FormHelperText>{errors.clean_title}</FormHelperText>
                  )}
                </FormControl>

                <FormControl>
                  <InputLabel id="brand-label" sx={{ fontSize: 20 }}>
                    Select your car brand
                  </InputLabel>
                  <Select
                    labelId="brand-label"
                    id="brand"
                    name="brand"
                    onChange={handleChose}
                    error={!!touched.brand && !!errors.brand}
                    required
                    label="Select your car brand"
                    autoComplete="brand"
                  >
                    {brands?.map((brand: any) => (
                      <MenuItem key={brand.name} value={brand.id}>
                        {brand.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel id="Model-label" sx={{ fontSize: 20 }}>
                    Select your car Model
                  </InputLabel>
                  <Select
                    labelId="car_model-label"
                    id="car_models"
                    name="car_models"
                    onChange={handleChange}
                    error={!!touched.car_models && !!errors.car_models}
                    required
                    label="Select your car Model"
                    autoComplete="Model"
                  >
                    {carModelData?.map((car_models: any) => (
                      <MenuItem key={car_models.name} value={car_models.id}>
                        {car_models.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="outlined">
                  <h2>Add your car images:</h2>
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
                      {fileList?.map((img) => (
                        <Avatar
                          src={img.url}
                          alt="uploaded car"
                          variant="square"
                          sx={{ height: "15vh", width: "12vw" }}
                        />
                      ))}
                    </Paper>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, setValues)}
                    name="file"
                  />
                </FormControl>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  submit your car information
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default SellYourCar;
