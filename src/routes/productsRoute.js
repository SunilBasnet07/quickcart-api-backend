import express from "express";
import { createProduct, deleteProduct, getAllProducts, getCategories, getProductById, updateProduct } from "../controllers/productControllers.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ADMIN_ROLES } from "../constant/roles.js";

const router = express.Router();

router.get("/",getAllProducts);
router.get("/:id",getProductById);
router.get("/categories",getCategories);
router.post("/",auth,createProduct);
router.put("/:id",auth,roleBasedAuth(ADMIN_ROLES),updateProduct);
router.delete("/:id",auth,roleBasedAuth(ADMIN_ROLES),deleteProduct);

export default router;