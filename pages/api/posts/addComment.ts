import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res
        .status(401)
        .json({ message: "Please sign in to write a comment" });
    // Get user
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email!
      },
    });
    console.log(req.body);
    try {
      const { message, postId } = req.body
      // Validate comment
      if (message.length > 150)
        return res.status(403).json({ message: "Maximum comment length is 150" });
      if (!message.length)
        return res.status(401).json({ message: "You can't leave this empty." });
      const result = await prisma.comment.create({
        data: {
          message,
          userId: user?.id || '',
          postId
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res
        .status(403)
        .json({ err: "Error has occured whilst adding a comment" });
    }
  }
}
