import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Car } from './useMyCar';
import axiosInstance from '../services/APIClient';
const useSelectedCar= (id:string) =>{
const apiClient=async ()=> {
 const result= await axiosInstance.get<Car> ( 
  "/car/"+id+"/",
)
return result.data
}
return useQuery({
    queryKey: [" mycars"],
    queryFn:  apiClient
  });
};
export default useSelectedCar