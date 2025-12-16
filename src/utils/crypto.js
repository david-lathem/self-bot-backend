import crypto from "node:crypto";

export const generateUniqueId = () => crypto.randomBytes(16).toString("hex");
