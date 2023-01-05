import { ISauce } from "../../schemas/sauce.schema";
import React from "react";
import { IOrder } from "../../schemas/order.schema";
import { Image, Table } from "react-bootstrap";

type Props = {
  o: IOrder;
  i: number;
  currSauce: (_id: string) => ISauce;
};

export default function OrderTable({ o, i, currSauce }: Props) {
  return (
    <div key={i} className="card-body">
      <h5 style={{ fontSize: "18px", marginBottom: "2rem" }}>
        Užsakymas: {o._id}{" "}
      </h5>
      <Table hover size="sm" variant="dark" className="profileTable" responsive>
        <thead>
          <tr>
            <th className="text-center">Būsena:</th>
            <th className="text-center">Kebabas:</th>
            <th className="text-center">Padažas(-ai):</th>
            <th className="text-center">Kiekis:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">{o.status}</td>
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
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
