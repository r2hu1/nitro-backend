import dotenv from "dotenv";
import {
  encrypt as scEncrypt,
  decrypt as scDecrypt,
} from "@tsmx/string-crypto";
dotenv.config();

const encryptionKey = process.env.ENCRYPTION_KEY;
if (!encryptionKey) {
  // throw new Error("Encryption key is not set");
  console.log(encryptionKey);
}

export const encrypt = (data: string): string => {
  return scEncrypt(data, { key: encryptionKey });
};

export const decrypt = (data: string): string => {
  return scDecrypt(data, { key: encryptionKey });
};
