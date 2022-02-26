import { createAsyncThunk } from "@reduxjs/toolkit";
import { cartActions } from "../reducers/cart";

const addToCart = createAsyncThunk(
  "cart/addToCart",
  (cartItem, { dispatch, getState }) => {
    dispatch(cartActions.addToCart(cartItem));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
    localStorage.setItem("carts", getState().cart.carts);
  }
);

const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  (product, { dispatch, getState }) => {
    dispatch(cartActions.deleteCartItem(product));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
    localStorage.setItem("carts", getState().cart.carts);
  }
);

const updateQtyItem = createAsyncThunk(
  "cart/updateQtyItem",
  (cartItem, { dispatch, getState }) => {
    dispatch(cartActions.updateQtyItem(cartItem));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
    localStorage.setItem("carts", getState().cart.carts);
  }
);

const addShippingInfo = createAsyncThunk(
  "cart/addShippingInfo",
  (shippingInfo, { dispatch, getState }) => {
    dispatch(cartActions.addShippingInfo(shippingInfo));
    localStorage.setItem(
      "shippingInfo",
      JSON.stringify(getState().cart.shippingInfo)
    );
  }
);

const clearCart = createAsyncThunk("user/clearCart", (_, { dispatch }) => {
  dispatch(cartActions.clearCart());
  localStorage.removeItem("carts");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("orderInfo");
})

const cartAcs = {
  addToCart,
  deleteCartItem,
  updateQtyItem,
  addShippingInfo,
  clearCart
};

export default cartAcs;
