"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/images/slides/filmcatalog-hero.png",
  "/images/slides/meetbdc.jpg",
  "/images/slides/filmmakers.png"
];

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full bg-black flex justify-center items-center" style={{ height: 500 }}>
      
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-0 z-20 h-full px-10 flex items-center justify-center
                   text-white text-xl hover:text-purple-500 transition"
      >
        &#10094;
      </button>

      {/* Slides container */}
      <div className="w-full h-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out py-5"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src) => (
            <div key={src} className="relative min-w-full h-full">
              <Image
                src={src}
                alt="Hero image"
                fill
                priority
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-0 z-20 h-full px-10 flex items-center justify-center
                   text-white text-xl hover:text-purple-500 transition"
      >
        &#10095;
      </button>
    </div>
  );
}
