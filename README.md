# TechShop :- E-commerce Project

## Project Overview
TechShop is a full-stack **MERN (MongoDB, Express, React, Node.js)** E-commerce web application.  
It allows users to browse products, add them to a cart, and simulate checkout. The backend is powered by **Node.js + Express + MongoDB**, while the frontend uses **React and Redux** for state management.

## Features
- Browse products with images, descriptions, and prices
- Add products to the cart and update quantities
- Simulated checkout with total items and price calculation
- Responsive UI with clean layout and aesthetic design
- Backend API secured with environment variables
- Redux state management for frontend
- MongoDB Atlas as the database

## Tech Stack
**Frontend:**
- React 19
- Redux / Redux Toolkit
- React Router DOM
- CSS for styling

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS middleware

## Installation 💻

### 1. Clone the repository
Run the following commands in your terminal:

`git clone https://github.com/<your-username>/Ecommerce.git`  
`cd Ecommerce`

### 2. Backend Setup

Go to the backend folder and install dependencies:

`cd backend`  
`npm install`

Create a `.env` file in the `backend/` folder with:

PORT=5000

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mernEcommerce?retryWrites=true&w=majority

Start backend server:

`npm run dev`

### 3. Frontend Setup

cd ../frontend

npm install

npm start

Frontend runs on: http://localhost:3000

## Folder Structure 📂
ecommerce/
│
├── backend/          # Node.js + Express backend
│   ├── routes/
│   ├── models/
│   ├── controllers/
│
├── frontend/         # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md

## Future Improvements 🌟
- User authentication and authorization
- Payment gateway integration
- Product search and filtering
- Admin dashboard for managing products

## Author
Adarsh Agrahari.
