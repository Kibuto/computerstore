import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";

const CreateProduct = () => {
  const [categoryList, setCategoryList] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("1");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_LARAVEL}/categoryList`)
      .then((res) => {
        if (res.data.success) {
          setCategoryList(res.data.categories);
        }
      });
  }, []);

  const addProduct = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);

    axios
      .post(`${process.env.REACT_APP_API_URL_LARAVEL}/addProduct`, formData)
      .then((res) => {
        if (res.data.success) {
          setShowMessage(true);
        }
      });
  };

  return (
    <Container>
      {showMessage && (
        <Alert variant="success" onClose={() => setShowMessage(false)}>
          Create product successfully
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
        <Form.Group controlId="formGroupPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Type product price here..."
          />
        </Form.Group>
        <Form.Group controlId="formGroupCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryList &&
              categoryList.map((category, index) => (
                <option value={category.id} key={index}>
                  {category.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formGroupFile">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            placeholder="Choose product Image here..."
          />
        </Form.Group>
        <Button variant="primary" onClick={addProduct}>
          Add
        </Button>
      </Form>
    </Container>
  );
};

export default CreateProduct;
