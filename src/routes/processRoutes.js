import express from "express";
import {
  getProcesses,
  removeProcess,
} from "../controllers/processController.js";

const processRouter = express.Router();

processRouter.get("/", getProcesses);
processRouter.post("/:processId", removeProcess);

export default processRouter;
