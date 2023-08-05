import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '../services/APIClient';
export type  AuctionDate =  {
    id: number;
    date: string;
    title:string
    status:string
    kind:string
    notebook_conditions:number

  }[] 
const useAuctionDate= (options?: Parameters<typeof useQuery<AuctionDate>>['2']) =>{
const apiClient=async ()=> {
 const result= await axiosInstance.get<AuctionDate> ( 
  "/auction"
)
return result.data
}
return useQuery<AuctionDate>(
     ["AuctionDate"],
     apiClient,
     options,

  );
};
export default useAuctionDate