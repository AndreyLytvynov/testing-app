import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "test",
  },

  questions: [{ answer: String, correctAnswer: String }],
});
const Question =
  mongoose.models.question || mongoose.model("question", questionSchema);
export default Question;
