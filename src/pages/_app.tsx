import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { SettingsProvider } from "../lib/SettingsContext";
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
    <SettingsProvider>
      <Component {...pageProps} />
    </SettingsProvider>
    </ChakraProvider>
  );
}
