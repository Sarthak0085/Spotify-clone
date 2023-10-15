import express from "express";
import { register } from "../controllers/authController.js";

const router = express.Router();


// register or sign up route
router.post("register", register);


export default router;