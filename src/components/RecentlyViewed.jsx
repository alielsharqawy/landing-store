import React, { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";

const RecentlyViewed = ({ cart, addToCart, removeFromCart }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleNext = () => {
    if (currentPage < Math.ceil(products.length / itemsPerPage) - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const paginatedProducts = products.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const isInCart = (productId) =>
    cart.some((product) => product.id === productId);

  return (
    <div className="px-6 md:px-10 lg:px-20 py-10">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Recently Viewed</h2>
        <div className="flex gap-1">
          <button
            className={`hover:text-blue-500 transition ${
              currentPage === 0 ? "text-gray-300 cursor-not-allowed" : ""
            }`}
            onClick={handlePrevious}
            disabled={currentPage === 0}
          >
            <IoIosArrowBack size={25} />
          </button>
          <button
            className={`hover:text-blue-500 transition ${
              currentPage >= Math.ceil(products.length / itemsPerPage) - 1
                ? "text-gray-300 cursor-not-allowed"
                : ""
            }`}
            onClick={handleNext}
            disabled={
              currentPage >= Math.ceil(products.length / itemsPerPage) - 1
            }
          >
            <IoIosArrowForward size={25} />
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Products Container */}
        <div className="flex flex-wrap justify-center gap-4">
          {paginatedProducts.map((product) => {
            const isProductInCart = isInCart(product.id);
            return (
              <div
                key={product.id}
                className={`bg-white shadow-lg rounded-lg p-4 w-[100%] sm:w-[48%] md:w-[30%] lg:w-[18%] transition-transform transform ${
                  hoveredProductId === product.id ? "scale-105" : ""
                }`}
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
                onClick={() => setHoveredProductId(product.id)}
              >
                {/* Category */}
                <p className="text-gray-500 text-xs mb-1">{product.category}</p>

                {/* Title */}
                <h3 className="text-sm font-medium text-blue-700 mb-2">
                  {product.title}
                </h3>

                {/* Image */}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-24 object-contain mb-4"
                />

                {/* Price and Cart */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-green-500 font-semibold">
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    className={`p-2 rounded-full transition ${
                      isProductInCart
                        ? "bg-yellow-500 text-white hover:bg-yellow-600"
                        : "bg-gray-200 text-gray-700 hover:bg-yellow-500 hover:text-white"
                    }`}
                    onClick={() =>
                      isProductInCart
                        ? removeFromCart(product.id)
                        : addToCart(product)
                    }
                  >
                    <BsCartPlus size={20} />
                  </button>
                </div>

                {/* Compare and Wishlist */}
                {hoveredProductId === product.id && (
                  <div className="flex items-center justify-between text-gray-600 text-sm">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                      <AiOutlineRetweet size={16} />
                      <span>Compare</span>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-red-500">
                      <AiOutlineHeart size={16} />
                      <span>Wishlist</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({
            length: Math.ceil(products.length / itemsPerPage),
          }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentPage ? "bg-yellow-500 w-6 h-2" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;
