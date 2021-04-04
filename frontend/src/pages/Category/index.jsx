import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EllipsisContent from "../../components/EllipsisContent";
import { useRouter } from "../../hooks";

const Category = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { id } = router.query || {};

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL_LARAVEL}/getProductByCategoryId/${id}`
      )
      .then((res) => setProducts(res.data.products));
  }, [id]);

  return (
    <div className="container category-wrapper mt-3">
      <div className="product-wrapper-inner row row-cols-1 row-cols-md-3 g-4">
        {products &&
          products.map((computer, index) => (
            <div className="col mb-4" key={index}>
              <div className="card h-100 computer-item">
                <img
                  src={`http://localhost:8000/${computer.image}`}
                  className="card-img-top"
                  alt={computer.image}
                />
                <div className="card-body">
                  <h5 className="card-title">{computer.name}</h5>
                  <EllipsisContent className="card-text">
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

export default Category;
