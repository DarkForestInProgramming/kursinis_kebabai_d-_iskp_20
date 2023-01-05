import { Button, Image, Modal, Placeholder, Row } from "react-bootstrap";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { IKebab, Kebab } from "../schemas/kebab.schema";
import { ISauce, Sauce } from "../schemas/sauce.schema";
import connect from "../lib/mongoose";
import { InferGetServerSidePropsType } from "next";
import React, { useCallback, useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import isMobile from "../utilities/isMobile";

export async function getServerSideProps(
  context: any
): Promise<{ props: { kebabs: IKebab[]; sauces: ISauce[] } }> {
  await connect();
  const kebabs: IKebab[] = await Kebab.find({});
  const sauces: ISauce[] = await Sauce.find({});

  return {
    props: {
      kebabs: JSON.parse(JSON.stringify(kebabs)),
      sauces: JSON.parse(JSON.stringify(sauces)),
    },
  };
}

export default function Cart(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const {
    cartItems,
    kebabs,
    sauces,
    increaseCartQuantity,
    decreaseCartQuantity,
    onSendCarts,
    setKebabs,
    setSauces,
    cartQuantity,
    removeFromCart,
  } = UseShoppingCart();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const currKebab = (id: string) => kebabs.find((i) => i._id === id);
  if (currKebab == null) return null;

  const currSauce = (_id: string) => sauces.find((i) => i._id === _id);
  if (currSauce == null) return null;

  useEffect(() => {
    setKebabs(props.kebabs);
    setSauces(props.sauces);
    console.log(props);
  }, [props]);

  const mob = isMobile(414);

  const totalPrice = cartItems.reduce((total, cartItem) => {
    const currKebab = kebabs.find((i) => i._id === cartItem._id);
    return total + (currKebab?.price || 0) * cartItem.quantity;
  }, 0);

  return (
    <Stack className="pt-2 pb-4">
      <div className="container">
        <div className="row w-100">
          <div className="col-lg-12 col-md-12 col-12">
            <h3
              className="display-5 mb-2 text-center"
              style={{ marginTop: "2rem" }}
            >
              Prekių krepšelis
            </h3>
            <Row className="mb-5 text-center">
              <Placeholder
                as="p"
                animation="wave"
                className=""
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
            </Row>

            {cartItems?.map((item, key) => {
              const kbIt = currKebab(item._id);
              return (
                <table key={key} id="shoppingCart" className="table  ">
                  <thead>
                    <tr>
                      <th>
                        <h5 style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                          Užsakymas: "{kbIt ? kbIt._id : ""}"
                        </h5>
                      </th>
                      <th>
                        <h5
                          style={{
                            marginRight: "30px",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                          }}
                        >
                          Kaina
                        </h5>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-th="Product">
                        <div className="row">
                          <div className="col-md-3 text-left">
                            <Image
                              src={kbIt ? kbIt.picture : ""}
                              width={mob ? "200px" : "260px"}
                              height={mob ? "200px" : "260px"}
                              alt=""
                              className="img-fluid  d-md-block rounded mb-2 shadow "
                            />
                          </div>

                          <div className="col-md-9 text-left mt-sm-2">
                            <h4>
                              {kbIt ? kbIt.title : ""}
                              {item.quantity > 1 && (
                                <span
                                  className="py-2"
                                  style={{ fontSize: ".90rem" }}
                                >
                                  x{item.quantity}
                                </span>
                              )}
                              <span
                                style={{
                                  marginLeft: "10px",
                                  verticalAlign: "top",
                                }}
                              >
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  className=""
                                  onClick={() => removeFromCart(item._id)}
                                >
                                  &times;
                                </Button>
                              </span>
                            </h4>
                            <p className="font-weight-light">
                              {kbIt ? kbIt.description : ""}
                            </p>
                            <p className="my-3" style={{ fontWeight: "bold" }}>
                              Padažas:
                            </p>

                            {item.sauce_id?.map((sauce, key) => {
                              const scIt = currSauce(sauce);
                              return (
                                <div key={key} className="">
                                  <Image
                                    height="50px"
                                    width="50px"
                                    src={scIt ? scIt.sauce_picture : ""}
                                  />
                                  {scIt ? scIt.title : ""}
                                </div>
                              );
                            })}

                            <div
                              className="d-flex align-items-start flex-column my-3 "
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
                                  <span className="fs-3 me-3">
                                    {item.quantity}
                                  </span>
                                  vienetai
                                </div>
                                <Button
                                  variant="primary"
                                  onClick={() =>
                                    increaseCartQuantity(
                                      item._id,
                                      item.sauce_id
                                    )
                                  }
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td data-th="Price" className="">
                        <h5 style={{ marginTop: "12px" }}>
                          {formatCurrency(
                            kbIt ? kbIt.price * item.quantity : 0
                          )}{" "}
                        </h5>
                      </td>
                      <td data-th="Quantity"></td>
                    </tr>
                  </tbody>
                </table>
              );
            })}
            <div className="float-right text-right">
              <h5> Iš viso: </h5>
              <h1>{formatCurrency(totalPrice)}</h1>
            </div>
          </div>
        </div>
        <div className="row mt-4 d-flex align-items-center">
          <div className="col-sm-6 order-md-2 text-right">
            <Button
              onClick={() => {
                onSendCarts(), handleShow();
              }}
              variant="danger"
            >
              Apmokėti
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Apmokėjimas įvykdytas!</Modal.Title>
              </Modal.Header>
              <Modal.Body>Sėkmingai apmokėjote pirkinį(-ius)</Modal.Body>
              <Modal.Footer>
                <Button variant="danger" href="/">
                  Grįžti į titulinį
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
            <a href="/" className="fas fa-arrow-left mr-2">
              {" "}
              Tęsti apsipirkimą
            </a>
          </div>
        </div>
      </div>
    </Stack>
  );
}
