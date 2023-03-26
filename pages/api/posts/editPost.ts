import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){
  if(req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions);
    const newTitle:string = req.body.title;
    if(!session) return res.status(401).json({message: "Please sign in"})
    if(newTitle.length > 300) return res.status(403).json({message: "Post length exceeded the limit"})
    if(!newTitle.length) return res.status(403).json({message: "Please enter message"})
    try {
      const postId = req.body.postId
      const result = await prisma.post.update({
        where: {
          id: postId
        },
        data: {
          title: newTitle
        }
      })
      res.status(200).json(result)
    } catch(err) {
      res.status(403).json({err: "Error has occured whilst editing the post"})

    }
  }
}
