import React from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";
import AllDepartments from "./components/AllDepartments";
import Items from "./components/Items";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <AllDepartments />
      <HeroSection />
      <Items />
      <FeaturedProducts />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
