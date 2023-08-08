import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import setAuthToken from '../interceptor';
import axiosInstance from '../services/APIClient';
export  interface  UserProfile   {
    id: number;
    username: string;
    phone:number;
    user_kind:string;
    email:string;
  }
const useProfile= () =>{
const apiClient=async ()=> {
 const result= await axiosInstance.get<UserProfile>( 
  "/auth/users/me/",
)


return result.data}

return useQuery({
    queryKey: ["user_profile"],
    queryFn:  apiClient,
  });
};
export default useProfile