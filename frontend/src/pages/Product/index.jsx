import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "../../hooks";

const Product = () => {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { id } = router.query || {};

  const orderList = [
    { id: 1, name: "ASUS", description: "abc" },
    { id: 2, name: "ACER", description: "abc" },
  ];

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getProductById.php?id=${id}`)
      .then((res) => setProduct(res.data.product));
  }, [id]);

  const saveOrder = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/saveOrder.php`, orderList);
  };

  return (
    <div className="container mt-3">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={product.image}
              alt="images"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
              <button onClick={saveOrder} className="btn btn-primary">
                Save Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
