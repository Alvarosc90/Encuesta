import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.123.174:5000/api", // Cambia a la IP de tu servidor
});

export default api;
