import { Schema, model, models, Model } from "mongoose";

export interface ISauce {
  _id: string;
  nr: number;
  title: string;
  sauce_picture: string;
  price: number;
}

const SauceSchema: Schema = new Schema<ISauce>({
  nr: { type: Number },
  title: { type: String },
  sauce_picture: { type: String },
  price: { type: Number },
});

export const Sauce: Model<ISauce, {}, {}, {}, any> = models.sauces
  ? models.sauces
  : model<ISauce>("sauces", SauceSchema);
