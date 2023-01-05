import { Schema, model, models, Model } from "mongoose";

export interface IOrder {
  _id: string;
  nr: number;
  userName: string;
  title: string;
  sauces: string[];
  pieces: number;
  duration: number;
  status: string;
  user_id: string;
  start_time: number;
  transaction_id: string;
  order_id: string;
}

const OrderSchema: Schema = new Schema<IOrder>(
  {
    nr: { type: Number },
    userName: { type: String },
    title: { type: String },
    sauces: [
      {
        type: String,
      },
    ],
    pieces: { type: Number },
    status: { type: String },
    user_id: { type: String },
    duration: { type: Number, require: false },
    transaction_id: { type: String },
    order_id: { type: String },
    start_time: { type: Number, require: false },
  },
  {
    versionKey: false,
  }
);
export const Order: Model<IOrder, {}, {}, {}, any> = models.korders
  ? models.korders
  : model<IOrder>("korders", OrderSchema);
