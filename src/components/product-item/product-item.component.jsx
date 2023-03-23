import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "./product-item.styles.scss";

const ProductItem = ({ product }) => {
  const { gallery, name, id } = product;

  const [productImage, setProductImage] = useState(null);  

  useEffect(() => {
    if (gallery) {
      setProductImage(gallery[0]);
    }
  }, [gallery]);

  return (
    <Link to={`/product/${id}`}>
      <div className="product-container">        
        <img className="background-image" src={productImage}></img>
        <div className="product-body-container">
          <h2>
            {name}
          </h2>
          <p>$50.00</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
