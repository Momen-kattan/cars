import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/APIClient';
import axios from 'axios';
type  car_model =  {
    id: number;
    name: string;
    brand_id:number;
  }[] 
const useCarModel= (id:number) =>{
const apiClient=async ()=> {
 const result= await axios.get<car_model> ( 
 "https://abdelwahapbak2.pythonanywhere.com/car_model/"+id
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