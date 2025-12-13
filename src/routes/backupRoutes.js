import express from "express";
import { dmOnly } from "../middlewares/dm.js";

const backupRouter = express.Router();

backupRouter.get("/dms/:channelId", dmOnly, getServers);

export default backupRouter;
