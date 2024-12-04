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
import Offers from "./components/Offers";

function App() {
  // cart options
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      if (!prevCart.some((item) => item.id === product.id)) {
        return [...prevCart, product];
      }
      return prevCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Search items
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Header />
      <Navbar
        cart={cart}
        setCart={setCart}
        onSearch={(searchText) => setSearchQuery(searchText)}
      />
      {isCartOpen && <CartPage cart={cart} />}
      {/* drop list and links */}
      <AllDepartments />
      {/* slider images */}
      <HeroSection />
      <Items />
      {/* special offers */}
      <FeaturedProducts
        cart={cart}
        setCart={setCart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
      {/* products page */}
      <Offers
        cart={cart}
        setCart={setCart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
      {/* bestseller */}
      <Categories
        cart={cart}
        setCart={setCart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
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
