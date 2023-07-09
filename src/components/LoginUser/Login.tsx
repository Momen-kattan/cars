import React, { FormEvent } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import setAuthToken, { TokenResponse } from "../../interceptor";
import profile from "../../store";

interface Props {
  setOpen: () => void;
}
const SignInBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: " rgba(0, 0, 0, 0.5)",
  borderRadius: "5px",
  padding: "40px",
  backgroundColor: "#ffffff",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: " rgba(0, 0, 0, 0.2)",
  },
});

const InputField = styled(TextField)({
  "& .MuiInputBase-input": {
    color: "#333",
  },
  "& label.Mui-focused": {
    color: "#333",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#333",
  },
});

const SignInButton = styled(Button)({
  backgroundColor: "#3a68a5",
  color: "#fff",
  borderRadius: "20px",
  padding: "10px 20px",
  fontWeight: "bold",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#21867a",
  },
});

const ForgotPasswordLink = styled(Link)({
  textDecoration: "none",
  color: "#33598b",
  "&:hover": {
    textDecoration: "underline",
  },
});

const SignUpLink = styled(Link)({
  textDecoration: "none",
  color: "#33598b",
  "&:hover": {
    textDecoration: "underline",
  },
});

const Login = ({ setOpen }: Props): JSX.Element => {
  const navigate = useNavigate();

  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
        profile((s) => s.fetchProfile);
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
