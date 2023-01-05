import Head from "next/head";
import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { ShoppingCartProvider } from "../../context/ShoppingCartContext";
import { Footer } from "./footer";
import { Header } from "./header";

type Props = { children: ReactNode };

export function Site({ children }: Props) {
  return (
    <>
      <ShoppingCartProvider>
        <Head>
          <meta charSet="utf-8"></meta>
          <title>IkiSkanaus</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Panevėžio kolegija, 2023" />
        </Head>
        <Container className="mycontainer">
          <Header />
          {children}
          <Footer />
        </Container>
      </ShoppingCartProvider>
    </>
  );
}
