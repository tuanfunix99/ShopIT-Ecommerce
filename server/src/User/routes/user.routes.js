const { Router } = require("express");
const { authenticate, authorizaRoles } = require("../../middleware/auth");
const { signup, activeAccount, login, logout } = require("../controllers/auth.controllers");
const {
  getUser,
  updateProfile,
  changePassword,
} = require("../controllers/user.controllers");
const {
  getAllUserFromAdmin,
  getUserFromAdmin,
  deleteUserFromAdmin,
} = require("../controllers/admin.controllers");

const router = Router();

//auth
router.post("/auth/signup", signup);

router.post("/auth/login", login);

router.get("/auth/verify-email/:token", activeAccount);

router.get("/auth/logout", logout);

//user
router.get("/", authenticate, getUser);

router.post("/update-profile", authenticate, updateProfile);

router.post("/change-password", authenticate, changePassword);

//admin
router.get(
  "/admin/get-all",
  authenticate,
  authorizaRoles("admin"),
  getAllUserFromAdmin
);

router.get(
  "/admin/get-user",
  authenticate,
  authorizaRoles("admin"),
  getUserFromAdmin
);

router.get(
  "/admin/delete-user",
  authenticate,
  authorizaRoles("admin"),
  deleteUserFromAdmin
);

module.exports = router;
