import React from "react";
import { Card, Row } from "react-bootstrap";

function MeniuLogo() {
  return (
    <Row>
      <a href="/meniu">
        <Card className=" card border-light">
          <Card.Img variant="top" src="/images/meniu.jpg" />
        </Card>
      </a>
    </Row>
  );
}

export default MeniuLogo;
