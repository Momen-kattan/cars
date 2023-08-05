import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Car } from './useMyCar';
import axiosInstance from '../services/APIClient';
export type  car_in_auction =  {
  auction_date:string;
  car_info:Car;
    auction_id: number;
    car_id: string;
    auction_status:string,
  }
const useCarAuction= (id:string) =>{
const apiClient=async ()=> {
 const result= await axiosInstance.get<car_in_auction[]> ( 
  "/car_in_auction/?auction_id="+id
)
return result.data
}
return useQuery({
    queryKey: ["car_in_auction"],
    queryFn:  apiClient
  });
};
export default useCarAuction