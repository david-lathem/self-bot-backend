import fs from "node:fs/promises";
import path from "node:path";
import fsSync from "node:fs";

const __dirname = import.meta.dirname;

export const ensureAttachmentsDirectoryExists = (itemId) => {
  const attachmentsDirectory = path.join(
    __dirname,
    "..",
    "..",
    "attachments",
    itemId
  );

  if (!fsSync.existsSync(attachmentsDirectory)) {
    fsSync.mkdirSync(attachmentsDirectory, { recursive: true });
  }
};

export const saveBackup = async (backupId, backupData) => {
  const backupFilePath = path.join(
    __dirname,
    "..",
    "..",
    "backups",
    `backup-${backupId}.json`
  );

  await fs.writeFile(
    backupFilePath,
    JSON.stringify(backupData, null, 2),
    "utf-8"
  );

  console.log(`Backup saved to ${backupFilePath}`);
};

export const saveAttachment = async (
  itemId,
  attachmentId,
  fileExtension,
  attachmentBuffer
) => {
  const attachmentFilePath = path.join(
    __dirname,
    "..",
    "..",
    "attachments",
    itemId,
    `${attachmentId}.${fileExtension}`
  );

  await fs.writeFile(attachmentFilePath, attachmentBuffer);
};
