import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
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
  useMutation({mutationFn:(user:User)=>axios.post("https://abdelwahapbak2.pythonanywhere.com/create_client",user).then(res=>res.data)})
}
export default addUser