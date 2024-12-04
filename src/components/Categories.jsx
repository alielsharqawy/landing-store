import React, { useState, useEffect } from "react";
import { BsCartPlus } from "react-icons/bs";

const BestDeals = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products"
        );
        const data = await response.json();

        const uniqueCategories = [
          "All",
          ...new Set(data.map((product) => product.category.name)),
        ];
        setCategories(uniqueCategories);
        setProducts(data);
        setFilteredProducts(data); // Default to show all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to the first page when category changes
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.category.name.toLowerCase() === category.toLowerCase()
        )
      );
    }
  };

  const isInCart = (product) => cart.some((item) => item.id === product.id);

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
    <div className="mx-auto px-4 lg:px-20 py-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl capitalize font-bold mb-4">Bestsellers</h2>
        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 border-b pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`text-gray-600 hover:text-yellow-500 transition font-medium text-sm md:text-base ${
                activeCategory === category ? "text-yellow-500 font-bold" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1 */}
        <div className="flex flex-col gap-6">
          {currentItems.slice(0, 2).map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col"
            >
              <h3 className="text-sm font-medium text-gray-600 mb-2 text-start">
                {product.category.name}
              </h3>
              <h2 className="text-lg font-bold text-gray-800 mb-4 text-start">
                {product.title}
              </h2>
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg mb-auto"
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2 items-center">
                  <p className="text-gray-400 line-through text-sm">
                    ${product.price + 50}
                  </p>
                  <p className="text-red-500 font-bold text-sm">
                    ${product.price}
                  </p>
                </div>
                <button
                  className={`font-bold text-lg ${
                    isInCart(product)
                      ? "text-white bg-yellow-500 p-2 rounded-full"
                      : "text-gray-500"
                  } transition`}
                  onClick={() => toggleCart(product)}
                >
                  <BsCartPlus size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Column 2 (Spanning Two Rows) */}
        <div className="flex flex-col justify-center">
          {currentItems.slice(2, 3).map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col h-full"
            >
              <h3 className="text-sm font-medium text-gray-600 mb-2 text-start">
                {product.category.name}
              </h3>
              <h2 className="text-lg font-bold text-gray-800 mb-4 text-start">
                {product.title}
              </h2>
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg mb-auto"
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2 items-center">
                  <p className="text-gray-400 line-through text-sm">
                    ${product.price + 100}
                  </p>
                  <p className="text-red-500 font-bold text-sm">
                    ${product.price}
                  </p>
                </div>
                <button
                  className={`font-bold text-lg ${
                    isInCart(product)
                      ? "text-white bg-yellow-500 p-2 rounded-full"
                      : "text-gray-500"
                  } transition`}
                  onClick={() => toggleCart(product)}
                >
                  <BsCartPlus size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-6">
          {currentItems.slice(3, 5).map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col"
            >
              <h3 className="text-sm font-medium text-gray-600 mb-2 text-start">
                {product.category.name}
              </h3>
              <h2 className="text-lg font-bold text-gray-800 mb-4 text-start">
                {product.title}
              </h2>
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg mb-auto"
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2 items-center">
                  <p className="text-gray-400 line-through text-sm">
                    ${product.price + 30}
                  </p>
                  <p className="text-red-500 font-bold text-sm">
                    ${product.price}
                  </p>
                </div>
                <button
                  className={`font-bold text-lg ${
                    isInCart(product)
                      ? "text-white bg-yellow-500 p-2 rounded-full"
                      : "text-gray-500"
                  } transition`}
                  onClick={() => toggleCart(product)}
                >
                  <BsCartPlus size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`w-2 h-2 rounded-full ${
              currentPage === index + 1 ? "bg-yellow-500 w-7" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default BestDeals;
