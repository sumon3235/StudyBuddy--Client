import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_APIURL,
  withCredentials: true,
});

export default axiosSecure;