const { Router } = require("express");
const { signup, activeAccount, login, logout } = require("./auth.controllers");
const { authenticate } = require("../middleware/auth");
const { getUser, updateProfile, changePassword } = require("./user.controllers");

const router = Router();

router.post("/auth/signup", signup);

router.post("/auth/login", login);

router.get("/auth/verify-email/:token", activeAccount);

router.get("/auth/logout", logout);

router.get("/", authenticate, getUser);

router.post("/update-profile", authenticate, updateProfile);

router.post("/change-password", authenticate, changePassword);

module.exports = router;
