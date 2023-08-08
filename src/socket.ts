import { io, Socket } from 'socket.io-client';
import axiosInstance from './services/APIClient';

const URL: string | undefined = process.env.NODE_ENV === 'production' ? undefined :'http://127.0.0.1:8000/';

export const socket: Socket = io(URL as string, {
    auth: {
      token: localStorage.getItem("token")?localStorage.getItem("token"):"koko",
    },
  });