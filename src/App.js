import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";
import AllDepartments from "./components/AllDepartments";
import Items from "./components/Items";
import Dashboard from "./components/Dashboard";
import CartPage from "./components/CartPage";

function App() {
  // cart options
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <div>
      <Header />
      <Navbar cart={cart} toggleCart={toggleCart} />
      {isCartOpen && <CartPage cart={cart} />}
      <AllDepartments />
      <HeroSection />
      <Items />
      <FeaturedProducts addToCart={addToCart} />
      <Footer />
    </div>
  );
}

export default App;
