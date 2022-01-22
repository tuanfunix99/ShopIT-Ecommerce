import { configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
import product from "../reducers/product";

export const store = configureStore({
  reducer: {
    user,
    product
  },
});
