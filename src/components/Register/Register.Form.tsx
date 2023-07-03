import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import useCountry from "../../hooks/useCountry";
import { useState } from "react";

export default function Regist() {
  const [handle, setHandle] = useState<any>([]);
  const handleSelect = async (event: any) => {
    console.log(event.target.value);
    let provinece = await axios.get(
      `https://abdelwahapbak2.pythonanywhere.com/province/${event.target.value}`
    );
    setHandle(provinece.data);
    console.log("provinece", provinece);
  };
  const { data, error, isLoading } = useCountry();
  if (error) throw error;
  console.log(data);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("email"));
    try {
      const response = await axios.post(
        "https://abdelwahapbak2.pythonanywhere.com/create_client",
        {
          first_name: data.get("first_name"),
          last_name: data.get("last_name"),
          email: data.get("email"),
          password: data.get("password"),
          gender: data.get("gender"),
          location: data.get("location"),
          phone: data.get("phone"),
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(data.get("email"));
      console.error(error);
    }
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
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                required
                fullWidth
                name="confirm your password"
                label="confirm your password"
                type="password"
                id="confirm your password"
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                required
                fullWidth
                name="phone"
                label="mobile"
                type="number"
                id="phone"
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <InputLabel id="gender-label">Select your gender:</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                defaultValue="male"
                required
                label="Select your gender"
              >
                <MenuItem value={"M"}>Male</MenuItem>
                <MenuItem value={"F"}>Female</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <InputLabel id="country-label">Select your country:</InputLabel>
              <Select
                labelId="country-label"
                onChange={handleSelect}
                required
                label="Select your location"
                autoComplete="location"
                defaultValue={data?.[0].country_name}
              >
                {data?.map((country) => (
                  <MenuItem key={country.country_name} value={country.id}>
                    {country.country_name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}></Grid>
            <Select
              labelId="province-label"
              id="location"
              name="location"
              required
              label="Select your location"
              autoComplete="location"
            >
              {handle?.map((province: any) => (
                <MenuItem key={province.province_name} value={province.id}>
                  {province.province_name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="">
              <Typography>{"Already have an account? Sign in"}</Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
