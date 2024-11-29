import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // URL base del backend
});

export default api;
