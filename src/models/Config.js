import mongoose from "mongoose";
import { botTypeArray } from "../utils/constants.js";

const configSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  tokenType: {
    type: String,
    enum: botTypeArray,
    required: true,
  },
});

export default mongoose.model("Config", configSchema);
