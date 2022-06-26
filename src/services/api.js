import axios from "axios";

const api = axios.create({
  baseURL: "https://api-agendamento-banca.herokuapp.com"
});


export default api;