import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import useQuote from "../hooks/useQuote";
import useCharacters from "../hooks/useCharacters";
import { useState } from "react";
import { useTheme as useNextTheme } from "next-themes";
import {
  Switch,
  useTheme,
  Loading,
  Text,
  Grid,
  Spacer,
  Card,
  Button,
} from "@nextui-org/react";
import { faSun, faMoon, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Choices from "../components/choices";
import Scoreboard from "../components/scoreboard";
import { buildChoices } from "../utils";
import { useSWRConfig } from "swr";
import confetti from "canvas-confetti";

export default function Home() {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        {" "}
        <Loading type="gradient" />{" "}
      </div>
    );
  }

  if (isErrorQuote || isErrorCharacters) {
    return (
      <Text h1 color="error">
        Error while fetching data!
      </Text>
    );
  }

  const { content, character: quoteOwner } = quote.data;
  const choices = buildChoices(quoteOwner, characters.data);

  return (
    <div className={styles.container}>
      <Head>
        <title>The Office Quotes Game</title>
        <meta name="description" content="The Office Quotes Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid.Container gap={2} justify="space-evenly">
        <Grid xs className={styles.display}>
          <Switch
            shadow
            color="secondary"
            initialChecked={isDark}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            iconOn={<FontAwesomeIcon icon={faSun} />}
            iconOff={<FontAwesomeIcon icon={faMoon} />}
          />
        </Grid>
        <Grid xs className={styles.display}>
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
        </Grid>
      </Grid.Container>

      <main className={styles.main}>
        <Scoreboard score={score} />
        {!isGameOver ? (
          <>
            <Text blockquote>{content}</Text>
            <Spacer y={1} />
            <Choices choices={choices} onClick={handleClick}></Choices>
          </>
        ) : (
          <>
            <Card color="error">
              <Text
                css={{
                  fontWeight: "$bold",
                  color: "$white",
                  textAlign: "center",
                }}
                transform="capitalize"
              >
                Game Over!
              </Text>
            </Card>
            <Spacer y={1} />
            <Button
              icon={<FontAwesomeIcon icon={faPlay} />}
              color="success"
              onClick={() => {
                mutate("/api/quote");
                setScore(0);
                setIsGameOver(false);
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
