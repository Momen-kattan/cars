import axios,{ AxiosRequestConfig } from "axios";




export interface FetchResponse<T> {
    count: number;
    next: string | null;
    results: T[];
  }
 const axiosInstance= axios.create({
  baseURL: "https://abdelwahapbak2.pythonanywhere.com/",
});


class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
      }

      SighnIn = () => {
        return axiosInstance
          .post<T>(this.endpoint + "auth/jwt/create",)
          .then((res) => res.data);
      };
      AllCountry= () => {
        return axiosInstance
        .get<FetchResponse<T>>(this.endpoint)
        .then((res) => res.data );
      }
       
      // SellYourCar = () => {
      //   return axiosInstance.post<T>(this.endpoint + "sellcar/").then((res) => res.data);
      // };

}
export default APIClient;