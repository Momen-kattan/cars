import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/APIClient';
import axios from 'axios';
type  country =  {
    id: number;
    country_name: string;
  }[]
const useCountry= () =>{
const apiClient=async ()=> {
 const result= await axios.get<country> ( 
     "https://abdelwahapbak2.pythonanywhere.com/country"
)
return result.data
}
return useQuery({
    queryKey: ["country"],
    queryFn:  apiClient
  });
};


export default useCountry