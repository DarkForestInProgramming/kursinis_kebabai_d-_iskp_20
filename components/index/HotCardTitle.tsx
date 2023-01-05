import React from "react";
import { Image } from "react-bootstrap";
import isMobile from "../../utilities/isMobile";

function HotCardTitle() {
  const mob = isMobile(414);

  return (
    <div>
      <h2
        className="mb-4 mt-5 "
        style={{
          fontWeight: "bolder",

          color: "black",
        }}
      >
        <div className="d-flex align-items-start justify-content-start">
          <Image
            className="rounded-circle me-3"
            src="/images/chef_logo.png"
            width="40px"
            height="40px"
          />
          <div
            style={{ fontSize: mob ? "2.2rem" : "3rem" }}
            className="fw-bold offers"
          >
            Šefo Antano karščiausi pasiūlymai!
          </div>
        </div>
      </h2>
    </div>
  );
}

export default HotCardTitle;
