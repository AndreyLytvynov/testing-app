import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: [String],
  correctAnswer: {
    type: String,
    required: true,
  },
  docs: { type: String },
  image: {
    publicId: String,
    url: String,
  },
});

const Question =
  mongoose.models.question || mongoose.model("question", questionSchema);

export default Question;
