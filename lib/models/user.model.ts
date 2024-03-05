import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your username"],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  passedTest: [{ type: mongoose.Schema.Types.ObjectId, ref: "passedTest" }],
});
const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;
