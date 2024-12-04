import React, { useEffect, useState } from "react";
import { BsCartPlus, BsHeart } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";
import data from "../json/data.json";

const FeaturedProducts = ({ cart, setCart }) => {
  const [specialProduct, setSpecialProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Fetch a random product for the special offer
    const randomProduct =
      data.products[Math.floor(Math.random() * data.products.length)];
    setSpecialProduct(randomProduct);

    // Exclude the special product from other products
    const remainingProducts = data.products.filter(
      (product) => product.id !== randomProduct.id
    );
    setOtherProducts(remainingProducts.slice(0, 6)); // Show 6 other products

    // Initialize timer for 1-hour countdown
    const countdownEnd = new Date().getTime() + 60 * 60 * 1000;
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownEnd - now;

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCartToggle = (product) => {
    setCart((prevCart) => {
      if (prevCart.some((item) => item.id === product.id)) {
        return prevCart.filter((item) => item.id !== product.id);
      }
      return [...prevCart, product];
    });
  };

  const isInCart = (productId) => cart.some((item) => item.id === productId);

  if (!specialProduct) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  return (
    <div className="mx-auto px-4 lg:px-20 py-10">
        <h1 className="text-2xl capitalize font-bold mb-4">special offers</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Special Offer Column */}
        <div className="border-2 border-yellow-500 rounded-lg p-4 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Special Offer</h2>
            <div className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm">
              Save $90
            </div>
          </div>
          <img
            src={specialProduct.img1 || "https://via.placeholder.com/200"}
            alt={specialProduct.title}
            className="w-full h-[40%] object-contain mb-4"
          />
          <h3 className="text-center text-blue-500 font-semibold text-sm mb-4">
            {specialProduct.title}
          </h3>
          <div className="flex justify-center items-center gap-2 mb-4">
            <p className="text-gray-400 line-through text-sm">
              ${specialProduct.price + 90}
            </p>
            <p className="text-red-500 font-bold text-lg">
              ${specialProduct.price}
            </p>
          </div>

          {/* Availability Section */}
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-600">
              Available: <span className="font-bold">6</span>
            </p>
            <p className="text-sm text-gray-600">
              Already Sold: <span className="font-bold">28</span>
            </p>
          </div>
          <div className="relative w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="absolute top-0 left-0 bg-yellow-500 h-2 rounded-full"
              style={{ width: "70%" }}
            ></div>
          </div>

          <div className="text-center">
            <p className="text-gray-500 text-sm mb-2">
              Hurry Up! Offer ends in:
            </p>
            <div className="flex justify-center items-center gap-2">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-800">
                  {String(timeLeft.hours).padStart(2, "0")}
                </p>
                <p className="text-sm text-gray-500">HOURS</p>
              </div>
              <span className="text-lg font-bold">:</span>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-800">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </p>
                <p className="text-sm text-gray-500">MINS</p>
              </div>
              <span className="text-lg font-bold">:</span>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-800">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </p>
                <p className="text-sm text-gray-500">SECS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Products Columns */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {otherProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col relative group transform transition-transform duration-300 hover:scale-105"
            >
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <h3 className="text-gray-800 font-semibold text-sm mb-2">
                {product.title}
              </h3>
              <img
                src={product.img1 || "https://via.placeholder.com/150"}
                alt={product.title}
                className="w-full h-40 object-contain rounded-lg mb-4"
              />
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-500 font-bold text-sm">
                  ${product.price}
                </p>
                <button
                  className={`p-2 rounded-full transition ${
                    isInCart(product.id)
                      ? "bg-white border-2 border-yellow-500"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleCartToggle(product)}
                >
                  <BsCartPlus
                    className={`text-lg ${
                      isInCart(product.id) ? "text-yellow-500" : "text-gray-600"
                    }`}
                  />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gray-50 p-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition">
                  <AiOutlineRetweet size={18} />
                  <span className="text-sm font-medium">Compare</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition">
                  <BsHeart size={18} />
                  <span className="text-sm font-medium">Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
