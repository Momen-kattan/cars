import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/APIClient';
import axios from 'axios';
export interface  Car   {
  id:number
    mileage: string,
        color: string,
        type: string,
        manufacturing_year: number,
        clean_title: boolean,
        engine_type: string,
        gear_type: string,
        cylinders: string,
        notes: string,
        price: number,
        location: string,
        car_model: string,
        images: string[]
  }
const useCar= () =>{
const apiClient=async ()=> {
 const result= await axios.get<Car[]> ( 
 "https://abdelwahapbak2.pythonanywhere.com/car/"
)
return result.data
}
return useQuery({
    queryKey: [" mycars"],
    queryFn:  apiClient
  });
};
export default useCar