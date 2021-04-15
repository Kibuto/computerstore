import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useAuth } from "../../hooks";
import "./style.css";

const Profile = () => {
  const { token, setToken } = useAuth();
  const [showMessage, setShowMessage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(false);
  const [triggerGetUser, setTriggerGetUser] = useState(0);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_LARAVEL}/getUserById/${token.id}`)
      .then((res) => {
        const { name, address, email, image } = res.data.user;
        setName(name);
        setAddress(address);
        setEmail(email);
        setImage(image);
      })
      .catch((err) => console.error(err));
  }, [token.id, triggerGetUser]);

  const updateUser = () => {
    const formData = new FormData();
    formData.append("id", token.id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("image", image);

    axios
      .post(`${process.env.REACT_APP_API_URL_LARAVEL}/updateUser`, formData)
      .then((res) => {
        if (res.data.success) {
          setToken(res.data.user);
          setShowMessage(true);
          setTriggerGetUser(new Date().getTime());
        }
      });
  };

  return (
    <div className="profile-wrapper container">
      {showMessage && (
        <Alert variant="success" onClose={() => setShowMessage(false)}>
          Update successfully
        </Alert>
      )}
      <div class="text-center">
        <img
          src={
            ["string"].includes(typeof image)
              ? `${process.env.REACT_APP_URL_IMAGE}${image}`
              : "https://i.picsum.photos/id/971/200/200.jpg?hmac=xcJY-VNIH_UD01lMlLi4mADmQrLTgoEE2_NYEhL3VQA"
          }
          class="rounded"
          alt="nothing"
          width="200"
          height="200"
        />
      </div>
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
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type product email here..."
          />
        </Form.Group>
        <Form.Group controlId="formGroupAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Type address price here..."
          />
        </Form.Group>
        <Form.Group controlId="formGroupFile">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            placeholder="Choose Image here..."
          />
        </Form.Group>
        <Button variant="primary" onClick={updateUser}>
          Edit
        </Button>
      </Form>
    </div>
  );
};

export default Profile;
