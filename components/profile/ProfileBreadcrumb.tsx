import React from "react";
import { Breadcrumb } from "react-bootstrap";
import paths from "../../styles/paths.json";

function ProfileBreadcrumb() {
  return (
    <div className="py-4" style={{ marginLeft: "3.8rem" }}>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          Pagrindinis
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15px"
            height="12px"
            className=""
            style={{ marginLeft: "3px", marginBottom: "1px" }}
            viewBox="0 0 576 512"
          >
            <path d={paths[14]} />
          </svg>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default ProfileBreadcrumb;
