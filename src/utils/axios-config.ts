import axios from "axios";

const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api/v1",
  withCredentials: true,
});

export default axiosConfig;
