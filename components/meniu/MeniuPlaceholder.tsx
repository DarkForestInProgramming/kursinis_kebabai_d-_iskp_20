import React from "react";
import { Placeholder } from "react-bootstrap";

function MeniuPlaceholder() {
  return (
    <Placeholder
      as="p"
      animation="wave"
      className=""
      style={{ color: "red", marginBottom: "2rem" }}
    >
      <Placeholder xs={12} className="text-center">
        <text
          className="text-center"
          style={{ color: "white", fontWeight: "bold" }}
        >
          IkiSkanaus
        </text>
      </Placeholder>
    </Placeholder>
  );
}

export default MeniuPlaceholder;
