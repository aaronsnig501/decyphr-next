import Head from "next/head";
import { PrismaClient } from "@prisma/client";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import Footer from "../../components/layout/Footer";
import styles from "./index.module.scss";

const Home: React.FC = (props) => {
  console.log(props);

  return (
    <div className="container-fluid">
      <Head>
        <title>Decyphr - Learn languages faster!</title>
      </Head>

      <main>
        <header className={styles.header}>
          <div className={styles.logo}>
            <img src="/logo.png" />
          </div>

          <p className={styles.callToAction}>
            <Link href="/api/login">
              <a>Start Reading!</a>
            </Link>
          </p>
        </header>
        <article id="about" className={styles.about}>
          <section>
            <Row>
              <Col sm={12} md={4}>
                <img className={`${styles.img}`} src="/languages.jpg" />
              </Col>

              <Col sm={12} md={8}>
                <h2>What does Decyphr do?</h2>

                <p>
                  Decyphr was built to help you translate text from the language
                  that your are learning in to your own native language.
                </p>

                <p>
                  While learning to read a new book you can translate your text
                  and get a breakdown of the structure of your translation, as
                  well as an audio clip so you can also get an idea of what the
                  text should sound like in the original text.
                </p>

                <p>
                  Decyphr will take the text that you have translated and
                  generate quizzes for you to allow you to practice, meaning you
                  create the context for your learning from the books that you
                  are reading.
                </p>
              </Col>
            </Row>
          </section>
          <section>
            <Row>
              <Col sm={12} md={4}>
                <img className={`${styles.img} mr-3`} src="/bookstack.jpg" />
              </Col>

              <Col sm={12} md={8}>
                <h2>Why choose Decyphr?</h2>
                <p>
                  Decyphr allows you to choose which books to read and enables
                  you to monitor your process throughout your own personalized
                  library. This will be able to tell how much progress you are
                  making on your journey to becoming fluent in your new
                  language.
                </p>
                <p>
                  Not only does Decyphr translate the text from your book, but
                  it also helps you to understand the structure of the sentences
                  that you have translated by telling you what words are verbs
                  or nouns, and what tenses a verb belongs to.
                </p>
                <p>
                  Decyphr will quiz you on the phrases that you have translated
                  from your books. This means that, because you are in complete
                  control of the material that you are reading, the material
                  that you will be quizzed on will be tailored to whatever
                  context you choose, giving you a completely personalized
                  learning experience.
                </p>
              </Col>
            </Row>
          </section>
        </article>
        <hr />
        <Footer />
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const posts = await prisma.user.findMany();

  return {
    props: {
      posts,
    },
  };
}

export default Home;
