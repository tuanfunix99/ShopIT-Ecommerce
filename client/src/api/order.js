import axios from "axios";

export const createOrderApi = (order) => axios.post('/api/v1/order', order);

export const getMyOrdersApi = () => axios.get('/api/v1/order/my-orders');

export const getOrderDetailsApi = (id) => axios.post(`/api/v1/order/${id}`);