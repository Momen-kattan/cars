import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Dialog,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
  styled,
} from "@mui/material";

import { SignInBox, InputField } from "../LoginUser/styleComponent";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import useCar from "../../hooks/useMyCar";
import axiosInstance from "../../services/APIClient";
interface Porps {
  car_id: number;
  setOpen: () => void;
}

const SignInButton = styled(Button)({
  backgroundColor: "#3a68a5",
  color: "#fff",
  borderRadius: "20px",
  padding: "10px 20px",
  fontWeight: "bold",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#242424",
  },
});
const PopUP = ({ setOpen, car_id }: Porps) => {
  const { refetch } = useCar();
  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      axiosInstance.delete("/car/" + car_id).then((res) => {
        refetch();
        setOpen();
        res.data;
      }),
  });

  return (
    <Container component="main" maxWidth="sm">
      <SignInBox>
        <Typography component="h1" variant="h6" mb={2}>
          are you sure to delete all your car informaion? {car_id}
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              display: "flex",
              width: "50%",
              justifyContent: "space-evenly",
            }}
          >
            <SignInButton
              type="submit"
              onClick={() => mutate()}
              sx={{ mt: 3, mb: 2, backgroundColor: "red" }}
            >
              Yes
            </SignInButton>
            <SignInButton
              sx={{ mt: 3, mb: 2, backgroundColor: "green" }}
              onClick={setOpen}
            >
              NO
            </SignInButton>
          </Box>
        )}
      </SignInBox>
    </Container>
  );
};

export default PopUP;
