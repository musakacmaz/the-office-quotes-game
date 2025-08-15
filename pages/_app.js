import "../styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system">
      <HeroUIProvider>
        <Component {...pageProps} />
      </HeroUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
