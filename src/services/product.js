import axios from "axios";
import { URL } from './axios'

export const productRequest = (product) => axios.post(`${URL}/createproduct`, product);
export const getProducts = () => axios.get(`${URL}/getproducts`);
export const getProduct = (id) => axios.get(`${URL}/getproduct/${id}`);
export const updateProduct = (id, product) => axios.put(`${URL}/updateproduct/${id}`, product);
export const delProduct = (id) => axios.delete(`${URL}/deleteproduct/${id}`);
//incrementar y decrementar productos
export const increment = (id) => axios.post(`${URL}/incrementproduct/${id}`);
export const decrement = (id) => axios.post(`${URL}/decrementproduct/${id}`);
