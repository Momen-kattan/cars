
import { TinitialValues } from "../types";
import axiosInstance from "../../../services/APIClient";

export const handleSubmit = (onSuccess:Function )=>  ({ email, password }: TinitialValues) =>
axiosInstance.post("/auth/jwt/create", {
    email,
    password,
  })
  .then((res) => {
    console.log(res.data);
    const token = res.data.access;
    localStorage.setItem("token", token);
    onSuccess()
  })
  .catch((error) => {
    console.error(error);
  });