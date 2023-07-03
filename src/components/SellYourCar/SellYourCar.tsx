import React, { EventHandler, useState } from "react";
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

const initialValues = {
  mileage: "",
  color: "",
  type: "",
  manufacturing_year_: "",
  clean_title: "",
  engine_type: "",
  gear_type: "",
  cylinders: "",
  notes: "",
  price: "",
  location: "",
  file: "",
};

const years = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);
const SellYourCar = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [imageUrl, setImageUrl] = useState<string[] | null>([]);
  const [handle, setHandle] = useState<any>([]);
  const { data, error, isLoading } = useCountry();
  if (error) throw error;
  console.log(data);
  const onSubmit = async (values: any) => {
    console.log("value", values);

    return await axios.post(
      "https://abdelwahapbak2.pythonanywhere.com/car/",
      values
    );
  };
  const handleSelect = async (event: any) => {
    console.log(event.target.value);
    let provinece = await axios.get(
      `https://abdelwahapbak2.pythonanywhere.com/province/${event.target.value}`
    );
    setHandle(provinece.data);
    console.log("provinece", provinece);
  };
  const { mutate } = useMutation(onSubmit);
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter?: Function
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);
      fileReader.onload = () => {
        const dataUrl = fileReader.result as string;
        setImageUrl([...(imageUrl as string[]), dataUrl]);
        setter?.((values: { file: [] }) => ({
          ...values,
          file: [...values.file, selectedFile],
        }));
      };
    }
  };

  console.log("imageurl", imageUrl);
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
          console.log("val", values);
          return (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  label="mileage"
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
                    id="manufacturing_year_"
                    value={values.manufacturing_year_}
                    onChange={handleChange}
                    name="manufacturing_year_"
                    label="Manufacturing Year_"
                    error={
                      touched.manufacturing_year_ &&
                      !!errors.manufacturing_year_
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
                    {data?.map((country) => (
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
                    {handle?.map((province: any) => (
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

                <FormControl variant="outlined">
                  <h2>Add your car images:</h2>
                  {(imageUrl as [])?.length > 0 && (
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
                      {imageUrl?.map((img) => (
                        <Avatar
                          src={img}
                          alt="uploaded car"
                          variant="square"
                          sx={{ height: "15vh", width: "10vw" }}
                        />
                      ))}
                    </Paper>
                  )}

                  <input
                    type="file"
                    accept="image/*"
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
