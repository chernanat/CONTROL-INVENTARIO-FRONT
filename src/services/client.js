import axios from "axios";

const URL = "http://localhost:3000/api";

export const registerRequest = (user) => axios.post(`${URL}/createclient`, user);
