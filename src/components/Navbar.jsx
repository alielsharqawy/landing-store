import { CiSearch } from "react-icons/ci";
import { AiOutlineRetweet } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";

const Navbar = () => {
  const categories = [
    "All Categories",
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
  ];

  const icons = [
    {
      icon: <AiOutlineRetweet size={20} className="text-gray-500" />,
      label: "Retweet",
    },
    {
      icon: <CiHeart size={20} className="text-gray-500" />,
      label: "Wishlist",
    },
    {
      icon: <IoBagCheckOutline size={20} className="text-gray-500" />,
      label: "Cart",
    },
  ];

  return (
    <div className="navbar container  flex items-center justify-between mt-6">
      <h1 className="text-3xl font-bold opacity-60">electro</h1>
      
      {/* Search Bar Section */}
      <div className="search-bar flex items-center rounded-full overflow-hidden w-full max-w-lg bg-white">
        <input
          type="text"
          placeholder="Search for Products"
          className="flex-1 pl-5 text-md text-gray-900 border-r border-gray-300 "
        />
        <select className="text-md text-gray-900 bg-transparent cursor-pointer">
          {categories.map((category, index) => (
            <option key={index}>{category}</option>
          ))}
        </select>
        <button className="bg-[#f5a623] text-white p-3 hover:bg-[#e89c1a]">
          <CiSearch size={20} />
        </button>
      </div>

      {/* Icons Section */}
      <div className="icons flex items-center gap-3">
        {icons.map((item, index) => (
          <div key={index} className="icon-item" aria-label={item.label}>
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
