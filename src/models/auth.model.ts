import mongoose, { Schema, Document } from "mongoose";

export interface IAuth extends Document {
  username: string;
  password: string;
  accesstoken:string;
  refreshtoken: string | null;
}

const authSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  accesstoken : {type: String},
  refreshtoken : {type: String}
});

export const AuthModel = mongoose.model<IAuth>("Auth", authSchema);