import React, { useState, useEffect } from "react";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { RiScales3Line } from "react-icons/ri";

const Bestsellers = ({ addToCart, removeFromCart, cart }) => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Top 20");
  const [categories, setCategories] = useState(["Top 20"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const itemsPerPage = 6; // Maximum 6 items per page

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();

      const uniqueCategories = [
        "Top 20",
        ...new Set(data.products.map((product) => product.category)),
      ];

      setProducts(data.products.slice(0, 20)); // Fetch Top 20 Products
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const isInCart = (productId) =>
    cart.some((product) => product.id === productId);

  const filteredProducts =
    activeCategory === "Top 20"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const paginatedProducts = filteredProducts.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="px-6 md:px-10 lg:px-20 py-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Bestsellers</h2>
        <ul className="flex gap-4">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer text-sm sm:text-base font-medium ${
                activeCategory === category
                  ? "text-yellow-500 border-b-2 border-yellow-500"
                  : "text-gray-700"
              }`}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(0); // Reset pagination on category change
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Products Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="relative bg-white shadow-lg rounded-lg p-4 flex gap-4 items-center transition-transform hover:scale-105"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Product Image */}
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-30 h-60 object-contain rounded-md"
            />

            {/* Product Info */}
            <div className="flex-1">
              <p className="text-xs text-gray-500">{product.category}</p>
              <h3 className="text-sm font-medium text-blue-700 mb-2">
                {product.title}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-gray-800">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  className={`p-2 rounded-full transition ${
                    isInCart(product.id)
                      ? "bg-yellow-500 text-white hover:bg-yellow-600"
                      : "bg-gray-200 text-gray-700 hover:bg-yellow-500 hover:text-white"
                  }`}
                  onClick={() =>
                    isInCart(product.id)
                      ? removeFromCart(product.id)
                      : addToCart(product)
                  }
                >
                  <BsCartPlus size={20} />
                </button>
              </div>
            </div>

            {/* Compare & Wishlist */}
            {hoveredProduct === product.id && (
              <div className="absolute bottom-2 left-4 right-4 flex justify-between items-center text-gray-600 transition-transform my-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                  <RiScales3Line size={18} />
                  <span className="text-sm">Compare</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-red-500">
                  <AiOutlineHeart size={18} />
                  <span className="text-sm">Wishlist</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({
          length: Math.ceil(filteredProducts.length / itemsPerPage),
        }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentPage ? "bg-yellow-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentPage(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Bestsellers;
