import { Model } from "mongoose";
import { IOtpModel, Otp } from "~/models/otp";
import connectDB from "./db";

export default async function saveOtpForUser(userId: string, otp: string) {
  await connectDB();
  const hashedOtp = encrypt(otp);

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await Otp.deleteMany({ userId });
  await (Otp as Model<IOtpModel>).create({
    userId,
    otpHash: hashedOtp,
    expiresAt,
  });
}
