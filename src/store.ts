import axios from 'axios';
import { create } from 'zustand';
import setAuthToken from './interceptor';
import { UserProfile } from './hooks/useAuth';
// const apiClient=async ()=> {
//   // const result= await axios.get ( 
//   //   "https://abdelwahapbak2.pythonanywhere.com/auth/users/me/",
//   //   )
//   //   setAuthToken(localStorage.getItem("token"))
//   //  return result.data
//   //  }
   interface UserData{
    profile:UserProfile | null,
    fetchProfile:(profile:any)=>void,
    logOut:()=> void
   }
const profile = create<UserData>((set) => ({
    profile: {id: 0,
      username: "",
      phone:0,
      email:""},
    fetchProfile:(profile:any)=>set({profile}) ,
    logOut:()=> set({profile:null})

  }));

export default profile;