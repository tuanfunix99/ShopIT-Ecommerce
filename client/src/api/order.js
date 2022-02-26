import axios from "axios";

export const createOrderApi = (order) => axios.post('/api/v1/order', order);