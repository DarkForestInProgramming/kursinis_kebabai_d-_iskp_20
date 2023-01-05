import React from "react";
import {
  Button,
  Card,
  Carousel,
  Image,
  OverlayTrigger,
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
    <Stack key={i} className="">
      <div className="container px-4 px-lg-5 my-5 meniuPage">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <Carousel controls={false}>
              <Carousel.Item>
                <Image
                  className="card-img-top mb-5 mb-md-0"
                  src={k.picture}
                  alt="..."
                />
              </Carousel.Item>
              <Carousel.Item>
                <Card.Img variant="top" src={k.slide} />
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-md-6">
            <div className="">
              <Image
                height={mob ? "100px" : "150px"}
                width={mob ? "130px" : "200px"}
                src={k.logo}
              />
            </div>
            <h1 style={{ fontSize: mob ? "3.5rem" : "4rem" }}>{k.title}</h1>
            <div className="fs-5 mb-5" style={{}}>
              <span className="text-decoration-line-through text-dark">
                €{k.old_price}
              </span>
              <span style={{ color: "red" }}>€{k.price}</span>
            </div>
            <p>{k.description}</p>
            <div className="d-flex">
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
    </Stack>
  );
};
