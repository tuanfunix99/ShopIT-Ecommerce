import axios from "axios";

// axios.defaults.timeout = 3000;

export const fetchAllProductApi = ({
  page = 1,
  keyword = "",
  price = [1, 10000],
  category,
}) =>
  axios.get(
    `/api/v1/products?keyword=${keyword}
    &page=${page}
    &price[lte]=${price[1]}
    &price[gte]=${price[0]}${ category ? `&category=${category}` : '&'}`
  );

export const fetchProductApi = (id) => axios.get(`/api/v1/products/${id}`);

export const createProductApi = (product) => axios.post(`/api/v1/products`, product);

export const addNewReviewApi = (review) => axios.put('/api/v1/products/new-review', review);

export const getAllReviewsApi = (productId) => axios.get(`/api/v1/products/reviews/${productId}`);
