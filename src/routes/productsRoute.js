import express from "express";
import { createProduct, deleteProduct, getAllCategories, getAllProducts, getBrand, getCategories, getProductById, updateProduct } from "../controllers/productControllers.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ADMIN_ROLES } from "../constant/roles.js";

const router = express.Router();

router.get("/",getAllProducts);
router.get("/categories",getCategories);
router.get("/category",getAllCategories);
router.get("/brands",getBrand);
router.get("/:id",getProductById);
router.post("/",auth,createProduct);
router.put("/:id",auth,roleBasedAuth(ADMIN_ROLES),updateProduct);
router.delete("/:id",auth,roleBasedAuth(ADMIN_ROLES),deleteProduct);

export default router;