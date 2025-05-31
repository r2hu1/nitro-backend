import mongoose from "mongoose";
const { Schema, models } = mongoose;

export interface IOtpModel {
  userId: mongoose.Types.ObjectId;
  otpHash: string;
  expiresAt: Date;
}

const otpSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  otpHash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export const Otp = models.Otp || mongoose.model("Otp", otpSchema);
