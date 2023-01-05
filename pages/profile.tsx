import { Button, Image, Stack, Breadcrumb } from "react-bootstrap";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import { IKebab } from "../schemas/kebab.schema";
import { ISauce } from "../schemas/sauce.schema";
import { IOrder } from "../schemas/order.schema";
import { InferGetServerSidePropsType } from "next";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import fetchOrders from "../utilities/fetchOrders";
import OrderTable from "../components/order/OrderTable";
import ProfileBreadcrumb from "../components/profile/ProfileBreadcrumb";

export async function getServerSideProps(
  context: any
): Promise<{
  props: { kebabs: IKebab[]; sauces: ISauce[]; orders: IOrder[] };
}> {
  return fetchOrders();
}

export default function Profile(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { setKebabs, setSauces } = UseShoppingCart();
  const { data: session, status } = useSession();

  const currSauce = (_id: string) => props.sauces.find((i) => i._id === _id);
  if (currSauce == null) return null;

  useEffect(() => {
    setSauces(props.sauces);
    setKebabs(props.kebabs);
  }, [props]);

  return (
    <Stack style={{ backgroundColor: "#eee;" }}>
      <ProfileBreadcrumb />
      <div>
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              {session && (
                <div className="card-body text-center">
                  <Image
                    src={session.user.profile_picture}
                    alt="avatar"
                    className="img-fluid rounded"
                    style={{ width: "150px;" }}
                  />
                  <h5 className="my-3">{session.user.name}</h5>
                  <p className="text-muted mb-1">{session.user.email}</p>

                  <div className="d-flex justify-content-center mb-2">
                    <Button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => signOut()}
                    >
                      Atsijungti
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              {session && (
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Vartotojo vardas</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{session.user.name}</p>
                    </div>
                  </div>
                  <div className="row my-1">
                    <div className="col-sm-3">
                      <p className="mb-0">El. paštas</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{session.user.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {session && (
              <div className="row">
                <div className="col-md-12">
                  <div className="card mb-4 mb-md-0">
                    {props.orders.map((o, i) => {
                      return (
                        <OrderTable
                          key={`order${i}`}
                          o={o}
                          i={i}
                          currSauce={currSauce}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Stack>
  );
}
