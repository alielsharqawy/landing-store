import React from "react";
import hero from "../assets/hero.avif";

const Landing = () => {
  return (
    <div className="flex justify-center items-center w-full">
      {/* Image Container */}
      <div
        className=" relative bg-cover bg-center w-[90%] h-[25vh] flex items-center justify-between px-8 rounded-lg shadow-lg"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg"></div>

        {/* Content */}
        <div className="relative  text-white flex items-center gap-10 ">
          {/* Text Section */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-3xl font-bold">
              SHOP AND <span className="text-yellow-500">SAVE BIG</span>
            </h1>
            <p className="text-lg sm:text-xl mt-2">ON HOTTEST TABLETS</p>
          </div>

          {/* Price Badge */}
          <div className="bg-yellow-500 px-4 py-2 rounded-xl shadow-lg">
            <span className="text-black text-sm uppercase block">
              Starting At
            </span>
            <button className="text-black font-medium text-xl">$79.99</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
