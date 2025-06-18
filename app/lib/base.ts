// lib/base.ts
import axios, { AxiosRequestHeaders } from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const isRefreshRequest = config.url?.includes("/refresh-token");
    // 리프레시 요청엔 바디만 쓰도록, 헤더 토큰 삭제
    if (isRefreshRequest) {
      const headers = (config.headers as AxiosRequestHeaders) || {};
      delete headers.Authorization;
      config.headers = headers;
      return config;
    }

    const token =     localStorage.getItem("jwt_token")
    if (token) {
      const headers = (config.headers as AxiosRequestHeaders) || {};
      headers.Authorization = `Bearer ${token}`;
      config.headers = headers;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
