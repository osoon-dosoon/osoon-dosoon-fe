import axios from "axios";

// vite proxy를 쓰면 baseURL 없이 "/api"로 호출해도 됨
export const http = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// (나중에 JWT 붙일 때)
// http.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
