import axios from "axios";

const userAxios = axios.create({
  baseURL: "http://localhost:4000",
});

export default userAxios;
