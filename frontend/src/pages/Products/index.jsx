import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EllipsisContent from "../../components/EllipsisContent";

const Products = () => {
  const [products, setProducts] = useState([]);
  console.log(products);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products.php`)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="products-wrapper container">
      <div className="product-wrapper-inner row row-cols-1 row-cols-md-3 g-4">
        {products &&
          products.map((computer, index) => (
            <div className="col" key={index}>
              <div className="card computer-item">
                <img
                  src={computer.image}
                  className="card-img-top"
                  alt={computer.image}
                />
                <div className="card-body">
                  <h5 className="card-title">{computer.name}</h5>
                  <EllipsisContent classname="card-text">
                    {computer.description}
                  </EllipsisContent>
                  <Link
                    to={`/product/${computer.productId}`}
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
