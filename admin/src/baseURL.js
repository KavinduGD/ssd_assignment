import axios from "axios";

const adminAxios = axios.create({
  baseURL: "https://ssd-assignment.onrender.com",
});

export default adminAxios;
