import Head from "next/head";

import { fetchEntries } from "../utils/contentfulPosts";

import Header from "@components/Header";
import Footer from "@components/Footer";
import Post from "@components/Post";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div className="container">
      <Head>
        <title>Next + Contentful Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <div className="posts">
          {posts.map((p) => {
            return (
              <section>
                {p.fields.sections.map((s) => {
                  if (s.sys.contentType.sys.id === "profile") {
                    return (
                      <div className="profile">
                        <img src={s.fields.image.fields.file.url} />
                        <div>
                          <h2>{s.fields.name}</h2>
                          <p>{s.fields.description}</p>
                        </div>
                      </div>
                    );
                  }
                  if (s.sys.contentType.sys.id === "hero") {
                    return (
                      <div className="hero">
                        <img src={s.fields.backgroundImage.fields.file.url} />
                        <h2>{s.fields.headline}</h2>
                      </div>
                    );
                  }
                  if (s.sys.contentType.sys.id === "pullquote") {
                    return (
                      <div className="pullquote">
                        <blockquote>{s.fields.quote}</blockquote>
                      </div>
                    );
                  }
                })}
              </section>
            );
          })}
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          max-width: 60vw;
          margin: 0 auto;
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .posts {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        section {
          margin: 2vh 0;
          border-bottom: 1px solid black;
          padding-bottom: 2vh;
        }
        .hero {
          display: flex;
          height: 20vh;
          text-align: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          color: white;
          padding: 0 50px;
        }
        .hero img {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          transform: translate(-50%, -50%);
          z-index: -1;
        }
        .profile {
          display: flex;
          width: 100%;
        }
        .profile img {
          width: 20%;
          margin-right: 20px;
        }
        .pullquote {
          font: xxx-large serif;
          text-align: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        img {
          display: block;
          max-width: 100%;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetchEntries();
  const posts = await res.filter((p) => {
    return p.sys.contentType.sys.id === "story";
  });

  return {
    props: {
      posts,
    },
  };
}
