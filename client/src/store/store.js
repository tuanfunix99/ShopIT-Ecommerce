import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import product from "./reducers/product";
import cart from "./reducers/cart";

export const store = configureStore({
  reducer: {
    user,
    product,
    cart
  },
});
