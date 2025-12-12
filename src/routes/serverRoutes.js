import express from "express";
import { getConfig, setConfig } from "../controllers/configController.js";

const serverRouter = express.Router();

serverRouter.get("/", getConfig);

export default serverRouter;
