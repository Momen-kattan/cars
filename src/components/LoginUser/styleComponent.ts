import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
export const SignInBox = styled(Box)({
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
  
  export const InputField = styled(TextField)({
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
  export const SignInButton = styled(Button)({
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