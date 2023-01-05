import React, { useState } from "react";
import { Navbar, Container, Nav, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { UseShoppingCart } from "../../context/ShoppingCartContext";
import Image from "react-bootstrap/Image";
import { useSession, signIn, signOut } from "next-auth/react";
import NavDropdown from "react-bootstrap/NavDropdown";
import paths from "../../styles/paths.json";

export function Header() {
  const { openCart, cartQuantity } = UseShoppingCart();
  const { data: session, status } = useSession();

  return (
    <Stack>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=Amatic+SC:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
        rel="stylesheet"
      />

      <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
        <Container style={{ verticalAlign: "middle" }}>
          <Navbar.Brand href="/">
            <Image
              src="/images/kursinis_logo.png"
              className="d-inline-block align-top"
              alt="Logo"
              style={{
                aspectRatio: "auto",
                marginRight: "20px",
                verticalAlign: "middle",
              }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15px"
                height="30px"
                className="d-inline-block align-top"
                style={{ verticalAlign: "middle", marginTop: "7px" }}
                viewBox="0 0 576 512"
              >
                <path d={paths[0]} />
              </svg>
              <Nav.Link
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  float: "left",
                  marginRight: "20px",
                  verticalAlign: "middle",
                  marginTop: "5px",
                }}
                href="/"
              >
                Titulinis
              </Nav.Link>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15px"
                height="30px"
                className="d-inline-block align-top"
                style={{ verticalAlign: "middle", marginTop: "7px" }}
                viewBox="0 0 576 512"
              >
                <path d={paths[2]} />
              </svg>

              <Nav.Link
                href="/meniu"
                style={{
                  color: "#dc3545",
                  fontWeight: "bold",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  float: "left",
                  marginRight: "20px",
                  verticalAlign: "middle",
                  marginTop: "5px",
                }}
              >
                Meniu
              </Nav.Link>
            </Nav>
            <Nav>
              {session && (
                <Image
                  className="rounded-full mx-2 object-contain rounded"
                  height={40}
                  width={40}
                  src={session.user.profile_picture}
                  alt="Profile Picture"
                  style={{ verticalAlign: "middle", marginTop: "12px" }}
                />
              )}
              {session && (
                <NavDropdown
                  title={session.user.name}
                  id="collasible-nav-dropdown"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textTransform: "uppercase",
                    verticalAlign: "middle",
                    marginTop: "11px",
                  }}
                >
                  <NavDropdown.Item
                    href="/profile"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "16px",
                      textTransform: "uppercase",
                      verticalAlign: "middle",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15px"
                      height="30px"
                      className="d-inline-block align-top"
                      style={{ verticalAlign: "middle", marginRight: "5px" }}
                      viewBox="0 0 576 512"
                    >
                      <path d={paths[8]} />
                    </svg>
                    Mano profilis
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => signOut()}
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "16px",
                      textTransform: "uppercase",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15px"
                      height="30px"
                      className="d-inline-block align-top"
                      style={{ verticalAlign: "middle", marginRight: "5px" }}
                      viewBox="0 0 576 512"
                    >
                      <path d={paths[9]} />
                    </svg>
                    Atsijungti
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  {session.user.role && (
                    <NavDropdown.Item
                      href="/admin"
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "16px",
                        textTransform: "uppercase",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15px"
                        height="30px"
                        className="d-inline-block align-top"
                        style={{ verticalAlign: "middle", marginRight: "5px" }}
                        viewBox="0 0 576 512"
                      >
                        <path d={paths[10]} />
                      </svg>
                      Užsakymai
                    </NavDropdown.Item>
                  )}
                </NavDropdown>
              )}
              {!session && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15px"
                  height="30px"
                  className="d-inline-block align-top"
                  style={{ verticalAlign: "middle", marginTop: "16px" }}
                  viewBox="0 0 576 512"
                >
                  <path d={paths[7]} />
                </svg>
              )}
              {!session && (
                <Nav.Link
                  onClick={() => signIn()}
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textTransform: "uppercase",
                    verticalAlign: "middle",
                    marginTop: "12px",
                  }}
                >
                  Prisijungti
                </Nav.Link>
              )}

              {cartQuantity > 0 && (
                <Button
                  onClick={openCart}
                  style={{
                    width: "3rem",
                    height: "3rem",
                    position: "relative",
                    marginTop: "6px",
                  }}
                  variant="outline-primary"
                  className="rounded-circle"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    fill="currentColor"
                  >
                    <path d={paths[1]} />
                  </svg>
                  <div
                    className="rounded-circle bg-danger d-flex justify-content-center
            align-items-center"
                    style={{
                      color: "white",
                      width: "1.5rem",
                      height: "1.5rem",
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      transform: "translate(25%, 25%)",
                    }}
                  >
                    {cartQuantity}
                  </div>
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Stack>
  );
}
