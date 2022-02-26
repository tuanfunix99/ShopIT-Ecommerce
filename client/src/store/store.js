import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import product from "./reducers/product";
import cart from "./reducers/cart";
import order from "./reducers/order";

export const store = configureStore({
  reducer: {
    user,
    product,
    cart,
    order
  },
});
