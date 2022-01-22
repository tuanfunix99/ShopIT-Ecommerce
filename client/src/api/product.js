import axios from "axios";

export const fetchAllProductApi = () => axios.get("/api/v1/products/");

export const fetchProductApi = (id) => axios.get(`/api/v1/products/${id}`);
