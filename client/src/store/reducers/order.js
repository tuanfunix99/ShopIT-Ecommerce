import { createSlice } from "@reduxjs/toolkit";

const initialOrder = {
  myOrders: [],
  orderDetails: {},
};

const orderSlice = createSlice({
  name: "Order",
  initialState: initialOrder,
  reducers: {
    createOrder(state) {
      return { ...state };
    },
    getMyOrders(state, action) {
      return { ...state, myOrders: action.payload };
    },
    getOrderDetails(state, action) {
      return { ...state, orderDetails: action.payload };
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
