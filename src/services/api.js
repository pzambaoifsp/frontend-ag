import axios from "axios";

const api = axios.create({
  baseURL: "https://arcane-lowlands-61123.herokuapp.com"
});

export default api;