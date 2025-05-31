import { Model } from "mongoose";
import { IOtpModel, Otp } from "~/models/otp";
import User, { IUser } from "~/models/user";
import connectDB from "~/utils/db";

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);
  if (!email) {
    return createError({ statusCode: 400, statusMessage: "Email is required" });
  }
  await connectDB();
  const user = await (User as Model<IUser>).findOne({ email });
  if (!user) {
    return createError({ statusCode: 404, statusMessage: "User not found" });
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  await (Otp as Model<IOtpModel>).deleteMany({ userId: user._id });
  await saveOtp(user._id.toString(), otpCode);

  const emailHtml = `
    <div style="
      font-family: Arial, sans-serif;
      background: #f4f4f7;
      padding: 20px;
      text-align: center;
    ">
      <div style="
        background: white;
        max-width: 400px;
        margin: auto;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      ">
        <h2 style="color: #333;">Your OTP for password reset is:</h2>
        <p style="font-size: 16px; color: #555;">
          Use the code below to verify your email address and reset your password. ignore this email if you did not request a password reset.
        </p>
        <p style="
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 4px;
          color: #2E86DE;
          margin: 20px 0;
        ">
          ${otpCode}
        </p>
        <p style="font-size: 14px; color: #999;">
          This code will expire in 10 minutes.
        </p>
      </div>
    </div>
  `;
  await sendEmail({
    email: user.email,
    subject: "Your password reset OTP",
    html: emailHtml,
  });

  return {
    success: true,
    error: false,
    statusCode: 200,
    message: "OTP sent to your email",
  };
});
