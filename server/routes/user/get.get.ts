export default defineEventHandler(async (event) => {
  const { id, email } = event.context.user;

  if (!id || !email) {
    return createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  return {
    id,
    email,
    username: email.split("@")[0],
    statusCode: 200,
  };
});
