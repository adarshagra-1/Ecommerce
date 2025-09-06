import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Link } from "react-router-dom";
import '../App.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [timer, setTimer] = useState(3600); // 1-hour deal

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const categories = [
    { name: "All", image: "/images/all.jpg" },
    { name: "Headphones", image: "/images/headphones.jpg" },
    { name: "Phones", image: "/images/phones.jpg" },
    { name: "Cameras", image: "/images/cameras.jpg" }
  ];

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section / Slider */}
      <div className="hero">
        <h1>TechShop</h1>
        <p>Discover the best gadgets & electronics at unbeatable prices!</p>
        <Link to="/"><button style={{ background: '#ffe066', color: '#333' }}>Shop Now</button></Link>
      </div>

      {/* Promotional Banner */}
      <div className="promo-banner">
        🚚 Free Shipping on orders over $50! Limited Time Offer!
      </div>

      {/* Categories */}
      <h2>Shop by Category</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        {categories.map(cat => (
          <div
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            style={{
              flex: "1",
              minWidth: "150px",
              padding: "1rem",
              background: selectedCategory === cat.name ? "#1890ff" : "#fff",
              color: selectedCategory === cat.name ? "#fff" : "#333",
              textAlign: "center",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "all 0.2s",
              backgroundImage: `url(${cat.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "#fff",
              fontWeight: "bold"
            }}
          >
            {cat.name}
          </div>
        ))}
      </div>

      {/* Deal-of-the-Day */}
      <div className="deal-day" style={{
        background: "#fff3f0",
        padding: "2rem",
        marginBottom: "2rem",
        borderRadius: "8px",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
      }}>
        <h2>Deal of the Day</h2>
        {featuredProducts[0] && (
          <>
            <h3>{featuredProducts[0].name}</h3>
            <p style={{ fontWeight: "bold", color: "#ff4d4f" }}>${featuredProducts[0].price}</p>
            <p>Ends in: {formatTime(timer)}</p>
            <Link to={`/product/${featuredProducts[0]._id}`}><button style={{ background: "#ff4d4f", color: "#fff" }}>Buy Now</button></Link>
          </>
        )}
      </div>

      {/* Latest Products */}
      <h2>{selectedCategory} Products</h2>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> :
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1.5rem"
        }}>
          {filteredProducts.map(product => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image || "https://via.placeholder.com/200"}
                  alt={product.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              </Link>
              <div style={{ padding: "1rem" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                  <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "#333" }}>
                    {product.name}
                  </Link>
                </h3>
                <p style={{ fontWeight: "bold", color: "#1890ff" }}>${product.price}</p>
                {product.isNew && <span style={{ color: "#52c41a", fontWeight: "bold" }}>New</span>}
                {product.isBestseller && <span style={{ color: "#faad14", fontWeight: "bold", marginLeft:"0.5rem" }}>Best Seller</span>}
                <Link to={`/product/${product._id}`}><button style={{ background: "#1890ff", color: "#fff", marginTop: '0.5rem' }}>View</button></Link>
              </div>
            </div>
          ))}
        </div>
      }

      {/* Newsletter */}
      <div className="newsletter">
        <h2>Subscribe to our Newsletter</h2>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </div>

      {/* Footer */}
      <footer>
        <p>© 2025 TechShop. All rights reserved.</p>
        <p>
          <Link to="/">Home</Link> | <Link to="/cart">Cart</Link> | Contact: info@techshop.com
        </p>
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
