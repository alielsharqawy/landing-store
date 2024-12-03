import React, { useState, useEffect } from "react";
import { BsCartPlus } from "react-icons/bs";

function FeaturedProducts({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();

        const filteredProducts = data.products.filter(
          (product) => product.id !== 6 && product.id !== 9 && product.id !== 19
        );

        setProducts(filteredProducts);
        setDisplayedProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products data:", error);
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
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      setDisplayedProducts(filtered);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-red-500">
          Failed to load products.
        </div>
      </div>
    );
  }

  const uniqueCategories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className="container">
      <ul className="flex justify-center items-center gap-10">
        {uniqueCategories.map((category) => (
          <li key={category}>
            <button
              className={`${
                activeCategory === category ? "text-yellow-500 font-bold" : ""
              } text-sm sm:text-base md:text-lg`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      <div className="boxes flex flex-wrap gap-4 mt-6">
        {displayedProducts.map((product) => (
          <div
            className="card bg-white shadow-md rounded-lg p-4"
            key={product.id}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-40 object-contain w-full"
            />
            <div className="txt">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600 text-sm">
                {product.description.length > 50
                  ? `${product.description.slice(0, 40)}...`
                  : product.description}
              </p>
              <p className="text-sm font-medium text-gray-800">
                Category:{" "}
                <span className="text-blue-500">{product.category}</span>
              </p>
              <p className="text-sm font-medium text-gray-800">
                Price: <span className="text-green-500">${product.price}</span>
              </p>
              <div className="flex justify-center items-center gap-3 mt-2">
                <p
                  className="text-yellow-500 font-semibold hover:underline text-sm cursor-pointer"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </p>
                <BsCartPlus size={25} className="text-yellow-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
