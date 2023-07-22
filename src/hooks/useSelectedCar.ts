import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Car } from './useMyCar';
const useSelectedCar= (id:string) =>{
const apiClient=async ()=> {
 const result= await axios.get<Car> ( 
 "https://abdelwahapbak2.pythonanywhere.com/car/"+id+"/",
)
return result.data
}
return useQuery({
    queryKey: [" mycars"],
    queryFn:  apiClient
  });
};
export default useSelectedCar