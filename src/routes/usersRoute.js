import express from "express"
import { createUser, deleteUser, getAllUsers, getUserById, updateUser, uploadProfileImage } from "../controllers/userControllers.js";
import auth from "../middlewares/auth.js";
import { ADMIN_ROLES } from "../constant/roles.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";

const router = express.Router();

router.get("/",auth,roleBasedAuth(ADMIN_ROLES),getAllUsers);
router.get("/:id",auth,getUserById);
router.post("/",auth,roleBasedAuth(ADMIN_ROLES),createUser);
router.put("/:id",auth,roleBasedAuth(ADMIN_ROLES),updateUser);
router.delete("/:id",auth,roleBasedAuth(ADMIN_ROLES),deleteUser);
router.put("/profile/upload",auth,uploadProfileImage);

export default router;