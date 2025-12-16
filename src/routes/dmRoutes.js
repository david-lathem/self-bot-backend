import express from "express";
import { getDms } from "../controllers/dmController.js";
import { dmOnly } from "../utils/checkers.js";

const dmRouter = express.Router();

dmRouter.get("/", dmOnly, getDms);

export default dmRouter;
