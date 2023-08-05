import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import useCountry from "../../hooks/useCountry";
import HeaderFormRegister from "./HeaderFormRegister";
import { Formik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import axiosInstance from "../../services/APIClient";
export default function Regist() {
  const [handle, setHandle] = useState<any>([]);
  const handleSelect = async (event: any) => {
    const id = event.target.value;
    console.log(id);
    let provinece = await axiosInstance.get(`/province/${id}`);
    setHandle(provinece.data);
    console.log("provinece", provinece);
  };
  const { data, error, isLoading } = useCountry();

  if (error) throw error;
  console.log(data);
  const handleSubmit = async (values: TInitialValues) => {
    try {
      const response = await axiosInstance.post("/create_client", values);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    console.log(data);
  };
  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  type TInitialValues = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmYourPassword: string;
    phone: string;
    gender: "F" | "M";
    country: number | null;
    location: number | null;
  };
  const initialValues: TInitialValues = {
    confirmYourPassword: "",
    country: null,
    email: "",
    first_name: "",
    gender: "M",
    last_name: "",
    location: null,
    password: "",
    phone: "",
  };
  const validationSchema = Yup.object({
    confirmYourPassword: Yup.string().oneOf(
      [Yup.ref("password"), undefined],
      "Passwords must match"
    ),
    country: Yup.number().required("country is required"),
    email: Yup.string().required("email is required"),
    first_name: Yup.string().required("first_name is required"),
    last_name: Yup.string().required("last_name is required"),
    gender: Yup.string().required("gender is required"),
    location: Yup.number().required("location is required"),
    password: Yup.string()
      .required("password is required")
      .min(8)
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        "Password must contain letters and numbers and minimum 8 charachters"
      ),
    phone: Yup.number().required("phone is required"),
  });
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <HeaderFormRegister />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, maxWidth: "md" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                  value={values.first_name}
                  onChange={handleChange}
                />
                {errors.first_name ?? null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  value={values.last_name}
                  onChange={handleChange}
                />
                {errors.last_name ?? null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email ?? null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password ?? null}
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                    required
                    fullWidth
                    name="confirmYourPassword"
                    label="confirm your password"
                    type="password"
                    id="confirm your password"
                    value={values.confirmYourPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmYourPassword ?? null}
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="add your mobile number"
                    type="number"
                    id="phone"
                    value={values.phone}
                    onChange={handleChange}
                  />
                  {errors.phone ?? null}
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel sx={{ fontSize: 20 }}>
                      Select your gender
                    </InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender"
                      name="gender"
                      required
                      label="Select your gender"
                      value={values.gender}
                      onChange={handleChange}
                    >
                      {errors.gender ?? null}
                      <MenuItem value={"M"}>Male</MenuItem>
                      <MenuItem value={"F"}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel sx={{ fontSize: 20 }}>
                      Select your country
                    </InputLabel>
                    <Select
                      labelId="country-label"
                      onChange={(event) => {
                        handleChange(event);
                        handleSelect(event);
                      }}
                      required
                      label="Select your location"
                      autoComplete="location"
                      name="country"
                      value={values.country}
                    >
                      {data?.map((country) => (
                        <MenuItem key={country.country_name} value={country.id}>
                          {country.country_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {errors.country ?? null}
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}></Grid>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel sx={{ fontSize: 20 }}>
                    Select your province
                  </InputLabel>
                  <Select
                    labelId="province-label"
                    id="location"
                    name="location"
                    required
                    label="Select your location"
                    autoComplete="location"
                    value={values.location}
                    onChange={handleChange}
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
                {errors.location ?? null}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isEmpty(errors)}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/Login">
                  <Typography>{"Already have an account? Sign in"}</Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </Box>
  );
}

// const ErrorMessage=()=> {
//   return(<Button variant="outlined" onClick={handleClick}>
//   Open success snackbar
// </Button>
// <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//   <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
//     This is a success message!
//   </Alert>
// </Snackbar>);
// }
