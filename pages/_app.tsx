import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Site } from "../components/layouts/site";
import { Session } from "next-auth";

import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  return (
    <SSRProvider>
      <SessionProvider session={session}>
        <Site>
          <Component {...pageProps} />
        </Site>
      </SessionProvider>
    </SSRProvider>
  );
}
