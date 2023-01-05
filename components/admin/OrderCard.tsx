import React from "react";
import { Card } from "react-bootstrap";

function OrderCard() {
  return (
    <Card
      style={{
        padding: 0,
        boxSizing: "border-box",
        maxWidth: "98%",
        margin: "auto",
        backgroundColor: "transparent",
      }}
    >
      <Card.Img variant="top" src="/images/uzsakymai.jpg" />
    </Card>
  );
}

export default OrderCard;
