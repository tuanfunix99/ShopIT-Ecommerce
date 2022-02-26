import { createOrderApi } from "../../api/order";
import { orderActions } from "../reducers/order";
import { createAsyncThunk } from "@reduxjs/toolkit";

const createOrder = createAsyncThunk(
  "/order/createOrder",
  async (order, { dispatch }) => {
    dispatch(orderActions.clear());
    try {
      await createOrderApi(order);
      dispatch(orderActions.createOrder());
    } catch (error) {
      dispatch(orderActions.clear());
      dispatch(orderActions.error(error.message));
    }
  }
);

const orderAcs = {
  createOrder,
};

export default orderAcs;
