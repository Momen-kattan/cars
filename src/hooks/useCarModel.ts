import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/APIClient';
import axios from 'axios';
import axiosInstance from '../services/APIClient';
type  car_model =  {
    id: number;
    name: string;
    brand_id:number;
  }[] 
const useCarModel= (id:number) =>{
const apiClient=async ()=> {
 const result= await axiosInstance.get<car_model> ( 
  "/car_model/"+id
)
console.log(result.data)
return result.data
}
return useQuery({
    queryKey: [" car_model"],
    queryFn:  apiClient
  });
};
export default useCarModel