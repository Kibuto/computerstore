import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useRouter } from "../../hooks";
import "./style.css";

const EditOrder = () => {
  const router = useRouter();
  const { state = {} } = router.location || {};
  const [showMessage, setShowMessage] = useState(false);
  const [total, setTotal] = useState(state.total || "");
  const [address, setAddress] = useState(state.shipAddress || "");
  const [status, setStatus] = useState(state.status || "");
  const statusList = [
    { label: "PENDING", value: "PENDING" },
    { label: "DELIVERING", value: "DELIVERING" },
    { label: "DONE", value: "DONE" },
  ];

  const editProduct = () => {
    const formData = new FormData();
    formData.append("id", state.id);
    formData.append("total", total);
    formData.append("address", address);
    formData.append("status", status);

    axios
      .post(`${process.env.REACT_APP_API_URL_LARAVEL}/editOrder`, formData)
      .then((res) => {
        if (res.data.success) {
          setShowMessage(true);
          router.push("/management-order");
        }
      });
  };

  return (
    <div className="container edit-order-wrapper">
      {showMessage && (
        <Alert variant="success" onClose={() => setShowMessage(false)}>
          Update successfully
        </Alert>
      )}
      <Form>
        <Form.Group controlId="formGroupAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Type address here..."
          />
        </Form.Group>
        <Form.Group controlId="formGroupTotal">
          <Form.Label>Total</Form.Label>
          <Form.Control
            type="text"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            placeholder="Type total here..."
          />
        </Form.Group>
        <Form.Group controlId="formGroupStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusList.map((status, index) => (
              <option value={status.value} key={index}>
                {status.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={editProduct}>
          Edit
        </Button>
      </Form>
    </div>
  );
};

export default EditOrder;
