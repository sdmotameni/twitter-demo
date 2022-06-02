import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";
import { Tweet, TweetBody } from "../../typings";

type Data = {
  tweets: Tweet[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: TweetBody = JSON.parse(req.body);

  const mutations = {
    mutations: [
      {
        create: {
          _type: "tweet",
          text: data.text,
          username: data.userName,
          blockedTweet: false,
          profileImg: data.profileImg,
          image: data.image,
        },
      },
    ],
  };

  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

  const result = await fetch(apiEndpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
  });
}
