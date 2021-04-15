import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner, Table, Button, Alert } from "react-bootstrap";
import { useRouter } from "../../hooks";
import { formatNumber } from "../../utils";
import "./style.css";

const ManagementOrder = () => {
  const router = useRouter();
  const [orderList, setOrderList] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [shouldRefreshOrderList, setShouldRefreshOrderList] = useState(0);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_LARAVEL}/getOrderList`)
      .then((res) => {
        if (res.data.success) {
          setOrderList(res.data.orderList);
        }
      });
  }, [shouldRefreshOrderList]);

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
    <div className="management-order-wrapper container mt-4">
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
          {orderList.length !== 0 ? (
            orderList.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`${process.env.REACT_APP_URL_IMAGE}${item.products[0].image}`}
                    alt={`${process.env.REACT_APP_URL_IMAGE}${item.products[0].image}`}
                    width={100}
                    height={100}
                  />
                </td>
                <td>{item.shipAddress}</td>
                <td>{formatNumber(item.total)}</td>
                <td>
                  {["PENDING", "DELIVERING"].includes(item.status) && (
                    <Spinner size="sm" animation="border" variant="warning" />
                  )}
                  {item.status}
                </td>
                <td>
                  <Button
                    onClick={() =>
                      router.push({
                        pathname: "/edit-order",
                        state: {
                          ...item,
                        },
                      })
                    }
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => deleteOrder(item.id)}>
                    Remove
                  </Button>
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

export default ManagementOrder;
