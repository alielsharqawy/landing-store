import React from "react";

const CartPage = ({ cart }) => {
  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cart.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-24 h-24 rounded-md object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
