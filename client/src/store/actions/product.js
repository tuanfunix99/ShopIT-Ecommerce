import { productActions } from "../reducers/product";
import {
  createProductApi,
  fetchAllProductApi,
  fetchProductApi,
  addNewReviewApi,
  getAllReviewsApi
} from "../../api/product";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchAllProduct = createAsyncThunk(
  "product/fetchAllProduct",
  async (input, { dispatch }) => {
    dispatch(productActions.load());
    try {
      const { data } = await fetchAllProductApi(input);
      dispatch(productActions.fetchAllProduct(data));
      dispatch(productActions.clear());
    } catch (error) {
      dispatch(productActions.clear());
    }
  }
);

const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id, { dispatch }) => {
    dispatch(productActions.load());
    try {
      const { data } = await fetchProductApi(id);
      dispatch(productActions.fetchProduct(data));
      dispatch(productActions.clear());
    } catch (error) {
      dispatch(productActions.clear());
    }
  }
);

const createProduct = createAsyncThunk(
  "product/createProduct",
  async (product, { dispatch }) => {
    dispatch(productActions.load());
    try {
      const { data } = await createProductApi(product);
      dispatch(productActions.createProduct(data));
      dispatch(productActions.clear());
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(productActions.clear());
        dispatch(productActions.error(error.response.data.error));
      }
    }
  }
);

const addNewReview = createAsyncThunk(
  "product/createNewReview",
  async (review, { dispatch }) => {
    try {
      await addNewReviewApi(review);
      dispatch(productActions.addNewReview());
      const { data } = await fetchProductApi(review.productId);
      dispatch(productActions.fetchProduct(data));
      dispatch(productActions.clear());
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(productActions.clear());
        dispatch(productActions.error(error.response.data.error));
      }
    }
  }
);

// const getAllReviews = createAsyncThunk(
//   "product/getAllReviews",
//   async (productId, { dispatch }) => {
//     try {
//       const {data} = await getAllReviewsApi(productId);
//       dispatch(productActions.getAllReviews(data.reviews));
//       dispatch(productActions.clear());
//     } catch (error) {
//       if (error.response && error.response.data) {
//         dispatch(productActions.clear());
//         dispatch(productActions.error(error.response.data.error));
//       }
//     }
//   }
// );


const clear = createAsyncThunk("product/clear", async (_, { dispatch }) => {
  dispatch(productActions.clear());
});

const userActs = {
  fetchAllProduct,
  fetchProduct,
  createProduct,
  addNewReview,
  // getAllReviews,
  clear
};

export default userActs;
