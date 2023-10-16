import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();


// register or sign up route
router.post("/register", authController.register);

//login or sign in route
router.post("/login", authController.login);

//logout route
router.get("/", authController.logout);

export default router;