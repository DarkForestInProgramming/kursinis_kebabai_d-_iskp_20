import connect from "../lib/mongoose";
import { IKebab, Kebab } from "../schemas/kebab.schema";
import { ISauce, Sauce } from "../schemas/sauce.schema";
import { IOrder, Order } from "../schemas/order.schema";

export default async () => {
  await connect();
  const kebabs: IKebab[] = await Kebab.find({});
  const sauces: ISauce[] = await Sauce.find({});
  const orders: IOrder[] = await Order.find({});

  return {
    props: {
      kebabs: JSON.parse(JSON.stringify(kebabs)),
      sauces: JSON.parse(JSON.stringify(sauces)),
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
};
