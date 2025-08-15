import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import useQuote from "../hooks/useQuote";
import useCharacters from "../hooks/useCharacters";
import { useState } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch, Spinner, Card, Button } from "@heroui/react";
import { faSun, faMoon, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Choices from "../components/choices";
import Scoreboard from "../components/scoreboard";
import { buildChoices } from "../utils";
import { useSWRConfig } from "swr";
import confetti from "canvas-confetti";

let choices;

export default function Home() {
  const { setTheme, resolvedTheme } = useNextTheme();
  const isDark = resolvedTheme === "dark";
  const type = resolvedTheme;
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(true);
  const { mutate } = useSWRConfig();

  const {
    quote,
    isLoading: isLoadingQuote,
    isError: isErrorQuote,
  } = useQuote();

  const {
    characters,
    isLoading: isLoadingCharacters,
    isError: isErrorCharacters,
  } = useCharacters();

  if (isLoading || isLoadingQuote || isLoadingCharacters) {
    return (
      <div className={styles.main}>
        <Spinner />
      </div>
    );
  }

  if (isErrorQuote || isErrorCharacters) {
    return (
      <p style={{ color: "#e00", fontWeight: 700, fontSize: "1.25rem" }}>
        Error while fetching data!
      </p>
    );
  }

  const { content, character: quoteOwner } = quote.data;
  if (flag) {
    choices = buildChoices(quoteOwner, characters.data);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>The Office Quotes Game</title>
        <meta name="description" content="The Office Quotes Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.headerRow}>
        <div className={styles.display}>
          <Switch
            shadow
            color="secondary"
            initialChecked={isDark}
            onChange={(e) => {
              setTheme(e.target.checked ? "dark" : "light");
              setFlag(false);
            }}
            iconOn={<FontAwesomeIcon icon={faSun} />}
            iconOff={<FontAwesomeIcon icon={faMoon} />}
          />
        </div>
        <div className={styles.display}>
          <Link href="https://github.com/musakacmaz/the-office-quotes-game">
            <a>
              <span className={styles.logo}>
                <Image
                  src="/github-brands.svg"
                  alt="Github Logo"
                  width={97}
                  height={40}
                />
              </span>
            </a>
          </Link>
        </div>
      </div>

      <main className={styles.main}>
        <Scoreboard score={score} />
        {!isGameOver ? (
          <>
            <blockquote className={styles.blockquote}>{content}</blockquote>
            <div style={{ height: 16 }} />
            <Choices choices={choices} onClick={handleClick}></Choices>
          </>
        ) : (
          <>
            <Card color="error">
              <p style={{ fontWeight: 700, color: "#fff", textAlign: "center", textTransform: "capitalize" }}>
                Game Over!
              </p>
            </Card>
            <div style={{ height: 16 }} />
            <Button
              icon={<FontAwesomeIcon icon={faPlay} />}
              color="success"
              onClick={() => {
                mutate("/api/quote");
                setScore(0);
                setIsGameOver(false);
                setFlag(true);
              }}
            >
              Play Again
            </Button>
          </>
        )}
      </main>
    </div>
  );

  function handleClick(choice) {
    setIsLoading(true);
    setFlag(true);
    if (choice.isOwner) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.8 },
      });
      setScore((score) => score + 1);
      mutate("/api/quote").then(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
      setIsGameOver(true);
    }
  }
}
