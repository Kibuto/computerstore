import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Spinner, Table } from "react-bootstrap";
import { useAuth } from "../../hooks";
import "./style.css";

const OrderHistory = () => {
  const { token } = useAuth();
  const [orderInfo, setOrderInfo] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [shouldRefreshProductList, setShouldRefreshOrderList] = useState(0);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_LARAVEL}/getOrder/${token.id}`)
      .then((res) => {
        if (res.data.success) {
          setOrderInfo(res.data.orderInfo);
        }
      });
  }, [token, shouldRefreshProductList]);

  const deleteOrder = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL_LARAVEL}/deleteOrderById/${id}`)
      .then((res) => {
        if (res.data.success) {
          setShowMessage(true);
          setShouldRefreshOrderList(new Date().getTime());
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="order-history-wrapper container mt-4">
      {showMessage && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setShowMessage(false)}
        >
          Delete order successfully
        </Alert>
      )}
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
          {orderInfo.length !== 0 ? (
            orderInfo.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`${process.env.REACT_APP_URL_IMAGE}${item.products[0].image}`}
                    alt={item.products[0].image}
                    width="100"
                    height="100"
                  />
                </td>
                <td>{item.shipAddress}</td>
                <td>{item.total}</td>
                <td>
                  <Spinner size="sm" animation="border" variant="warning" />
                  {item.status}
                </td>
                <td>
                  {item.status === "PENDING" && (
                    <Button
                      variant="danger"
                      onClick={() => deleteOrder(item.id)}
                    >
                      Remove
                    </Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Empty Order
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderHistory;
