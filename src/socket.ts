import { io, Socket } from 'socket.io-client';
import axiosInstance from './services/APIClient';

const URL: string | undefined = process.env.NODE_ENV === 'production' ? undefined :'http://192.168.43.198:8000';

export const socket: Socket = io(URL as string, {
    auth: {
      token: localStorage.getItem("token")?localStorage.getItem("token"):"koko",
    },
  });