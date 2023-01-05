import type { NextApiRequest, NextApiResponse } from "next";
import { IOrder, Order } from "../../../schemas/order.schema";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "../../../lib/mongoose";


export default async function GetOrder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: {id},
    method,
  } = req

  await dbConnect()

 const session = await unstable_getServerSession(req, res, authOptions);
 if (!session) return res.status(401).json({ error: "Reikia prisijungti" });

 const userName = session.user.username

  switch (method) {
case 'GET':
try {
  const order = await Order.find({})
  if (!order) {
    return res.status(400).json({ success: false})
  }
  res.status(200).json({ success: true, data: order})
} catch (error) {
  res.status(400).json({ success: false })
}
break

  
  default: res.status(400).json({ success: false})
  break
  }

}