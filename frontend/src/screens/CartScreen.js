import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CART_ADD_ITEM } from "../constants/cartConstants";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch({
      type: CART_ADD_ITEM,
      payload: cartItems.filter((x) => x.product !== id),
    });
  };

  const updateQtyHandler = (id, qty) => {
    const item = cartItems.find((x) => x.product === id);
    dispatch({
      type: CART_ADD_ITEM,
      payload: { ...item, qty },
    });
  };

  const checkoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          Your cart is empty. <Link to="/">Go Back</Link>
        </p>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {cartItems.map((item) => (
              <div
                key={item.product}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "1rem",
                  background: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100px", borderRadius: "8px" }}
                />
                <div style={{ flex: 1, marginLeft: "1rem" }}>
                  <Link
                    to={`/product/${item.product}`}
                    style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}
                  >
                    {item.name}
                  </Link>
                </div>
                <p style={{ margin: "0 1rem", fontWeight: "bold", color: "#1890ff" }}>${item.price}</p>
                <select
                  value={item.qty}
                  onChange={(e) => updateQtyHandler(item.product, Number(e.target.value))}
                  style={{ padding: "0.3rem" }}
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
                <button
                  onClick={() => removeFromCartHandler(item.product)}
                  style={{
                    marginLeft: "1rem",
                    background: "#ff4d4f",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.5rem 0.7rem",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "2rem",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              background: "#f5f5f5",
              textAlign: "right",
            }}
          >
            <h2>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items): $
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </h2>
            <button
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
              style={{
                background: "#1890ff",
                color: "#fff",
                padding: "0.7rem 1.5rem",
                borderRadius: "4px",
                marginTop: "1rem",
              }}
            >
              Proceed To Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;
