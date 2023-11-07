import axios from "axios";
import { URL } from './axios'

export const saleRequest = (sale) => axios.post(`${URL}/createsale`, sale);
export const getSales = () => axios.get(`${URL}/getsales`);
export const getSale = (id) => axios.get(`${URL}/getsale/${id}`);
export const updateSale = (id, sale) => axios.put(`${URL}/updatesale/${id}`, sale);
export const delSale = (id) => axios.delete(`${URL}/deletesale/${id}`);

//consultas(relaciones) de ventas por cliente y consulta de ventas por producto

export const salesWithclientProduct = () => axios.get(`${URL}/sales2`);