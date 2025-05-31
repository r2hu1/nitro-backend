import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

const pwdSchema = new Schema({
  name: {
    type: String,
    default: "Account",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Pwd = models.Pwd || model("Pwd", pwdSchema);
export default Pwd;
