import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
    },
  ],
});
const Test = mongoose.models.test || mongoose.model("test", testSchema);
export default Test;
