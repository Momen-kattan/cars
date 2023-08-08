import axios from 'axios';
 const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
 
});
axiosInstance.interceptors.request.use(config => {
   if (!!localStorage.getItem('token')){ config.headers['Authorization'] = `motors&more ${localStorage.getItem('token')}`;}
  return config;
});
console.log('token',localStorage.getItem('token'));

export default axiosInstance