import React from "react";
import { Stack } from "react-bootstrap";
import isMobile from "../../utilities/isMobile";

function CheckMeniu() {
  const mob = isMobile(414);
  return (
    <Stack id="menu" className="menu">
      <div>
        <div className="section-header">
          <h2>Mūsų meniu</h2>
          <p style={{ fontSize: mob ? "40px" : "48px" }}>
            Peržiūrėkite <span>Karščiausius pasiūlymus</span>
          </p>
        </div>
      </div>
    </Stack>
  );
}

export default CheckMeniu;
