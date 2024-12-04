import React, { useEffect, useState } from "react";
import data from "../json/data.json";
import { BsCartPlus } from "react-icons/bs";

const Offers = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Load products and extract categories
    setProducts(data.products);

    const uniqueCategories = [
      ...new Set(data.products.map((product) => product.category)),
    ];
    setCategories(uniqueCategories);
    setFilteredProducts(data.products); // Default to all products
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to the first page when the category changes
    setDropdownOpen(false);

    if (category) {
      setFilteredProducts(
        products.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        )
      );
    } else {
      setFilteredProducts(products);
    }
  };

  const truncateTitle = (title) => {
    const words = title.split(" ");
    return words.length > 10 ? `${words.slice(0, 10).join(" ")}...` : title;
  };

  const isInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  const toggleCart = (product) => {
    if (isInCart(product)) {
      setCart((prevCart) =>
        prevCart.filter((cartItem) => cartItem.id !== product.id)
      );
    } else {
      setCart((prevCart) => [...prevCart, product]);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mx-auto px-4 lg:px-20 py-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-white border border-gray-300 rounded-md py-2 px-4 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 flex justify-between items-center cursor-pointer"
          >
            {activeCategory || "Select a Category"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <ul className="absolute mt-1 max-h-60 w-48 overflow-y-auto bg-white border border-gray-300 shadow-lg rounded-md z-10 py-1">
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-yellow-100 hover:text-yellow-600 cursor-pointer"
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentItems.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col"
          >
            <h3 className="text-sm font-medium text-gray-600 mb-2 text-start">
              {product.category}
            </h3>
            <h2 className="text-lg font-bold text-gray-800 mb-4 text-start">
              {truncateTitle(product.title)}
            </h2>
            <img
              src={product.img1}
              alt={product.title}
              className="w-40 h-45 object-cover rounded-lg mb-4"
            />
            <div className="flex justify-between items-center mt-auto">
              <p className="text-green-500 font-bold text-lg">
                <span className="text-gray-800">Price: </span>${product.price}
              </p>
              <button
                className={`font-bold text-lg ${
                  isInCart(product) ? "text-white bg-yellow-500 p-2 rounded-full" : "text-gray-500"
                } transition`}
                onClick={() => toggleCart(product)}
              >
                <BsCartPlus size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-2 h-2 rounded-full ${
                currentPage === index + 1
                  ? "bg-yellow-500 w-7 h-2"
                  : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Offers;
