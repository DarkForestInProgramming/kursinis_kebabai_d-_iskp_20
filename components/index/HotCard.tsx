import React from "react";
import {
  Carousel,
  Card,
  OverlayTrigger,
  Button,
  Image,
  Col,
  Row,
  CardGroup,
  Stack,
} from "react-bootstrap";
import { OverlayChildren } from "react-bootstrap/esm/Overlay";
import { IKebab } from "../../schemas/kebab.schema";
import isMobile from "../../utilities/isMobile";

type Props = {
  k: IKebab;
  i: number;
  popover: (_id: string) => OverlayChildren;
};

export default ({ k, i, popover }: Props) => {
  const mob = isMobile(414);

  return (
    <div className="col mb-5" style={{ borderColor: "white" }}>
      <div key={i} className="card h-100">
        <Carousel>
          <Carousel.Item>
            <div
              className="badge bg-danger text-white position-absolute"
              style={{ top: "0.5rem", right: "0.5rem" }}
            >
              Akcija
            </div>
            <Image className="card-img-top" src={k.picture} alt="..." />
          </Carousel.Item>
          <Carousel.Item>
            <Card.Img variant="top" src={k.slide} />
          </Carousel.Item>
        </Carousel>
        <div className="card-body p-4 meniuCard">
          <div className="text-center">
            <Image
              height={mob ? "55" : "110"}
              width={mob ? "75" : "150"}
              src={k.logo}
            />
            <h5
              className="fw-bolder"
              style={{ fontSize: mob ? "1.3rem" : "2rem" }}
            >
              {k.title}
            </h5>
            <span
              style={{ fontSize: mob ? "0.8rem" : "1rem" }}
              className="text-muted text-decoration-line-through"
            >
              €{k.old_price}
            </span>
            <span style={{ color: "red", fontSize: mob ? "1rem" : "1.3rem" }}>
              €{k.price}
            </span>
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
              <Button variant="danger" size="sm">
                + Pridėti į krepšelį
              </Button>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </div>
  );
};
