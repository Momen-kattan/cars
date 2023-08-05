import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/APIClient';
import axios from 'axios';
import axiosInstance from '../services/APIClient';
type  main_section =  {
    id: number;
    name: string;
  }[] 
const useMainSection= () =>{
const apiClient=async ()=> {
 const result= await axiosInstance.get<main_section> ( 
  "/main_section"
)
return result.data
}
return useQuery({
    queryKey: ["main_section"],
    queryFn:  apiClient
  });
};
export default useMainSection