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
          src="/me.JPG"
          alt="picture of me!"
          width={150}
          priority
        />

        <ul>
          <li>
            This is my mini site for fullstack using next.js, express, and firebase!
          </li>
          <li>Click below to see a list of my projects from my computer science classes</li>
          <li><a href="/projects">Projects</a></li>
        </ul>
      </main>

      <footer className={styles.footer}>
        <div className={styles.p}>
          <p>this is my footer. click the picture below to see my github repository for this page!!</p>
        </div>
          
        <a href="https://github.com/marywlong/fullstack-dv.git">
          <Image
          // add github pic
            src="/github.png"
            alt="github image"
            width={25}
            height={25}
          />
        </a>
      </footer>
    </div>
  );
}
