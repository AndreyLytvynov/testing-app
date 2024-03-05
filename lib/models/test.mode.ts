import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  countingPassedTests: {
    type: Number,
    default: 0,
  },
});

const Test = mongoose.models.test || mongoose.model("test", testSchema);
export default Test;
