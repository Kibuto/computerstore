import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import { useRouter } from "../../hooks";

const ManagementCategory = () => {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [shouldRefreshProductList, setShouldRefreshProductList] = useState(0);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_LARAVEL}/categoryList`)
      .then((res) => {
        if (res.data.success) {
          setShowMessage(res.data.message);
          setCategoryList(res.data.categories);
        }
      });
  }, [shouldRefreshProductList]);

  const deleteCategory = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL_LARAVEL}/deleteCategory/${id}`)
      .then((res) => {
        if (res.data.success) {
          setShowMessage(res.data.message);
          setShouldRefreshProductList(new Date().getTime());
        }
      })
      .catch((err) => console.error(err));
  };

  const redirectToEditPage = (category) => {
    router.push({
      pathname: "/create-category",
      state: {
        ...category,
      },
    });
  };

  return (
    <div className="management-category-wrapper container mt-4">
      {showMessage && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setShowMessage(false)}
        >
          Delete order successfully
        </Alert>
      )}
      <Button variant="primary" onClick={() => router.push("/create-category")}>
        Add New
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th colSpan="3">description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categoryList &&
            categoryList.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td colSpan="3">{item.description}</td>
                <td>
                  <Button onClick={() => deleteCategory(item.id)}>
                    Remove
                  </Button>
                  <Button onClick={() => redirectToEditPage(item)}>Edit</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManagementCategory;
