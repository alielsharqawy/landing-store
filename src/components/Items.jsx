import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center text-blue-500 mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  const displayedCategories = categories.slice(0, 4);

  return (
    <div className="px-5 sm:px-10 lg:px-20 py-10">
      <h1 className="text-2xl font-bold  mb-6">Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedCategories.map((category) => (
          <div
            key={category.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 text-center bg-white"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 md:h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-medium">{category.name}</h2>
            <div className="flex justify-center items-center gap-3 mt-4">
              <p className="text-blue-500 font-semibold hover:underline text-sm">
                Shop Now
              </p>
              <FaArrowAltCircleRight size={20} className="text-blue-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
