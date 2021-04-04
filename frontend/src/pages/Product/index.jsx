import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter, useCart } from "../../hooks";

const Product = () => {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { addToCart } = useCart();
  const { id } = router.query || {};

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_LARAVEL}/getProductById/${id}`)
      .then((res) => setProduct(res.data.product));
  }, [id]);

  return (
    <div className="container mt-3">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              // src={`http://localhost:8000/${product.image}`}
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
              <button
                onClick={() => addToCart(product)}
                className="btn btn-primary"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
