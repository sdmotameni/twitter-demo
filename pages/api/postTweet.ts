import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";

import { groq } from "next-sanity";

type Data = Comment[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { tweetId } = req.query;

  const comments: Comment[] = await sanityClient.fetch(commentQuery, {
    tweetId,
  });

  res.status(200).send(comments);
}
