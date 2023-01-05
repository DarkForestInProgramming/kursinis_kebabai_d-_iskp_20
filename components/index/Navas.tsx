import Nav from "react-bootstrap/Nav";

export default function Navas() {
  return (
    <Nav
      style={{
        backgroundColor: "#dc3545",

        textAlign: "end",
      }}
      className="justify-content-center"
    >
      <Nav.Item>
        <Nav.Link
          href="/#main"
          style={{
            fontWeight: "bold",
            color: "white",
            textTransform: "uppercase",
            fontSize: "16px",
            backgroundColor: "black",
          }}
        >
          Pagrindinis
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/#contact"
          style={{
            fontWeight: "bold",
            color: "white",
            textTransform: "uppercase",
            fontSize: "16px",
          }}
        >
          Kontaktai
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/#recomendations"
          style={{
            fontWeight: "bold",
            color: "white",
            textTransform: "uppercase",
            fontSize: "16px",
          }}
        >
          Atsiliepimai
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
