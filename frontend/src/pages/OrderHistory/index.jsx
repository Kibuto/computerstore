import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks";

const OrderHistory = () => {
  const [orderInfo, setOrderInfo] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_LARAVEL}/getOrder/${user.id}`)
      .then((res) => {
        if (res.data.success) {
          setOrderInfo(res.data.orderInfo);
        }
      });
  }, [user]);

  return (
    <div className="order-history-wrapper container mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Address</th>
            <th>Total</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orderInfo &&
            orderInfo.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>
                  <img
                    src={item.products[0].image}
                    alt={item.products[0].image}
                  />
                </td>
                <td>{item.shipAddress}</td>
                <td>{item.total}</td>
                <td>
                  <Spinner size="sm" animation="border" variant="warning" />
                  {item.status}
                </td>
                <td>
                  <Link to="/">View</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderHistory;
