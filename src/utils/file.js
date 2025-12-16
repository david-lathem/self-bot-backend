import fs from "node:fs/promises";
import path from "node:path";
import fsSync from "node:fs";

const __dirname = import.meta.dirname;

const backupPath = path.join(__dirname, "..", "..", "backups");

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
  const backupFilePath = path.join(backupPath, `backup-${backupId}.json`);

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

export const getBackupByPath = async (backupId) => {
  const backupFilePath = path.join(backupPath, `backup-${backupId}.json`);

  if (!fsSync.existsSync(backupFilePath)) return;

  return await fs.readFile(backupFilePath, "utf-8");
};

export const getAllBackups = () => {
  const backups = fsSync
    .readdirSync(backupPath)
    .filter((file) => file.startsWith(`backup-`) && file.endsWith(".json"))
    .map((file) => {
      try {
        const filePath = path.join(backupPath, file);
        const data = JSON.parse(fsSync.readFileSync(filePath, "utf-8"));
        return {
          id: data.id,
          name: data.name,
          iconURL: data.iconURL,
          type: data.type,
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    })
    .filter((data) => data !== null);

  return backups;
};
