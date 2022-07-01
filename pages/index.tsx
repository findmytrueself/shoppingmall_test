import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
const Home: NextPage = () => {
  const [accessToken, setAccessToken] = useState(null);
  console.log(accessToken);
  const mallId = "psg9";
  const clientId = "vGLDuUveMSfxygL1rnB6rP";
  const clientSecret = "SF0h2NMJDVSgHa3wkMXJnC";
  const base64ClientKey = btoa(`${clientId}:${clientSecret}`);
  const state = btoa("hello");
  const redirectURI = "https://strong-zabaione-7783ec.netlify.app";
  const scope =
    "mall.read_application,mall.write_application,mall.read_product,mall.write_product,mall.read_collection";
  const requestURL = `https://${mallId}.cafe24api.com/api/v2/oauth/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${redirectURI}&scope=${scope}`;
  const getAccessToken = async (authorizationCode: string) => {
    const accessTokenRes = await axios.post(
      `https://${mallId}.cafe24api.com/api/v2/oauth/token`,
      {
        grant_type: `authorization_code`,
        code: `${authorizationCode}`,
        redirect_uri: `${redirectURI}`,
      },
      {
        headers: {
          Authorization: `Basic ${base64ClientKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Request-Headers": "authorization",
        },
      }
    );
    setAccessToken(accessTokenRes.data.access_token);
  };
  const handleLogin = () => {
    window.location.assign(requestURL);
  };
  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    console.log(authorizationCode);
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const code = "97h6z2xoFtgnqPbHjW3CyB";
  // const accessToken = axios
  //   .post(`https://${mallId}.cafe24api.com/api/v2/oauth/token`, {
  //     headers: {
  //       Authorization: `Basic ${base64ClientKey}`,
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       grant_type: "authorization_code",
  //       code: `${code}`,
  //       redirect_uri: `${redirectURI}`,
  //     },
  //   })
  //   .then((data) => console.log(data));
  // const CAFE24_SDK = axios.get();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <button onClick={handleLogin}>code받아오기</button>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
