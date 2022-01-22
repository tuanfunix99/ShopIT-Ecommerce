import { createSlice } from "@reduxjs/toolkit";

const userState = {
  user: null,
};

const userSlice = createSlice({
  name: "User",
  initialState: userState,
  reducers: {
    fetchUser(state, action) {
      return { ...state, user: action.payload };
    },
    updateProfile(state, action) {
      return { ...state, isCompleted: action.payload };
    },
    changePassword(state, action) {
      return { ...state, isCompleted: action.payload };
    },
    signup(state, action) {
      return { ...state, isCompleted: action.payload };
    },
    login(state, action) {
      return { ...state, isCompleted: action.payload };
    },
    error(state, action) {
      return { ...state, error: action.payload };
    },
    load(state){
      return { ...state, loading: true };
    },
    clear(state) {
      return { ...state, error: null, isCompleted: null, loading: false};
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
