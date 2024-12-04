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
    <div className="flex flex-col lg:flex-row items-start  lg:items-center mx-auto px-4 lg:px-20 py-6 max-w-7xl">
      {/* All Departments Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-yellow-500 text-white rounded-md px-6 py-3 flex items-center shadow-md hover:bg-yellow-600 transition duration-300"
        >
          <CiBoxList className="text-2xl mr-2" />
          <span className="font-bold text-lg px-2">All Departments</span>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 bg-white shadow-lg py-3 mt-1 rounded-md w-64 z-20">
            <ul>
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-yellow-100 cursor-pointer transition duration-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Links */}
      <div className="mt-4 lg:mt-0 lg:ml-8 w-full lg:w-auto">
        <ul className="flex flex-col sm:flex-row flex-wrap gap-4 font-medium text-gray-700">
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
