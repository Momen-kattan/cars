import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/APIClient';
import axios from 'axios';
import axiosInstance from '../services/APIClient';
type  brands =  {
    id: number;
    name: string;
  }[] 
const useBrands= () =>{
const apiClient=async ()=> {
 const result= await axiosInstance.get<brands> ( 
  "/brands"
)
return result.data
}
return useQuery({
    queryKey: ["brands"],
    queryFn:  apiClient
  });
};
export default useBrands