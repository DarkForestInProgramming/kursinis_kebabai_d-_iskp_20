import { InferGetServerSidePropsType } from "next";
import { Button, Modal, OverlayTrigger, Popover, Stack } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import React, { useCallback, useEffect, useState } from "react";
import { IKebab } from "../schemas/kebab.schema";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import Tooltip from "react-bootstrap/Tooltip";
import { ISauce, Sauce } from "../schemas/sauce.schema";
import { signIn, useSession } from "next-auth/react";
import isMobile from "../utilities/isMobile";
import CheckMeniu from "../components/meniu/CheckMeniu";
import MeniuLogo from "../components/meniu/MeniuLogo";
import MeniuBreadcrumb from "../components/meniu/MeniuBreadcrumb";
import MeniuProducts from "../components/meniu/MeniuProducts";
import fetchKebabs from "../utilities/fetchKebabs";
import MeniuPlaceholder from "../components/meniu/MeniuPlaceholder";
import SimProducts from "../components/meniu/SimProducts";

export async function getServerSideProps(
  context: any
): Promise<{ props: { kebabs: IKebab[]; sauces: ISauce[] } }> {
  return fetchKebabs();
}

type IState = boolean;

export default function Meniu(
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
  const [show, setShow] = useState(false);
  const [Ssauce, setSsauce] = useState<string>("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isVisible, setVisible] = useState<IState>(false);
  const onHandleVisible = () => {
    setVisible(!isVisible);
  };

  useEffect(() => {
    setKebabs(props.kebabs);
    setSauces(props.sauces);
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
    <Stack>
      <MeniuBreadcrumb />
      <MeniuLogo />
      <CheckMeniu />
      {props.kebabs.map((k, i) => (
        <MeniuProducts i={i} k={k} popover={popover} key={`meniu${i}`} />
      ))}
      <MeniuPlaceholder />

      <Stack className="py-5">
        <div className="px-4 px-lg-5 mt-5 meniuBottom bg-light">
          <h2
            className="mb-4 mt-5 "
            style={{
              fontWeight: "bolder",

              color: "black",
            }}
          >
            Panašūs produktai
          </h2>
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {props.kebabs.map((k, i) => (
              <SimProducts i={i} k={k} popover={popover} key={`sim${i}`} />
            ))}
          </div>
        </div>
      </Stack>
    </Stack>
  );
}
