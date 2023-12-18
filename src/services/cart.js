import axios from "axios";
import { URL } from './axios'


export const incrementShop = (shop) => axios.post(`${URL}/incrementshop`, shop);
export const decrementShop = (shop) => axios.post(`${URL}/decrementshop`, shop);

export const getShops = () => axios.get(`${URL}/getshops`);
export const updateShop = (id, shop) => axios.put(`${URL}/updateshop/${id}`, shop);
export const delShop = (id) => axios.delete(`${URL}/deleteshop/${id}`);
export const delShops = () => axios.delete(`${URL}/deleteshops`);
