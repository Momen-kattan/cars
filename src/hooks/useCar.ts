import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/APIClient';
import axios from 'axios';
type  car_model =  {
    id: number;
    name: string;
    brand_id:number;
  }[] 
const useCar= () =>{
const apiClient=async ()=> {
 const result= await axios.get<car_model> ( 
 "https://abdelwahapbak2.pythonanywhere.com/car_model/2"
)
return result.data
}
return useQuery({
    queryKey: [" car_model"],
    queryFn:  apiClient
  });
};
export default useCar