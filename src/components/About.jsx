import React from 'react';
import { Link } from 'react-router-dom';
import aboutImage from '../assets/logo.png'; // Ensure the image path is correct

const AboutUs = () => {
  return (
    <div className="font-sans text-gray-900 bg-gradient-to-br from-white to-teal-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-80 md:h-[500px] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${aboutImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-700/80 to-blue-600/80 hover:from-teal-700/70 hover:to-blue-600/70 transition-all duration-700 ease-in-out"></div>
        <h1 className="relative z-10 text-4xl md:text-6xl font-serif font-extrabold text-white tracking-tight animate-pulse-slow">
          Our Story & Mission
        </h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
        {/* Left: Text Content */}
        <div className="lg:w-2/3 space-y-10 animate-slide-in-left">
          <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-teal-600 relative after:content-[''] after:absolute after:bottom-[-12px] after:left-0 after:w-20 after:h-1.5 after:bg-teal-500 after:transition-all after:duration-500 hover:after:w-32">
            India's Finest to the World
          </h2>

          <p className="text-lg md:text-xl leading-relaxed text-gray-700 tracking-wide">
            At <span className="font-bold text-teal-500">Ravindra Kumar</span>, we are committed to sharing the finest Indian agricultural and food products globally. With <strong>generations of expertise</strong> in farming and trading, we deliver rich flavors and traditions to the world.
          </p>

          <div className="border-l-4 border-teal-500 pl-6 bg-gradient-to-br from-white to-teal-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <p className="text-lg italic leading-relaxed text-gray-600">
              Our diverse export portfolio includes <strong>grains, pulses, spices, oilseeds, dry fruits, vegetables, natural sweeteners</strong>, and traditional Indian ingredients like <strong>rice, wheat, soybeans, makhana, lentils, cumin, turmeric, mustard, ghee, and coconut</strong>.
            </p>
          </div>

          <p className="text-lg leading-relaxed text-gray-700 tracking-wide">
            We source every product from <strong>trusted farmers</strong>, ensuring the highest standards of quality, hygiene, and sustainability.
          </p>

          <Link
            to="/products"
            className="inline-block px-8 py-4 rounded-full font-semibold text-white bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wider"
            aria-label="Explore Our Product Catalog"
          >
            Explore Our Products
          </Link>
        </div>

        {/* Right: Image + Core Values */}
        <div className="lg:w-1/3 w-full space-y-10 animate-slide-in-right">
          {/* Image Card */}
          <div className="bg-gradient-to-br from-white to-teal-50 p-5 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
            <img
              src={aboutImage}
              alt="Commitment to Quality"
              className="rounded-xl shadow-md w-full h-72 object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>

          {/* Core Values */}
          <div className="bg-gradient-to-br from-gray-800 to-teal-900 text-white p-8 rounded-2xl shadow-lg hover:shadow-[0_0_30px_rgba(45,212,191,0.5)] transition-all duration-500 transform hover:-translate-y-1">
            <h3 className="text-3xl font-extrabold text-teal-400 mb-2">LOCAL ROOTS.</h3>
            <h3 className="text-3xl font-extrabold mb-4">GLOBAL IMPACT.</h3>
            <p className="mt-4 text-lg font-light text-gray-200 tracking-wide">
              Empowering Farmers, Nourishing the World.
            </p>
            <ul className="mt-6 space-y-3 list-disc list-inside">
              <li className="transition-transform duration-300 hover:translate-x-3 text-gray-200">Uncompromising Quality & Hygiene</li>
              <li className="transition-transform duration-300 hover:translate-x-3 text-gray-200">Sustainable Sourcing Practices</li>
              <li className="transition-transform duration-300 hover:translate-x-3 text-gray-200">Fair Trade Commitment</li>
              <li className="transition-transform duration-300 hover:translate-x-3 text-gray-200">Generational Trading Expertise</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;