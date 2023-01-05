import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.send(JSON.stringify({}));
  res.send(JSON.stringify(session, null, 2));
}
