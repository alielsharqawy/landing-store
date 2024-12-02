import { useState, useEffect } from "react";
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
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      <div className=" absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`mt-[-30px] h-2 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-yellow-500" : "bg-gray-700"
            } ${currentIndex === index ? "w-7" : "w-2"}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
