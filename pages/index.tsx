import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
const API =
  "https://api.github.com/search/repositories?q=+in:readme+language:javascript+good-first-issues:%3E0+stars:0..50&sort=stars&order=desc&per_page=100";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(API);
  const data = await res.json();

  console.log(process.env.GITHUB_API);
  return {
    props: { data },
  };
};

const Home = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const getDate = async () => {
      const req = await fetch(API);
      const result = await req.json();

      setData(result as any);
    };
    getDate();
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>hello there</h1>
        {data?.items.map((item: any, index: number) => {
          return <div key={index}>{item.html_url}</div>;
        })}
      </div>
    </div>
  );
};

export default Home;
