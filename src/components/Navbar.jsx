import React, { useState, useEffect } from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { AiOutlineRetweet } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";

const Navbar = ({ cart, onSearch }) => {
  const categories = [
    "All Categories",
    "Laptops",
    "Smartphones",
    "Furniture",
    "Skincare",
  ];
  const [searchText, setSearchText] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [cartPositionFixed, setCartPositionFixed] = useState(false); 

  const handleSearch = () => {
    onSearch(searchText);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setCartPositionFixed(true); 
      } else {
        setCartPositionFixed(false); 
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      {/* Navbar Content */}
      <div className="navbar container flex items-center justify-between mt-6">
        <h1 className="text-3xl font-bold opacity-60">Electro</h1>

        {/* Search Bar Section */}
        <div className="search-bar flex items-center rounded-full overflow-hidden w-full max-w-lg bg-white">
          <input
            type="text"
            placeholder="Search for Products"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 pl-5 text-md text-gray-900 border-r border-gray-300"
          />
          <select className="text-md text-gray-900 bg-transparent cursor-pointer">
            {categories.map((category, index) => (
              <option key={index}>{category}</option>
            ))}
          </select>
          <button
            className="bg-[#f5a623] text-white p-4 hover:bg-[#e89c1a]"
            onClick={handleSearch}
          >
            <CiSearch size={20} />
          </button>
        </div>

        {/* Icons Section */}
        <div className="icons flex items-center gap-3">
          <AiOutlineRetweet size={35} className="text-gray-500" />
          <CiHeart size={35} className="text-gray-500" />
          <div
            className={`${
              cartPositionFixed
                ? "fixed bottom-20 right-2 bg-yellow-500 text-white p-4 rounded-full shadow-lg transition-all duration-300"
                : "relative bg-transparent transition-all duration-300"
            } flex items-center cursor-pointer`}
            onClick={() => setShowPrompt(!showPrompt)}
          >
            <IoBagCheckOutline
              size={35}
              className={`${
                cartPositionFixed ? "text-white" : "text-gray-500"
              } hover:text-yellow-300 transition-colors`}
            />
            {cart.length > 0 && (
              <span className="absolute top-[-5px] right-[-5px] bg-amber-600 text-white text-sm rounded-full px-2 py-0.5 text-center">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Prompt for Cart */}
      {showPrompt && (
        <div className="fixed top-20 right-8 bg-white shadow-lg rounded-lg p-6 w-72 z-50">
          <h2 className="text-lg font-bold mb-4">Your Cart</h2>
          {cart.length > 0 ? (
            <ul className="space-y-2">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <p className="text-gray-700">{item.title}</p>
                  <p className="text-green-500">${item.price}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
          <button
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600"
            onClick={() => setShowPrompt(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
