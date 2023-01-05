import { InferGetServerSidePropsType } from "next";
import {
  Button,
  OverlayTrigger,
  Popover,
  Modal,
  Image,
  Stack,
} from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { IKebab, Kebab } from "../schemas/kebab.schema";
import { ISauce, Sauce } from "../schemas/sauce.schema";
import connect from "../lib/mongoose";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import { useSession } from "next-auth/react";
import Tooltip from "react-bootstrap/Tooltip";
import Find from "../components/index/Find";
import Reviews from "../components/index/Reviews";
import Banner from "../components/index/Banner";
import Hottest from "../components/index/Hottest";
import Contact from "../components/index/Contact";
import Navas from "../components/index/Navas";
import HotCard from "../components/index/HotCard";
import fetchKebabs from "../utilities/fetchKebabs";
import Map from "../components/index/Map";
import isMobile from "../utilities/isMobile";
import { signIn } from "next-auth/react";
import HotCardTitle from "../components/index/HotCardTitle";

export async function getServerSideProps(
  context: any
): Promise<{ props: { kebabs: IKebab[]; sauces: ISauce[] } }> {
  return fetchKebabs();
}

type IState = boolean;

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const {
    increaseCartQuantity,
    setSauces,
    decreaseCartQuantity,
    removeFromCart,
    cartQuantity,
    setSlSauce,
    slSauce,
    setKebabs,
  } = UseShoppingCart();

  const { data: session } = useSession();
  const [Ssauce, setSsauce] = useState<string>("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isVisible, setVisible] = useState<IState>(false);

  const onHandleVisible = () => {
    setVisible(!isVisible);
  };

  useEffect(() => {
    setSauces(props.sauces);
    setKebabs(props.kebabs);
  }, [props]);

  const popover = useCallback(
    (id: string) => (
      <Popover id="popover-basic">
        <Popover.Body className="d-flex justify-content-center">
          <div
            className="d-flex align-items-center flex-column"
            style={{ gap: ".5rem" }}
          >
            {isVisible ? (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button
                  variant="primary"
                  className="me-3"
                  onClick={() => decreaseCartQuantity(id)}
                >
                  -
                </Button>

                <div>
                  <span className="fs-3 me-2">{cartQuantity}</span>
                  <span>Krepšelyje</span>
                </div>

                <Button
                  variant="primary"
                  onClick={() => [
                    increaseCartQuantity(id, slSauce),
                    handleShow(),
                  ]}
                >
                  +
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Valio! Prekė sėkmingai pridėta į krepšelį!
                    </Modal.Title>
                  </Modal.Header>
                  {!session && (
                    <Modal.Body>
                      Norėdami tęsti prekių pirkimą, prisijunkite.
                    </Modal.Body>
                  )}
                  {session && (
                    <Modal.Body>
                      Pasirinkti daugiau vienetų ar keisti padažą galite
                      apačioje.
                    </Modal.Body>
                  )}
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Tęsti apsipirkimą
                    </Button>
                    {!session && (
                      <Button variant="primary" onClick={() => signIn()}>
                        Prisijungti
                      </Button>
                    )}
                    {session && <Button href="cart">Prekių krepšelis</Button>}
                  </Modal.Footer>
                </Modal>
              </div>
            ) : null}
            <div>
              {props.sauces.map((s, key) => (
                <OverlayTrigger
                  key={key}
                  overlay={<Tooltip id="tooltip-disabled">{s.title}</Tooltip>}
                >
                  <Button
                    onClick={() => {
                      onHandleVisible();
                      const isSl =
                        slSauce.findIndex((it) => it === s._id) !== -1;
                      if (!isSl) {
                        setSlSauce([...slSauce, s._id]);
                      } else {
                        setSlSauce(slSauce.filter((sauce) => sauce !== s._id));
                      }
                    }}
                    active={slSauce.findIndex((it) => it === s._id) !== -1}
                    className="saucesButton"
                    style={{ backgroundColor: "white", borderColor: "white" }}
                  >
                    <Image
                      className="my-1 py-1"
                      width="50"
                      height="50"
                      src={s.sauce_picture}
                    />
                  </Button>
                </OverlayTrigger>
              ))}
            </div>
            {isVisible ? (
              <Button
                variant="danger"
                className="d-flex"
                onClick={() => removeFromCart(id)}
              >
                Pašalinti
              </Button>
            ) : null}
          </div>
        </Popover.Body>
      </Popover>
    ),
    [decreaseCartQuantity, increaseCartQuantity, cartQuantity, removeFromCart]
  );
  const mob = isMobile(414);

  return (
    <Stack className="mystack">
      <Navas />
      <Banner />
      <Hottest />
      <Stack id="karsciausi" className="">
        <div className="px-4 px-lg-5 mt-5 meniuBottom bg-light">
          <HotCardTitle />
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {props.kebabs.map((k, i) => (
              <HotCard i={i} k={k} popover={popover} key={`hot${i}`} />
            ))}
          </div>
        </div>
      </Stack>
      <Contact />
      <Map />
      <Find />
      <Reviews />
    </Stack>
  );
}
