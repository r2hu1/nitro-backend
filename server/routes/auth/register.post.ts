import { Model } from "mongoose";
import User, { IUser } from "~/models/user";
import connectDB from "~/utils/db";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    await connectDB();
    const email = body.email;
    const password = body.password;
    await (User as Model<IUser>).create({
      email: email,
      password: password,
    });
    return {
      success: true,
      error: false,
      statusCode: 200,
      message: "User registered successfully",
    };
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: error.message }),
    );
  }
});
