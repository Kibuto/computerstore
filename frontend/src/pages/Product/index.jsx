import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter, useCart } from "../../hooks";
import { FacebookProvider, Comments } from "react-facebook";
import "./style.css";

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
    <div className="container product-wrapper mt-3">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`${process.env.REACT_APP_URL_IMAGE}${product.image}`}
              alt="images"
              width={300}
              height={250}
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
              <div>
                <div>Bình luận</div>
                <FacebookProvider appId="156941489649716">
                  <Comments href={`http://localhost:3000/product/${id}`} />
                </FacebookProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
