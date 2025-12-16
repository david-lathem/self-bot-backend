import express from "express";
import { checkItemType } from "../utils/checkers.js";
import { backupItem } from "../controllers/backupController.js";

const backupRouter = express.Router();

backupRouter.post("/:itemId", checkItemType, backupItem);

export default backupRouter;
