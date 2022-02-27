import { createSlice } from "@reduxjs/toolkit";

const initialProduct = {
  products: null,
  product: null,
  reviews: null,
};

const productSlice = createSlice({
  name: "Product",
  initialState: initialProduct,
  reducers: {
    fetchAllProduct(state, action) {
      return { ...state, products: action.payload };
    },
    fetchProduct(state, action) {
      return { ...state, product: action.payload };
    },
    createProduct(state, action) {
      return { ...state, isCompleted: action.payload };
    },
    addNewReview(state) {
      return { ...state, isCompleted: true };
    },
    error(state, action) {
      return { ...state, error: action.payload };
    },
    load(state) {
      return { ...state, loading: true };
    },
    clear(state) {
      return { ...state, error: null, isCompleted: null, loading: false };
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
