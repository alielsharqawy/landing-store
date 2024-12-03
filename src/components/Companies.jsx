import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { SiMercedes, SiBmw, SiSamsung } from "react-icons/si";
import { FaApple } from "react-icons/fa";
import { IoLogoAndroid, IoLogoWordpress } from "react-icons/io";

const Companies = () => {
  const icons = [
    <SiMercedes size={50} />,
    <SiBmw size={50} />,
    <SiSamsung size={50} />,
    <FaApple size={50} />,
    <IoLogoAndroid size={50} />,
    <IoLogoWordpress size={50} />,
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % icons.length);
  };

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + icons.length) % icons.length);
  };

  const handleLogoClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="px-6 md:px-10 lg:px-20 py-10 relative">
      {/* Top Divider */}
      <div className="h-[2px] bg-slate-500 mx-auto w-11/12"></div>

      {/* Logo Section with Arrows */}
      <div className="flex justify-center items-center gap-4 md:gap-6 lg:gap-8 relative">
        {/* Left Arrow */}
        <button
          className="absolute left-2 md:left-10 lg:left-20 top-1/2 transform -translate-y-1/2   hover:text-blue-500 transition"
          aria-label="Scroll Left"
          onClick={handlePrevious}
        >
          <IoIosArrowBack size={30} />
        </button>

        {/* Icons */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8">
          {icons.map((icon, index) => (
            <div
              key={index}
              className={`flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full cursor-pointer transition ${
                activeIndex === index
                  ? " text-blue-500 "
                  : "opacity-40 hover:opacity-100"
              }`}
              onClick={() => handleLogoClick(index)}
            >
              {icon}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-2 md:right-10 lg:right-20 top-1/2 transform -translate-y-1/2 hover:text-blue-500 transition"
          aria-label="Scroll Right"
          onClick={handleNext}
        >
          <IoIosArrowForward size={30} />
        </button>
      </div>

      {/* Bottom Divider */}
      <div className="h-[2px] bg-slate-500 mx-auto w-11/12"></div>
    </div>
  );
};

export default Companies;
