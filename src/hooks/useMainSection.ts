import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/APIClient';
import axios from 'axios';
type  main_section =  {
    id: number;
    name: string;
  }[] 
const useMainSection= () =>{
const apiClient=async ()=> {
 const result= await axios.get<main_section> ( 
     "https://abdelwahapbak2.pythonanywhere.com/main_section"
)
return result.data
}
return useQuery({
    queryKey: ["main_section"],
    queryFn:  apiClient
  });
};
export default useMainSection