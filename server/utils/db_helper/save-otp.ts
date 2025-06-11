import { Model } from "mongoose";
import { IOtpModel, Otp } from "~/models/otp";

export default async function saveOtpForUser(userId: string, otp: string) {
  const hashedOtp = encrypt(otp);

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await Otp.deleteMany({ userId });
  await (Otp as Model<IOtpModel>).create({
    userId,
    otpHash: hashedOtp,
    expiresAt,
  });
}
