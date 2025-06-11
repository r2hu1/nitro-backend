import { Model } from "mongoose";
import { IOtpModel, Otp } from "~/models/otp";
import User, { IUser } from "~/models/user";

export default defineEventHandler(async (event) => {
  const { otp } = await readBody(event);
  const { id } = event.context.user;

  const record = await (Otp as Model<IOtpModel>).findOne({ userId: id });

  if (!record) {
    return createError({ statusCode: 404, statusMessage: "OTP not found" });
  }

  if (record.expiresAt < new Date()) {
    await Otp.deleteOne({ id });
    return createError({ statusCode: 400, statusMessage: "OTP expired" });
  }

  const isMatch = otp === decrypt(record.otpHash);
  if (!isMatch) {
    return createError({ statusCode: 400, statusMessage: "Invalid OTP" });
  }

  await (Otp as Model<IOtpModel>).deleteMany({ userId: id });
  await (User as Model<IUser>).updateOne({ _id: id }, { status: "verified" });
  return {
    success: true,
    error: false,
    statusCode: 200,
    message: "OTP verified successfully",
  };
});
