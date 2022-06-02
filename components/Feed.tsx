import { useState } from "react";
import { RefreshIcon } from "@heroicons/react/outline";

import TweetBox from "./TweetBox";
import TweetComponent from "./Tweet";

import { Tweet } from "../typings";

import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";

interface Props {
  tweets: Tweet[];
}

// TODO: Make feed scrollable

export default function Feed({ tweets: tweetsProp }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);

  const spinRefresh = (run: Boolean) => {
    var element = document.getElementById("refreshIcon");
    run && element.classList.add("animate-spin");
    !run && element.classList.remove("animate-spin");
  };

  const handleRefresh = async () => {
    spinRefresh(true);
    const refreshToast = toast.loading("refreshing...");

    const tweets = await fetchTweets();
    setTweets(tweets);

    toast.success("Feed Updated!", { id: refreshToast });
    spinRefresh(false);
  };

  return (
    <div className="max-h-screen col-span-7 overflow-scroll lg:col-span-5 scrollbar-hide">
      {/* Topbar */}
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          id="refreshIcon"
          onClick={handleRefresh}
          className="w-8 h-8 mt-5 mr-5 transition-all duration-500 ease-out cursor-pointer hover:rotate-180 active:scale-125 text-twitter"
        />
      </div>
      {/* TweetBox */}
      <div className="">
        <TweetBox />
      </div>
      {/* Tweets */}
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}
