import { InferGetServerSidePropsType } from "next";
import connect from "../lib/mongoose";
import { IOrder, Order } from "../schemas/order.schema";
import { ISauce, Sauce } from "../schemas/sauce.schema";
import { IKebab, Kebab } from "../schemas/kebab.schema";
import React, { useState, useEffect } from "react";
import { Statuses } from "../data/statuses.enum";
import { ToggleButtonGroup, Stack } from "react-bootstrap";
import { useSession } from "next-auth/react";
import { Image, Row, Table } from "react-bootstrap";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import fetchOrders from "../utilities/fetchOrders";
import AdminBreadcrumb from "../components/admin/AdminBreadcrumb";
import OrderCard from "../components/admin/OrderCard";

export async function getServerSideProps(
  context: any
): Promise<{
  props: { kebabs: IKebab[]; sauces: ISauce[]; orders: IOrder[] };
}> {
  return fetchOrders();
}

type IStatus = Map<string, keyof typeof Statuses>;

export default function Admin(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { setKebabs, setSauces } = UseShoppingCart();
  const [status, setStatus] = useState<IStatus>(new Map());
  const { data: session } = useSession();

  const currSauce = (_id: string) => props.sauces.find((i) => i._id === _id);
  if (currSauce == null) return null;

  useEffect(() => {
    setSauces(props.sauces);
    setKebabs(props.kebabs);
  }, [props]);

  if (session && session.user.role === "admin") {
    return (
      <Stack style={{ boxSizing: "border-box" }}>
        <AdminBreadcrumb />
        <Row>
          <OrderCard />
          <div className="py-5">
            <Table hover size="sm" responsive>
              <thead>
                <tr>
                  <th className="text-center">Užsakovas:</th>
                  <th className="text-center">Kebabas:</th>
                  <th className="text-center">Padažas:</th>
                  <th className="text-center">Kiekis:</th>
                  <th className="text-center">Būsena:</th>
                  <th className="text-center">Veiksmai:</th>
                </tr>
              </thead>
              <tbody>
                {props.orders.map((o, i) => (
                  <tr key={i}>
                    <td className="text-center">{o.user_id}</td>
                    <td className="text-center">{o.title}</td>
                    <td className="text-center">
                      {o.sauces?.map((sc) => {
                        const scIt = currSauce(sc);
                        return (
                          <Image
                            height="50px"
                            width="50px"
                            src={scIt ? scIt.sauce_picture : ""}
                          />
                        );
                      })}
                    </td>
                    <td className="text-center">{o.pieces}</td>

                    <td className="text-center">{o.status}</td>

                    <td className="text-center">Palikta baigiamajam darbui</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Row>
      </Stack>
    );
  } else {
    return (
      <div>
        <h1>Tik administratoriams</h1>
      </div>
    );
  }
}
