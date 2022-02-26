import { createSlice } from "@reduxjs/toolkit";

const cartItems = localStorage.getItem("cartItems");
const carts = localStorage.getItem("carts");
const shippingInfo = localStorage.getItem("shippingInfo");

const initialCart = {
  cartItems: cartItems ? JSON.parse(cartItems) : [],
  carts: carts ? parseInt(carts) : 0,
  shippingInfo: shippingInfo ? JSON.parse(shippingInfo) : {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        item.quantity += isItemExist.quantity;
        item.cart = isItemExist.cart + 1;
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
          carts: state.carts + 1,
        };
      } else {
        item.cart = 1;
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          carts: state.carts + 1,
        };
      }
    },
    updateQtyItem(state, action) {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isItemExist) {
        console.log("ok");
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
          carts: state.carts,
        };
      } else {
        return { ...state };
      }
    },
    deleteCartItem(state, action) {
      const cartItem = state.cartItems.find(
        (i) => i.product === action.payload
      );
      if (cartItem) {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (i) => i.product !== cartItem.product
          ),
          carts: state.carts - cartItem.cart,
        };
      }
      return { ...state };
    },
    addShippingInfo(state, action) {
      return { ...state, shippingInfo: action.payload };
    },
    clearCart(state) {
      return { ...state, cartItems: [], carts: 0 };
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
