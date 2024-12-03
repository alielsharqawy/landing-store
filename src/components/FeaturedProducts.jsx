import React, { useState, useEffect } from "react";
import { BsCartPlus } from "react-icons/bs";

const FeaturedProducts = ({ addToCart, removeFromCart, cart }) => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [categories, setCategories] = useState(["all"]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
        setDisplayedProducts(data.products);

        const uniqueCategories = [
          "all",
          ...new Set(data.products.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    if (category === "all") {
      setDisplayedProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setDisplayedProducts(filtered);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
      {/* Filter product */}
      <div className="flex flex-wrap justify-center items-center gap-4 p-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`text-sm sm:text-base font-medium px-4 py-2 rounded-full ${
              activeCategory === category
                ? "bg-yellow-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-yellow-400"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* show Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 p-8">
        {displayedProducts.map((product) => {
          const inCart = cart.some((item) => item.id === product.id);
          return (
            <div
              key={product.id}
              className="card bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-40 mb-4"
              />
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description.length > 50
                    ? `${product.description.slice(0, 50)}...`
                    : product.description}
                </p>
                <div className="flex justify-between items-center w-full mt-4">
                  <p className="text-sm font-medium text-gray-800">
                    Price:{" "}
                    <span className="text-green-500">${product.price}</span>
                  </p>
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-colors ${
                      inCart
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-200 text-gray-500 hover:bg-yellow-400 hover:text-white"
                    }`}
                    onClick={() =>
                      inCart ? removeFromCart(product.id) : addToCart(product)
                    }
                  >
                    <BsCartPlus size={20} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
