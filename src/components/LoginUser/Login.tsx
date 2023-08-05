import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import setAuthToken from "../../interceptor";
import { InputField, SignInBox, SignInButton } from "./styleComponent";
import useProfile from "../../hooks/useAuth";
import { Formik } from "formik";
import { handleSubmit } from "./utils";
import { initialValues, validationSchema } from "./constants";
import { Props } from "./types";
import { br } from "@fullcalendar/core/internal-common";
const Login = ({ setOpen }: Props): JSX.Element => {
  const { refetch } = useProfile();

  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  const onSuccess = () => {
    refetch();
    navigate("/");
  };
  return (
    <Container component="main" maxWidth="sm">
      <SignInBox>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit(onSuccess)}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, values, handleChange, errors }) => (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "block", flexDirection: "inherit" }}
            >
              <Typography
                component="h1"
                variant="h4"
                mb={2}
                textAlign={"center"}
              >
                Sign in
              </Typography>
              <InputField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleChange}
              />

              {errors.email ?? null}

              <InputField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="success" />}
                label="Remember me"
              />
              {
                <Typography variant="body1" color="error">
                  {errors.password ?? null}
                </Typography>
              }
              <SignInButton type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
                Sign In
              </SignInButton>
              <Grid container marginLeft={"10px"}>
                <Grid item>
                  <Link to="/register" onClick={setOpen}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          )}
        </Formik>
      </SignInBox>
    </Container>
  );
};

export default Login;
