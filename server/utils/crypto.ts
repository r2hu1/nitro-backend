import * as crypto from "crypto";
import bcrypt from "bcryptjs";

const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
if (!encryptionKey) {
  throw new Error("Encryption key is not set");
}

export const encrypt = (plaintext: string): string => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey, iv);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString("base64");
};

export const decrypt = (data: string): string => {
  const bData = Buffer.from(data, "base64");
  const iv = bData.slice(0, 12);
  const tag = bData.slice(12, 28);
  const encrypted = bData.slice(28);

  const decipher = crypto.createDecipheriv("aes-256-gcm", encryptionKey, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
};

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};
