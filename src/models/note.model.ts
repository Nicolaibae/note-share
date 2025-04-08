import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  viewers: string[];
}
const noteSchema: Schema = new Schema({
  title: { type: String, require: true, unique: true },
  content: { type: String, require: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  viewers: [{ type: String }],
});
export const NoteModel = mongoose.model<INote>("Note", noteSchema);
