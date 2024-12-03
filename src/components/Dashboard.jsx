import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";

const Dashboard = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [onSaleProducts, setOnSaleProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("featured");

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();

      const last9Products = data.products.slice(-9);

      setFeaturedProducts(last9Products.slice(0, 3));
      setOnSaleProducts(last9Products.slice(3, 6));
      setTopRatedProducts(last9Products.slice(6, 9));

      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          size={18}
          className={`${
            i <= rating ? "text-yellow-500" : "text-gray-300"
          } transition`}
        />
      );
    }
    return stars;
  };

  const ProductList = ({ title, products, section }) => (
    <div className="w-full lg:w-1/3 md:w-1/2 px-8 mb-8">
      <div className="relative">
        <h2
          className={`font-medium text-lg mb-4 pb-2 cursor-pointer ${
            activeSection === section ? "text-gray-800" : "text-gray-500"
          }`}
          onClick={() => setActiveSection(section)}
        >
          {title}
        </h2>
        <div
          className={`absolute h-[2px] ${
            activeSection === section ? "bg-yellow-500" : "bg-gray-300"
          }`}
          style={{
            width: "100%",
            bottom: "-1px",
          }}
        ></div>
      </div>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="flex items-start gap-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div>
              <h3 className="font-semibold text-sm text-blue-600 transition">
                {product.title}
              </h3>
              <p className="text-gray-500 text-sm">${product.price}</p>
              {section === "topRated" && (
                <div className="flex items-center mt-1">
                  {renderStars(product.rating || 5)}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className=" px-20 py-10">
      <div className="flex flex-wrap -mx-4">
        <ProductList
          title="Featured Products"
          products={featuredProducts}
          section="featured"
        />
        <ProductList
          title="On Sale Products"
          products={onSaleProducts}
          section="onSale"
        />
        <ProductList
          title="Top Rated Products"
          products={topRatedProducts}
          section="topRated"
        />
      </div>
    </div>
  );
};

export default Dashboard;
