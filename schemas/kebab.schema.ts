import { Schema, model, models, Model } from "mongoose";

export interface IKebab {
  _id: string;
  nr: number;
  description: string;
  title: string;
  picture: string;
  price: number;
  old_price: number;
  logo: string;
  delivery: string;
  slide: string;
}

const KebabSchema: Schema = new Schema<IKebab>({
  nr: { type: Number },
  description: { type: String },
  title: { type: String },
  picture: { type: String },
  price: { type: Number },
  old_price: { type: Number },
  logo: { type: String },
  delivery: { type: String },
  slide: { type: String },
});

export const Kebab: Model<IKebab, {}, {}, {}, any> = models.kebabs
  ? models.kebabs
  : model<IKebab>("kebabs", KebabSchema);
