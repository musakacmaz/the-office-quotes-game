import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import useQuote from '../hooks/useQuote'
import { useState } from 'react'

export default function Home() {
  const [score, setScore] = useState(0)
  const { quote, isLoading, isError } = useQuote()

  if (isLoading) return <h1 className={styles.title}> Loading... </h1>
  if (isError) return <h1 className={styles.title}> Error while fetching data! </h1>

  const { content, character } =  quote.data || {}

  return (
    <div className={styles.container}>
      <Head>
        <title>The Office Quotes Game</title>
        <meta name="description" content="The Office Quotes Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.data}>
          Score: {score}
        </h1>
        <p className={styles.quote}>
          {content}
        </p>

        <div className={styles.grid}>
          <a href="" className={styles.card}>
            <p>{character.firstname + ' ' + character.lastname}</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/musakacmaz/the-office-quotes-game"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check out the code on GitHub
          <span className={styles.logo}>
            <Image src="/github-brands.svg" alt="Github Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
