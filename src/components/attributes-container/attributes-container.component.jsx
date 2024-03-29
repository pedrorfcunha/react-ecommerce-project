import ReactHtmlParser from "react-html-parser";
import { useState, useEffect, useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import { CurrencySwitcherContext } from "../../contexts/currency-switcher.context";

import AttributeItem from "../attribute-item/attribute-item.component";
import Button from "../../components/button/button.component";

import "./attributes-container.styles.scss";

const AttributesContainer = ({ product }) => {
  const { attributes, brand, description, name, prices } = product;
  const { addItemToCart } = useContext(CartContext);

  const [selectedAttributes, setSelectedAttributes] = useState();

  const handleAttributeSelection = (attributeId, selectedValue) => {
    const attributeSelection = (selectedAttributes) => ({
      ...selectedAttributes,
      [attributeId]: selectedValue,
    });
    setSelectedAttributes(attributeSelection);
  };

  const addProductToCart = () => {
    const selectedProduct = { ...product, selectedAttributes };
    addItemToCart(selectedProduct);
  };

  const { currencySymbol, checkCurrency } = useContext(CurrencySwitcherContext);

  const [convertedPrice, setConvertedPrice] = useState();

  useEffect(() => {
    if (prices) {
      const filteredPrice = checkCurrency(prices);
      const formattedNumber = filteredPrice[0].amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setConvertedPrice(formattedNumber);
    }
  }, [currencySymbol, prices]);

  return (
    <div className="attributes-container">
      <h2 className="product-brand">{brand}</h2>
      <h3 className="product-name">{name}</h3>
      <div className="attribute-items">
        {attributes?.map((attribute) => (
          <AttributeItem
            key={attribute.id}
            attribute={attribute}
            onSelect={handleAttributeSelection}
          />
        ))}
      </div>
      <div>
        <p className="price-title">PRICE:</p>
        <p className="price-value">
          {currencySymbol} {convertedPrice}
        </p>
      </div>
      <Button onClick={addProductToCart}>ADD TO CART</Button>
      <div className="product-description">{ReactHtmlParser(description)}</div>
    </div>
  );
};

export default AttributesContainer;
