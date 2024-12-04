import React, { useState, useEffect } from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { AiOutlineRetweet } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";

const Navbar = ({ cart, setCart, onSearch }) => {
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

  // Calculate total price
  const totalPrice = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  const handleSearch = () => {
    onSearch(searchText);
  };

  const removeItem = (indexToRemove) => {
    setCart((prevCart) =>
      prevCart.filter((_, index) => index !== indexToRemove)
    );
  };

  const clearCart = () => {
    setCart([]);
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
      <div className="navbar flex flex-col sm:flex-row items-center justify-evenly gap-5 p-6">
        <h1 className="text-3xl font-bold text-gray-800">electro</h1>

        {/* Search Bar Section */}
        <div className="search-bar flex items-center w-full sm:w-3/4 lg:w-1/2 bg-white rounded-full overflow-hidden border-2 border-[#f5a623]">
          <input
            type="text"
            placeholder="Search for Products"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 pl-4 text-sm sm:text-lg text-gray-900 py-3 sm:py-2 border-none outline-none"
          />
          <select className="hidden sm:block text-sm sm:text-md text-gray-900 bg-transparent cursor-pointer">
            {categories.map((category, index) => (
              <option key={index}>{category}</option>
            ))}
          </select>
          <button
            className="bg-[#f5a623] text-white px-4 sm:px-6 py-3 sm:py-4 hover:bg-[#e89c1a]"
            onClick={handleSearch}
          >
            <CiSearch size={25} />
          </button>
        </div>

        {/* Icons Section */}
        <div className="flex gap-10 items-center">
          <AiOutlineRetweet
            size={30}
            className="text-gray-500 hover:text-yellow-500 transition-colors"
          />
          <CiHeart
            size={30}
            className="text-gray-500 hover:text-yellow-500 transition-colors"
          />
          <div
            className={`${
              cartPositionFixed
                ? "fixed bottom-20 right-6 bg-yellow-500 text-white p-4 rounded-full shadow-lg transition-all duration-300"
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
              <span className="absolute top-[-10px] right-[-2px] bg-amber-600 text-white text-xs sm:text-sm rounded-full px-2 py-0.5 text-center">
                {cart.length}
              </span>
            )}
          </div>
          {cart.length > 0 && (
            <p className="total text-green-500 font-medium text-xl">
              Total: ${totalPrice}
            </p>
          )}
        </div>
      </div>

      {/* Prompt for Cart */}
      {showPrompt && (
        <div className="fixed top-24 right-4 bg-white shadow-lg rounded-lg p-4 sm:p-6 w-64 sm:w-72 z-[100]">
          <h2 className="text-lg font-bold mb-4">Your Cart</h2>
          {cart.length > 0 ? (
            <div>
              <ul className="space-y-2">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <p className="text-gray-700 text-sm sm:text-md">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-4">
                      <p className="text-green-500 text-sm sm:text-md">
                        ${item.price}
                      </p>
                      <button
                        className="text-red-500 text-sm sm:text-md hover:underline"
                        onClick={() => removeItem(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 w-full"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          ) : (
            <p className="text-gray-500 text-sm sm:text-md">
              Your cart is empty.
            </p>
          )}
          <button
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 w-full"
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
