import { CiSearch } from "react-icons/ci";
import { AiOutlineRetweet } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";
import { useState } from "react";

const Navbar = ({ cart, toggleCart, onSearch }) => {
  const categories = [
    "All Categories",
    "Laptops",
    "Smartphones",
    "Furniture",
    "Skincare",
  ];

  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText); // إرسال نص البحث إلى FeaturedProducts
  };

  return (
    <div className="navbar container flex items-center justify-between mt-6">
      <h1 className="text-3xl font-bold opacity-60">electro</h1>

      {/* Search Bar Section */}
      <div className="search-bar flex items-center rounded-full overflow-hidden w-full max-w-lg bg-white">
        <input
          type="text"
          placeholder="Search for Products"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 pl-5 text-md text-gray-900 border-r border-gray-300 "
        />
        <select className="text-md text-gray-900 bg-transparent cursor-pointer">
          {categories.map((category, index) => (
            <option key={index}>{category}</option>
          ))}
        </select>
        <button
          className="bg-[#f5a623] text-white p-4 hover:bg-[#e89c1a]"
          onClick={handleSearch}
        >
          <CiSearch size={20} />
        </button>
      </div>

      {/* Icons Section */}
      <div className="icons flex items-center gap-3">
        <div
          className="relative icon-item cursor-pointer"
          aria-label="Cart"
          onClick={toggleCart}
        >
          <IoBagCheckOutline size={35} className="text-gray-500" />
          {cart.length > 0 && (
            <span className="absolute top-[-5px] right-0 bg-red-500 text-white text-sm rounded-full px-1">
              {cart.length}
            </span>
          )}
        </div>
        <AiOutlineRetweet size={35} className="text-gray-500" />
        <CiHeart size={35} className="text-gray-500" />
      </div>
    </div>
  );
};

export default Navbar;
