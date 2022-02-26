import { createSlice } from "@reduxjs/toolkit";

const initialOrder = {};

const orderSlice = createSlice({
  name: "Order",
  initialState: initialOrder,
  reducers: {
    createOrder(state) {
      return { ...state };
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

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
