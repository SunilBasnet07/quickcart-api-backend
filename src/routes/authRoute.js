import express from "express";
import { forgotPassword, login, register } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/login",login);
router.post("/register",register);
router.post("/forgot-password",forgotPassword);


export default router;