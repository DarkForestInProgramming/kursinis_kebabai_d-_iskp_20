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

  // await dbConnect()

 const session = await unstable_getServerSession(req, res, authOptions);
 if (!session) return res.status(401).json({ error: "Reikia prisijungti" });

 const userName = session.user.username

  switch (method) {
case 'GET':
try {
  const order = await Order.findById(id)
  if (!order) {
    return res.status(400).json({ success: false})
  }
  res.status(200).json({ success: true, data: order})
} catch (error) {
  res.status(400).json({ success: false })
}
break
case 'POST':
try {
  await Order.insertMany(req.body)
  res.status(200).json({ success: true, data: []})
} catch (error) {
  res.status(400).json({ success: false })
}
break
case "PUT" :
try {

  const order = await Order.updateOne({_id: id}, {$set: {duration: req.body, start_time: Date.now() }}, {upsert:true})

  console.log(await order)
  if (!order) {
    return res.status(400).json({ success: false })
  }
  return res.status(200).json({ success: true, data: order })

} catch (error) {
  console.log(error)
  return res.status(400).json({ success: false })

}
 
case 'DELETE':
  try {
    const deletedOrder = await Order.deleteOne({ _id: id })
    if (!deletedOrder) {
      return res.status(400).json({ success: false })
    }
    res.status(200).json({ success: true, data: {} })

  } catch (error) {
    res.status(400).json({ success: false})
  }
  break 
  
  default: res.status(400).json({ success: false})
  break
  }

// const orders: Partial<IOrder>[] = req.body.map((i: IOrder) => ({...i, userName}))
// Order.updateOne({_id:req.body.id}, {duration:req.body.duration})

//   console.log(orders)
  // res.send('')
}