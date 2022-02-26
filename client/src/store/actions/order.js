import {
  createOrderApi,
  getMyOrdersApi,
  getOrderDetailsApi,
} from "../../api/order";
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

const getMyOrders = createAsyncThunk(
  "/order/getMyOrders",
  async (_, { dispatch }) => {
    dispatch(orderActions.clear());
    dispatch(orderActions.load());
    try {
      const { data } = await getMyOrdersApi();
      dispatch(orderActions.getMyOrders(data));
      dispatch(orderActions.clear());
    } catch (error) {
      dispatch(orderActions.clear());
      dispatch(orderActions.error(error.message));
    }
  }
);

const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id, { dispatch }) => {
    dispatch(orderActions.clear());
    dispatch(orderActions.load());
    try {
      const { data } = await getOrderDetailsApi(id);
      dispatch(orderActions.getOrderDetails(data));
      dispatch(orderActions.clear());
    } catch (error) {
      dispatch(orderActions.clear());
      dispatch(orderActions.error(error.message));
    }
  }
);

const orderAcs = {
  createOrder,
  getMyOrders,
  getOrderDetails,
};

export default orderAcs;
