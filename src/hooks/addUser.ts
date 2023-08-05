import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '../services/APIClient';
export interface User{
  first_name: string,
  last_name:string,
  email: string,
  password: string,
  gender: string,
  location: number,
  phone: string
}

const addUser=()=>{
  useMutation({mutationFn:(user:User)=>axiosInstance.post( "/create_client",user).then(res=> { return res.data})})
}
export default addUser