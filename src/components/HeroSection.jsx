import { useState } from "react";
import hero from "../assets/hero.avif";
import hero2 from "../assets/hero2.avif";
import hero3 from "../assets/hero3.avif";

function HeroSection() {
  const images = [hero, hero2, hero3];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Image Slider */}
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-full flex-shrink-0">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40 ">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          The New Standard
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-medium mt-2">
          Under Favorable Smartwatches
        </p>
        <p className="text-xl md:text-2xl lg:text-3xl font-bold mt-4">
          From <span className="text-yellow-500">$749.99</span>
        </p>
        <button className="mt-6 px-8 py-3 bg-yellow-500 text-black font-medium rounded-full shadow-md hover:bg-yellow-600 transition">
          Start Buying
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
      >
        ❯
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 cursor-pointer rounded-full ${
              currentIndex === index ? "bg-yellow-500 w-7" : "bg-gray-700 w-2"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
