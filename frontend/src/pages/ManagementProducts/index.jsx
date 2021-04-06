import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import { useRouter } from "../../hooks";

const ManagementProducts = () => {
  const router = useRouter();
  const [shouldRefreshProductList, setShouldRefreshProductList] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [productList, setProductList] = useState([]);

  const categoryMapping = {
    1: "ASUS",
    2: "ACER",
    3: "MSI",
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_LARAVEL}/productList`)
      .then((res) => {
        setProductList(res.data.products);
      })
      .catch((err) => console.error(err));
  }, [shouldRefreshProductList]);

  const deleteProduct = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL_LARAVEL}/deleteProduct/${id}`)
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
          Delete product successfully
        </Alert>
      )}
      <Button variant="primary" onClick={() => router.push("/create-product")}>
        Add New
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productList &&
            productList.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    src={`${process.env.REACT_APP_URL_IMAGE}${item.image}`}
                    alt={item.image}
                    width="100"
                    height="100"
                  />
                </td>
                <td>{item.price}</td>
                <td>{categoryMapping[item.category_id]}</td>
                <td>
                  <Button onClick={() => deleteProduct(item.id)}>Remove</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManagementProducts;
