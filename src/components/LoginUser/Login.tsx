import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import setAuthToken from "../../interceptor";
import { InputField, SignInBox, SignInButton } from "./styleComponent";
import { useQueryClient } from "@tanstack/react-query";
import useProfile from "../../hooks/useAuth";
interface Props {
  setOpen: () => void;
}
const Login = ({ setOpen }: Props): JSX.Element => {
  const { refetch } = useProfile();

  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("11111");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = axios
      .post("https://abdelwahapbak2.pythonanywhere.com/auth/jwt/create", {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((res) => {
        const token = res.data.access;
        localStorage.setItem("token", token);
        refetch();
        // Log the response data to the console
        navigate("/");
      })
      .catch((error) => {
        console.error(error); // Log any errors to the console
      });
  };
  return (
    <Container component="main" maxWidth="sm">
      <SignInBox>
        <Typography component="h1" variant="h4" mb={2}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <InputField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <InputField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
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
      </SignInBox>
    </Container>
  );
};

export default Login;
