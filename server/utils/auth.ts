import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET = process.env.JWT_SECRET;

export function generateEncryptedToken(payload: object): string {
  const token = jwt.sign(payload, SECRET, { expiresIn: "24h" });
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

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
