import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const placeOrderHandler = () => {
    alert("Order placed successfully!");
    navigate("/");
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Checkout</h1>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          Your cart is empty. <Link to="/">Go Back</Link>
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Order Summary */}
          <div style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
          }}>
            <h2 style={{ marginBottom: "1rem" }}>Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.product} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                padding: "0.5rem 0"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <img src={item.image} alt={item.name} style={{ width: "80px", borderRadius: "4px" }}/>
                  <span>{item.name}</span>
                </div>
                <span>{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Total & Place Order */}
          <div style={{
            textAlign: "right",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#f5f5f5"
          }}>
            <h2>Total ({totalItems} items): ${totalPrice}</h2>
            <button
              onClick={placeOrderHandler}
              style={{
                background: "#1890ff",
                color: "#fff",
                border: "none",
                padding: "0.7rem 1.5rem",
                borderRadius: "4px",
                marginTop: "1rem",
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutScreen;
