import React from "react";
import { Button, OverlayTrigger, Stack } from "react-bootstrap";
import { IKebab } from "../../schemas/kebab.schema";
import isMobile from "../../utilities/isMobile";
import { OverlayChildren } from "react-bootstrap/esm/Overlay";

type Props = {
  k: IKebab;
  i: number;
  popover: (_id: string) => OverlayChildren;
};

export default ({ k, i, popover }: Props) => {
  const mob = isMobile(414);
  return (
    <div key={i} className="col mb-5">
      <div className="card h-100">
        <div
          className="badge bg-danger text-white position-absolute"
          style={{ top: "0.5rem", right: "0.5rem" }}
        >
          Akcija
        </div>
        <img className="card-img-top" src={k.picture} alt="..." />

        <div className="card-body p-4 meniuCard">
          <div className="text-center">
            <h5 className="fw-bolder">{k.title}</h5>
            <span className="text-muted text-decoration-line-through">
              €{k.old_price}
            </span>
            <span style={{ color: "red" }}>€{k.price}</span>
          </div>
        </div>
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="bottom"
              overlay={popover(k._id)}
            >
              <Button variant="danger" className="btn flex-shrink-0">
                + Pridėti į krepšelį
              </Button>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </div>
  );
};
