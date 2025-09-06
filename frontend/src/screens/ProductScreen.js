import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../actions/cartActions";

const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    dispatch(addToCart(id, qty));
    navigate("/cart");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ width: "300px" }} />
      <h2>${product.price}</h2>
      <p>{product.description}</p>

      {product.countInStock > 0 && (
        <>
          <label>
            Qty:{" "}
            <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </label>
          <button onClick={addToCartHandler} style={{ marginLeft: "1rem" }}>
            Add to Cart
          </button>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
