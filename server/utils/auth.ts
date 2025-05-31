import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET;

export function generateEncryptedToken(payload: object): string {
  const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
  return encrypt(token);
}

export function verifyEncryptedToken(encryptedToken: string): any | null {
  try {
    const decrypted = decrypt(encryptedToken);
    return jwt.verify(decrypted, SECRET);
  } catch (error) {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return password == decrypt(hash);
}
