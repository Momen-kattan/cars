import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/APIClient';
import axios from 'axios';
import axiosInstance from '../services/APIClient';
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
        damage:string,
        status:string,
        main_section:[],
        images: string[]
  }
const useCar= () =>{
const apiClient=async ()=> {
 const result= await axiosInstance.get<Car[]> ( 
  "/car/"
)
return result.data
}
return useQuery({
    queryKey: [" mycars"],
    queryFn:  apiClient
  });
};
export default useCar