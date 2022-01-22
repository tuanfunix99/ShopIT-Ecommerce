import axios from "axios";

export const fetchUserApi = () => axios.get("/api/v1/user/");

export const updateProfileApi = (profile) => axios.post("/api/v1/user/update-profile", profile);

export const changePasswordApi = (input) => axios.post("/api/v1/user/change-password", input);

export const signupApi = (user) => axios.post("/api/v1/user/auth/signup", user);

export const loginApi = (user) => axios.post("/api/v1/user/auth/login", user);