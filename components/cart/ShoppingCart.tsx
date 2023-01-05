import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { UseShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utilities/formatCurrency";
import React, { useState, useEffect } from "react";
import { Container, Placeholder, Modal } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useSession, signIn, signOut } from "next-auth/react";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const {
    closeCart,
    cartItems,
    kebabs,
    sauces,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = UseShoppingCart();

  const currKebab = (id: string) => {
    return kebabs.find((i) => i._id === id);
  };
  if (currKebab == null) return null;

  const currSauce = (_id: string) => sauces.find((i) => i._id === _id);
  if (currSauce == null) return null;

  const { data: session, status } = useSession();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Offcanvas
      style={{ overflow: "scroll" }}
      show={isOpen}
      onHide={closeCart}
      placement="end"
      size="lg"
    >
      <Container>
        <div className="d-flex align-items-end flex-column">
          <Placeholder className="" as="p" animation="glow" bg="danger" xs={12}>
            <Placeholder
              style={{
                color: "#000",
                fontWeight: "bold",
                fontSize: "15px",
              }}
              className="text-center my-3"
              bg="dark"
              xs={12}
            >
              <text className="text-danger text-center">
                BLACK FRIDAY PROGA, PRISTATYMAS Į NAMUS VISIŠKAI NEMOKAMAS!
              </text>
            </Placeholder>
          </Placeholder>
        </div>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Prekių krepšelis:</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Stack gap={2} className="d-flex align-items-center">
            {cartItems?.map((item, key) => {
              const kbIt = currKebab(item._id);
              return (
                <Col key={key}>
                  <Row>
                    <Col sm={7}>
                      <Image
                        fluid
                        rounded
                        className="rounded-left"
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                        }}
                        src={kbIt ? kbIt.picture : ""}
                      />
                    </Col>
                    <Col sm={5}>
                      <h4 className="text-start">{kbIt ? kbIt.title : ""}</h4>
                      <div className="my-3 py-0">
                        <h5 className="text-muted text-start">
                          {formatCurrency(
                            kbIt ? kbIt.price * item.quantity : 0
                          )}{" "}
                          {item.quantity > 1 && (
                            <span
                              className="py-2"
                              style={{ color: "black", fontSize: ".85rem" }}
                            >
                              x{item.quantity}
                            </span>
                          )}
                        </h5>
                      </div>
                      <p>Padažas:</p>
                      {item.sauce_id?.map((sauce, key) => {
                        const scIt = currSauce(sauce);
                        return (
                          <div key={key} className="">
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-disabled">
                                  {scIt ? scIt.title : ""}
                                </Tooltip>
                              }
                            >
                              <Image
                                height="50px"
                                width="50px"
                                style={{ marginBottom: "2rem" }}
                                src={scIt ? scIt.sauce_picture : ""}
                              />
                            </OverlayTrigger>
                          </div>
                        );
                      })}
                    </Col>
                    <div
                      className="d-flex align-items-start flex-column "
                      style={{ gap: ".5rem" }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ gap: ".5rem" }}
                      >
                        <Button
                          variant="primary"
                          className="me-3"
                          onClick={() => decreaseCartQuantity(item._id)}
                        >
                          -
                        </Button>

                        <div>
                          <span className="fs-3 me-3">{item.quantity}</span>
                          vienetų
                        </div>
                        <Button
                          variant="primary"
                          onClick={() =>
                            increaseCartQuantity(item._id, item.sauce_id)
                          }
                        >
                          +
                        </Button>
                      </div>
                      <div className="py-1 align-self-end">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeFromCart(item._id)}
                        >
                          &times;
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Placeholder
                        as="p"
                        animation="wave"
                        className="py-3"
                        style={{ color: "red" }}
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
                    </div>
                  </Row>
                </Col>
              );
            })}
            <div className="ms-auto fw-bold fs-5">
              {!session && (
                <div className="text-end">
                  <Button
                    onClick={handleShow}
                    variant="danger"
                    className="my-1 py-1  rounded-pill"
                    size="lg"
                  >
                    Tęsti pirkimą
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Klaida</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Prašome prisijungti, norint tęsti prekės(-ių) pirkimą.
                    </Modal.Body>
                    <Button variant="danger" onClick={() => signIn()}>
                      Prisijungti
                    </Button>
                  </Modal>
                </div>
              )}
              {session && (
                <a href="cart">
                  <Button
                    onClick={handleShow}
                    variant="danger"
                    className="my-1 py-1  rounded-pill"
                    size="lg"
                  >
                    Tęsti pirkimą
                  </Button>
                </a>
              )}
              <div className="text-end my-3">
                Iš viso:{" "}
                {formatCurrency(
                  cartItems.reduce((total, cartItem) => {
                    const currKebab = kebabs.find(
                      (i) => i._id === cartItem._id
                    );
                    return total + (currKebab?.price || 0) * cartItem.quantity;
                  }, 0)
                )}
              </div>
            </div>
          </Stack>
        </Offcanvas.Body>
      </Container>
    </Offcanvas>
  );
}
