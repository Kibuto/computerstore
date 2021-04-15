import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useRouter } from "../../hooks";
import "./style.css";

const CreateCategory = () => {
  const router = useRouter();
  const { state = {} } = router.location || {};
  const [name, setName] = useState(state.name || "");
  const [showMessage, setShowMessage] = useState(false);
  const [description, setDescription] = useState(state.description || "");

  const addCategory = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    axios
      .post(`${process.env.REACT_APP_API_URL_LARAVEL}/addCategory`, formData)
      .then((res) => {
        setShowMessage(res.data.message);
        router.push("/management-category");
      });
  };

  const editCategory = () => {
    const formData = new FormData();
    formData.append("id", state.id);
    formData.append("name", name);
    formData.append("description", description);

    axios
      .post(`${process.env.REACT_APP_API_URL_LARAVEL}/editCategory`, formData)
      .then((res) => {
        if (res.data.success) {
          setShowMessage(true);
          router.push("/management-category");
        }
      });
  };

  return (
    <div className="container create-category-wrapper">
      {showMessage && (
        <Alert variant="success" onClose={() => setShowMessage(false)}>
          {showMessage}
        </Alert>
      )}
      <Form>
        <Form.Group controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type product name here..."
          />
        </Form.Group>
        <Form.Group controlId="formGroupDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type product description here..."
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={state.id ? editCategory : addCategory}
        >
          {state.id ? "Edit" : "Add"}
        </Button>
      </Form>
    </div>
  );
};

export default CreateCategory;
