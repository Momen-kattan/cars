import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/APIClient';
import axios from 'axios';
import setAuthToken from '../interceptor';
export  interface  UserProfile   {
    id: number;
    username: string;
    phone:number;
    email:string;
  }
const useProfile= () =>{
const apiClient=async ()=> {
 const result= await axios.get<UserProfile> ( 
 "https://abdelwahapbak2.pythonanywhere.com/auth/users/me/"
)
const token = localStorage.getItem("token");
setAuthToken(token);
return result.data}
return useQuery({
    queryKey: ["user_profile"],
    queryFn:  apiClient
  });
};
export default useProfile