import { useState } from "react";
import { CiBoxList } from "react-icons/ci";

const AllDepartments = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    "Value of the Day",
    "Top 100 Offers",
    "New Arrivals",
    "Laptops",
    "Cameras",
    "Smart Phones",
  ];

  const links = [
    { text: "Super Deals", href: "#" },
    { text: "Feature Brands", href: "#" },
    { text: "Trending Styles", href: "#" },
    { text: "Gift Cards", href: "#" },
    { text: "Blog", href: "#" },
    { text: "Free Shipping on Orders $50+", isInfo: true },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 mx-auto p-1 max-w-7xl">
      {/* All Departments Dropdown */}
      <div className="relative w-full lg:w-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full lg:w-[250px] bg-yellow-500 text-gray-800 p-2 rounded-t-md shadow-md"
        >
          <CiBoxList className="text-xl" />
          <span>All Departments</span>
        </button>
        {isOpen && (
          <ul className="absolute top-full left-0 w-full lg:w-[250px] bg-white shadow-lg z-10 ">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="p-2 text-gray-800 hover:bg-yellow-100 hover:text-yellow-800 cursor-pointer transition duration-200"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Links */}
      <div className="w-full lg:w-auto">
        <ul className="flex flex-col sm:flex-row flex-wrap gap-4 text-sm text-gray-700">
          {links.map((link, index) =>
            link.isInfo ? (
              <li key={index} className="text-gray-500">
                {link.text}
              </li>
            ) : (
              <li key={index}>
                <a
                  href={link.href}
                  className="transition hover:text-yellow-700"
                >
                  {link.text}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default AllDepartments;
