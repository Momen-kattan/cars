import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/APIClient';
import axios from 'axios';
import axiosInstance from '../services/APIClient';
type  country =  {
    id: number;
    country_name: string;
  }[] 
const useCountry= () =>{
const apiClient=async ()=> {
 const result= await axiosInstance.get<country> ( 
  "/country"
)
return result.data
}
return useQuery({
    queryKey: ["country"],
    queryFn:  apiClient
  });
};
export default useCountry