import mongoose from "mongoose";

const passedTestSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "test",
  },
  incorrectlyAnswered: [
    { type: mongoose.Schema.Types.ObjectId, ref: "question" },
  ],
  passed: {
    type: Boolean,
  },
});

const PassedTest =
  mongoose.models.passedTest || mongoose.model("passedTest", passedTestSchema);

export default PassedTest;
