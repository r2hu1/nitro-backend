import { Model } from "mongoose";
import User, { IUser } from "~/models/user";
import { generateEncryptedToken } from "~/utils/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.email || !body.password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Missing email or password",
      }),
    );
  }
  const user = await (User as Model<IUser>).findOne({ email: body.email });
  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: "User not found",
      }),
    );
  }
  const isValid = await verifyPassword(body.password, user.password);
  if (!isValid) {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Invalid credentials" }),
    );
  }

  const encryptedToken = generateEncryptedToken({
    id: user.id,
    email: user.email,
  });

  return {
    success: true,
    error: false,
    token: encryptedToken,
    statusCode: 200,
  };
});
