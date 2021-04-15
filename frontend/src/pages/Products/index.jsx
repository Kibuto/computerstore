import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EllipsisContent from "../../components/EllipsisContent";
import "./style.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_LARAVEL}/productList`)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="products-wrapper container mt-4">
      <div className="product-wrapper-inner row row-cols-1 row-cols-md-3 g-4">
        {products &&
          products.map((computer, index) => (
            <div className="col mb-4" key={index}>
              <div className="card h-100 computer-item">
                <img
                  src={`${process.env.REACT_APP_URL_IMAGE}${computer.image}`}
                  className="card-img-top"
                  alt={computer.image}
                />
                <div className="card-body">
                  <h5 className="card-title">{computer.name}</h5>
                  <EllipsisContent classname="card-text">
                    {computer.description}
                  </EllipsisContent>
                  <Link
                    to={`/product/${computer.id}`}
                    className="btn btn-primary"
                  >
                    Go to detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
