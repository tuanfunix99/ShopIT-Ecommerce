import { productActions } from "../reducers/product";
import { fetchAllProductApi, fetchProductApi } from "../api/product";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchAllProduct = createAsyncThunk(
  "product/fetchAllProduct",
  async (_, { dispatch }) => {
    dispatch(productActions.load());
    try {
      const { data } = await fetchAllProductApi();
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


const userActs = {
  fetchAllProduct,
  fetchProduct
};

export default userActs;
