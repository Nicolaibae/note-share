import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  accesstoken:string;
  refreshtoken: string|null;
  
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accesstoken:{ type: String },
  refreshtoken:{ type: String }
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);
