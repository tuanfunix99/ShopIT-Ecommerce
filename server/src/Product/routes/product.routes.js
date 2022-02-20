const { Router } = require("express");
const {
  createNewProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  createAll,
  deleteProduct,
} = require("../controllers/product.controllers");

const { authenticate, authorizaRoles } = require("../../middleware/auth");

const router = Router();

router.get("/", getAllProduct);
router.get("/:id", getProduct);

router.post("/", authenticate, authorizaRoles("admin"), createNewProduct);
router.post("/all", createAll);

router.put("/:id", authenticate, authorizaRoles("admin"), updateProduct);

router.delete("/:id", authenticate, authorizaRoles("admin"), deleteProduct);

module.exports = router;
