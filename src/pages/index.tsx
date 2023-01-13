import Head from "next/head";
import { Heading } from "@ggalupo-ui/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>GG Call</title>
      </Head>

      <Heading as="h1">Hello world!</Heading>
    </>
  );
}
