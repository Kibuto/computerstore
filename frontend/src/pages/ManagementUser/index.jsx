import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap";

const ManagementUser = () => {
  const [shouldRefreshProductList, setShouldRefreshProductList] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_LARAVEL}/getUserList`)
      .then((res) => {
        setUserList(res.data.userList);
      })
      .catch((err) => console.error(err));
  }, [shouldRefreshProductList]);

  const deleteUser = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL_LARAVEL}/deleteUserById/${id}`)
      .then((res) => {
        if (res.data.success) {
          setShowMessage(true);
          setShouldRefreshProductList(new Date().getTime());
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
          Delete user successfully
        </Alert>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
            <th>Registration Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
                <td>{user.created_at}</td>
                <td>
                  <Button onClick={() => deleteUser(user.id)}>Remove</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManagementUser;
