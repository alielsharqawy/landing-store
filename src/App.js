import React, { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";
import AllDepartments from "./components/AllDepartments";
import Items from "./components/Items";
import CartPage from "./components/CartPage";
import Categories from "./components/Categories";
import Dashboard from "./components/Dashboard";
import Companies from "./components/Companies";
import RecentlyViewed from "./components/RecentlyViewed";
import Landing from "./components/Landing";
import Bestsellers from "./components/Bestsellers";

function App() {
  // cart options
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      if (!prevCart.some((item) => item.id === product.id)) {
        return [...prevCart, product];
      }
      return prevCart;
    });
  };
  // remove items from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // search items
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Header />
      <Navbar cart={cart} toggleCart={toggleCart} onSearch={setSearchQuery} />
      {isCartOpen && <CartPage cart={cart} />}
      <AllDepartments />
      <HeroSection />
      <Items />
      <FeaturedProducts
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        cart={cart}
        searchQuery={searchQuery}
      />
      <Categories />
      <Bestsellers
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        cart={cart}
      />
      <Landing />
      <RecentlyViewed
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
      <Companies />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
