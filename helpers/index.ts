import mongoose from "mongoose";

export function transformIdToObjectID(id: string | undefined) {
  return new mongoose.Types.ObjectId(id);
}
