import axios from 'axios';
import { create } from 'zustand';
import setAuthToken from './interceptor';
const apiClient=async ()=> {
  const result= await axios.get ( 
    "https://abdelwahapbak2.pythonanywhere.com/auth/users/me/",
    )
    setAuthToken(localStorage.getItem("token"))
   return result.data
   }
   interface UserData{
    email:string,
    fetchProfile:()=>void
   }
const profile = create<UserData>((set) => ({
    email: "",
    fetchProfile: async () => {
      const data = await apiClient();
      set({email: data.email});
    },

  }));

export default profile;