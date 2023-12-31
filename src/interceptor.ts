import axios from "axios";
import axiosInstance from "./services/APIClient";
export  interface TokenResponse {
    access: string;
  }
  
  // Function to set the authorization header with the token
  const setAuthToken = (token: string | null) => {
    if (token) {
      // Apply the token to every request header
      axiosInstance.defaults.headers.common["Authorization"] = `motors&more ${token}`;
      
    } else {
      // Remove the token from the headers
      delete axios.defaults.headers.common["Authorization"];
    }
  };
  
 
  export default setAuthToken;