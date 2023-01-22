import axios from "axios";
import authConfig from 'src/configs/auth'
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
});

axiosInstance.interceptors.request.use(
    async (config) => {
    const token= window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);