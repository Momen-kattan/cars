import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/APIClient';
import axios from 'axios';
type  brands =  {
    id: number;
    name: string;
  }[] 
const useBrands= () =>{
const apiClient=async ()=> {
 const result= await axios.get<brands> ( 
     "https://abdelwahapbak2.pythonanywhere.com/brands"
)
return result.data
}
return useQuery({
    queryKey: ["brands"],
    queryFn:  apiClient
  });
};
export default useBrands