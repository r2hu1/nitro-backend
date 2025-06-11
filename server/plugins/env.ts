import dotenv from "dotenv";

export default defineNitroPlugin(async () => {
  dotenv.config();
  console.log("[DotEnv] Loaded .env");
});
