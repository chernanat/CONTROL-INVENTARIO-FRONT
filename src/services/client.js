import axios from "axios";
import { URL } from './axios'

export const registerRequest = (user) => axios.post(`${URL}/createclient`, user);
export const getClients = () => axios.get(`${URL}/getclients`);
export const getClient = (id) => axios.get(`${URL}/getclient/${id}`);
export const updateClient = (id, client) => axios.put(`${URL}/updateclient/${id}`, client);
export const delClient = (id) => axios.delete(`${URL}/deleteclient/${id}`);
