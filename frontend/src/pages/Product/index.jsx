import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "../../hooks";

const Product = () => {
  const router = useRouter();
  const { id } = router.query || {};
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getProductById.php?id=${id}`)
      .then((res) => console.log(res));
  }, [id]);
  return <div>Product by {router.query.id}</div>;
};

export default Product;
