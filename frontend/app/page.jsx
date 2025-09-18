import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Welcome!</h1>
        <Image
        // add pic of me
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol>
          <li>
            This is my mini site for fullstack using next.js, express, and firebase!
          </li>
          <li>Click below to see a list of my projects from my computer science classes</li>
          <li><a href="/projects">Projects</a></li>
        </ol>
      </main>

      <footer className={styles.footer}>
        <div className={styles.p}>
          <p>this is my footer. click the picture below to see my github repository for this page!!</p>
        </div>
          
        <a href="https://github.com/marywlong/fullstack-dv.git">
          <Image
          // add github pic
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
        </a>
      </footer>
    </div>
  );
}
