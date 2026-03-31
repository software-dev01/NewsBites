import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
  // baseURL: "https://newsbites-1aao.onrender.com/api"
});

API.interceptors.request.use((req) => {

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;


  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;