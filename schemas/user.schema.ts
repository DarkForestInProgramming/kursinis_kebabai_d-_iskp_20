import mongoose, { Schema, Model } from "mongoose";

export interface IUser {
  _id: string;
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  profile_picture: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String },
  password: { type: String },
  name: { type: String },
  surname: { type: String },
  email: { type: String, unique: true },
  profile_picture: { type: String },
  role: { type: String },
});

export const User: Model<IUser, {}, {}, {}, any> = mongoose.models.users
  ? mongoose.models.users
  : mongoose.model<IUser>("users", UserSchema);
