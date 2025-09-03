import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

// Protect delete routes
router.delete("/", authMiddleware, userController.deleteUser);

export default router;