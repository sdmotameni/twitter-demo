// Libraries
import Head from "next/head";

// Components
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";

// Types
import type { NextPage, GetServerSideProps } from "next";
import { fetchTweets } from "../utils/fetchTweets";
import { Tweet } from "../typings";
import { Toaster } from "react-hot-toast";

interface Props {
  tweets: Tweet[];
}

const Home: NextPage = ({ tweets }: Props) => {
  return (
    <div className="max-h-screen mx-auto overflow-hidden lg:max-w-6xl">
      <Head>
        <title>Twitter Demo</title>
      </Head>
      <Toaster />

      <main className="grid grid-cols-9 ">
        <Sidebar />
        <Feed tweets={tweets} />
        <Widgets />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();

  return {
    props: {
      tweets,
    },
  };
};
