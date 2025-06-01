import mongoose, { Model } from "mongoose";
const { model, models, Schema } = mongoose;

export interface IUser {
  email: string;
  password: string;
  status?: string;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "unverified",
  },
});

userSchema.pre("save", async function (next) {
  const emailExists = await (User as Model<IUser>).findOne({
    email: this.email,
  });
  if (emailExists) {
    throw new Error("Email already exists");
  }
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }
  if (this.password.includes("password")) {
    throw new Error("Password cannot contain the word 'password'");
  }
  if (this.password.includes("12345678")) {
    throw new Error("Password cannot contain the word '12345678'");
  }
  this.password = encrypt(this.password);
});

const User = models.User || model("User", userSchema);
export default User;
