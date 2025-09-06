import { CART_ADD_ITEM } from "../constants/cartConstants";
import axios from "axios";

// Add product to cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  // Save cart to localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
