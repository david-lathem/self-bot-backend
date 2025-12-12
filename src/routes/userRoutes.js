import express from "express";
import { getMe } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/@me", getMe);

export default userRouter;
