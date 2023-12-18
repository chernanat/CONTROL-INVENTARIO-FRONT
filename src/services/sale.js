import axios from "axios";
import { URL } from './axios'

export const saleRequest = (sale) => axios.post(`${URL}/createsale`, sale);
export const createBulk = (shops) => axios.post(`${URL}/bulksale`, shops);

export const getSales = () => axios.get(`${URL}/getsales`);
export const getSale = (id) => axios.get(`${URL}/getsale/${id}`);
export const updateSale = (id, sale) => axios.put(`${URL}/updatesale/${id}`, sale);
export const delSale = (id) => axios.delete(`${URL}/deletesale/${id}`);

//consultas(relaciones) de ventas por cliente y consulta de ventas por producto

export const salesWithclientProduct = () => axios.get(`${URL}/salesclientproduct`); //trae la data de ventas con sus relaciones es decir clientes y productos

export const salesWithClient = (id) => axios.get(`${URL}/sales/client/${id}`);