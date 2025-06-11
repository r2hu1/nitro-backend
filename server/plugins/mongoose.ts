import connectDB from "~/utils/db_helper/connect";

export default defineNitroPlugin(async () => {
  await connectDB();
  console.log("[Mongoose] Connected to Database");
});
