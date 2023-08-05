import axios from 'axios';
import { create } from 'zustand';
import setAuthToken from './interceptor';
import { UserProfile } from './hooks/useAuth';

   interface UserData{
    profile:UserProfile | null,
    fetchProfile:(profile:any)=>void,
    logOut:()=> void
   }
const profile = create<UserData>((set) => ({
    profile: {id: 0,
      username: "",
      phone:0,
      user_kind:"",
      email:""},
    fetchProfile:(profile:any)=>set({profile}) ,
    logOut:()=> set({profile:null})

  }));

export default profile;