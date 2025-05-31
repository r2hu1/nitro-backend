import { Model } from "mongoose";
import { IOtpModel, Otp } from "~/models/otp";
import User, { IUser } from "~/models/user";
import connectDB from "~/utils/db";

export default defineEventHandler(async (event) => {
  const { email, otp, newPassword } = await readBody(event);

  await connectDB();
  const user = await (User as Model<IUser>).findOne({ email });
  if (!user) {
    return createError({ statusCode: 404, statusMessage: "User not found" });
  }

  const otpRecord = await (Otp as Model<IOtpModel>).findOne({
    userId: user._id,
  });
  if (
    !otpRecord ||
    otpRecord.expiresAt < new Date() ||
    decrypt(otpRecord.otpHash) != otp
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid or expired OTP",
    });
  }

  const hashedPassword = encrypt(newPassword);

  await (User as Model<IUser>).findOneAndUpdate(
    { email },
    { password: hashedPassword },
  );
  await (Otp as Model<IOtpModel>).deleteOne({ _id: otpRecord._id });

  return {
    success: true,
    error: false,
    statusCode: 200,
    message: "Password reset successfully",
  };
});
