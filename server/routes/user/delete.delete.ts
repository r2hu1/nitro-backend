import { Model } from "mongoose";
import User, { IUser } from "~/models/user";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.user;

    await (User as Model<IUser>).findByIdAndDelete(id);

    return {
      success: true,
      error: false,
      message: "User deleted successfully.",
      statusCode: 200,
    };
  } catch (err) {
    return createError({ statusCode: 400, statusMessage: err.message });
  }
});
