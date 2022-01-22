import { userActions } from "../reducers/user";
import {
  changePasswordApi,
  fetchUserApi,
  loginApi,
  signupApi,
  updateProfileApi,
} from "../api/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { dispatch }) => {
    dispatch(userActions.load());
    try {
      const { data } = await fetchUserApi();
      dispatch(userActions.fetchUser(data));
      dispatch(userActions.clear());
    } catch (error) {
      dispatch(userActions.clear());
    }
  }
);

const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (profile, { dispatch }) => {
    try {
      const { data } = await updateProfileApi(profile);
      dispatch(userActions.updateProfile(data));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(userActions.error(error.response.data.error));
      }
    }
  }
);

const changePassword = createAsyncThunk(
  "user/updateProfile",
  async (input, { dispatch }) => {
    try {
      const { data } = await changePasswordApi(input);
      dispatch(userActions.changePassword(data));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(userActions.error(error.response.data.error));
      }
    }
  }
);

const signup = createAsyncThunk("user/signup", async (user, { dispatch }) => {
  try {
    const { data } = await signupApi(user);
    dispatch(userActions.signup(data));
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(userActions.error(error.response.data.error));
    }
  }
});

const login = createAsyncThunk("user/login", async (user, { dispatch }) => {
  try {
    const { data } = await loginApi(user);
    dispatch(userActions.login(data));
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(userActions.error(error.response.data.error));
    }
  }
});

const clear = createAsyncThunk("user/clear", (_, { dispatch }) => {
  dispatch(userActions.clear());
});

const userActs = {
  fetchUser,
  updateProfile,
  signup,
  login,
  clear,
  changePassword
};

export default userActs;
