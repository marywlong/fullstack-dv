import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome!</h1>

        <Image
          className={styles.heroImage}
          src="/me.JPG"
          alt="picture of me"
          width={400}
          height={550}
          priority
        />

        <ul className={styles.list}>
          <li>This is my mini site for fullstack using Next.js, Express, and Firebase!</li>
          <li>Click below to see a list of my projects from my computer science classes.</li>
        </ul>

        <a href="/projects" className={styles.button}>Projects</a>
      </main>

      <footer className={styles.footer}>

        <div className={styles.footerText}>
          <p> 
            this is my footer. click the picture below to see my github repository for this page!! <br /> 
            <a href="https://github.com/marywlong/fullstack-dv.git" className={styles.ghLink} aria-label="open Github Repository"> 
              <Image src="/github.png" alt="github image" width={30} height={30}/> 
            </a> 
          </p> 
        </div>
      </footer>
    </div>
  );
}
