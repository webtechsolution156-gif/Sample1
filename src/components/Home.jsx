import React from "react";
import { useNavigate } from "react-router-dom";
import heroBackground from "../assets/hero.jpg";
import pulsesImg from "../assets/pulses.jpg";
import vegetablesImg from "../assets/vegetables.jpeg";
import spicesImg from "../assets/spices.jpg";
import grainsImg from "../assets/grains.jpeg";
import essentialsImg from "../assets/essentials.jpeg";
import nutsImg from "../assets/nuts.jpeg";

const CATEGORIES = [
  { name: "Pulses & Legumes", image: pulsesImg, slug: "pulses-legumes" },
  { name: "Vegetables", image: vegetablesImg, slug: "vegetables" },
  { name: "Spices", image: spicesImg, slug: "spices" },
  { name: "Grains & Cereals", image: grainsImg, slug: "grains-cereals" },
  {
    name: "Nuts, Fruits & Oilseeds",
    image: nutsImg,
    slug: "nuts-fruits-oilseeds",
  },
  { name: "Daily Essentials", image: essentialsImg, slug: "daily-essentials" },
];

const Home = () => {
  const navigate = useNavigate();

  const WhatsAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="currentColor"
      className="w-8 h-8"
    >
      <path d="M380.9 97.4C339.4 56.4 283.4 34.6 224 34.8c-113.5 0-205.2 91.7-205.2 205.2S110.5 445.2 224 445.2h-.1c35.6 0 69.1-10 98.3-29.3l79 17.5c.6.1 1.2.2 1.8.2 3.3 0 5.4-3.7 3.8-6.8l-15.1-30.8c.4-.7.6-1.5.8-2.3 22.1-28 35.5-62.8 35.5-100.2C429.2 189.1 397 131 380.9 97.4zM224 411.8c-80.5 0-146-65.5-146-146 0-80.5 65.5-146 146-146s146 65.5 146 146c0 38.4-14.8 74.3-41.7 101.4l-14 14.8-1.5 2.1c-.2.2-.4.5-.7.7l-4.5 5.6-5.8 5.7c-2.3 2.3-5.6 3.4-8.7 3.4-1.2 0-2.3-.2-3.4-.6L246 397.7l-16-4.5c-3.1-1-6.1-1.5-9.2-1.5h-.1zM342.3 331.3c-2.6-1.2-15.2-7.5-17.6-8.4-2.4-1.2-4.1-1.8-5.8 1.8-1.6 3.6-6.4 7.6-7.8 9.1-1.4 1.5-2.9 1.8-5.5.6-2.5-1.2-10.7-3.9-20.4-12.6-7.5-6.7-12.6-15-14-17.5-1.5-2.6-.2-4.2 1.2-5.5 1.2-1.2 2.6-2.9 3.9-4.5s.4-2.8-.2-4.1c-.6-1.2-5.1-12.4-7-17.4-1.8-4.8-3.7-4.1-5.5-4.1-1.8 0-3.9-.2-5.9-.2-2 0-5.1.8-7.8 3.9-2.7 3.1-10.3 10.1-10.3 24.6s10.6 28.5 12.1 30.2 20.9 32 50.7 44.5 31.6 9 37.8 8.4c6.3-.6 20.3-8.3 23.1-16.8 2.8-8.5 2.8-15.8 2-17.5-1-.9-3.9-1.2-7.5-2.9z" />
    </svg>
  );

  return (
    <div className="font-sans text-gray-900 bg-gradient-to-br from-white to-teal-50">
      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center text-white animate-slide-in"
        style={{ backgroundImage: `url(${heroBackground})` }}
        aria-label="Hero section showcasing Ravindra Kumar’s agricultural products"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-700/80 to-blue-600/80 hover:from-teal-700/70 hover:to-blue-600/70 transition-all duration-700"></div>
        <div
          className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: `url(${heroBackground})` }}
        ></div>
        <div className="relative z-10 text-center px-6 py-12 max-w-4xl mx-auto animate-slide-up">
          <p className="text-2xl md:text-3xl mb-6 tracking-widest font-light uppercase text-teal-100">
            <strong className="font-extrabold text-white">RAVINDRA KUMAR</strong> | Sustainable Excellence
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-extrabold leading-tight mb-10 tracking-tight drop-shadow-2xl">
            India's Finest <br /> Agricultural Exports
          </h1>
          <button
            onClick={() => navigate("/products")}
            className="bg-teal-500 text-white font-semibold py-4 px-12 rounded-full shadow-xl hover:bg-teal-600 hover:shadow-2xl hover:scale-110 transition-all duration-300 uppercase tracking-wider text-lg"
            aria-label="Explore our product offerings"
          >
            Discover Products
          </button>
        </div>
        {/* WhatsApp */}
        <a
          href="https://wa.me/919060804572"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50 bg-teal-500 hover:bg-teal-600 p-5 rounded-full shadow-2xl text-white hover:scale-110 transition-transform duration-300 animate-bounce-slow"
          aria-label="Contact us on WhatsApp"
        >
          <WhatsAppIcon />
        </a>
      </section>

      {/* Feature Highlights */}
      <section className="py-28 bg-gradient-to-b from-teal-50 to-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold mb-16 text-gray-900 relative after:content-[''] after:absolute after:bottom-[-12px] after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1.5 after:bg-teal-500 after:transition-all after:duration-500 animate-slide-in">
            Our Commitment
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              {
                title: "Uncompromising Quality",
                desc: "Every product meets stringent quality and hygiene standards.",
                icon: "🌟",
              },
              {
                title: "Trusted Partnerships",
                desc: "Sourced sustainably from India's finest farmers.",
                icon: "🤝",
              },
              {
                title: "Global Delivery",
                desc: "Seamless exports to markets worldwide.",
                icon: "🌍",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-8 bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-lg hover:shadow-2xl border-t-4 border-teal-500 hover:scale-105 transition-all duration-500 animate-slide-in"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <span className="absolute top-4 right-4 text-3xl">{item.icon}</span>
                <h3 className="font-bold text-2xl mb-3 text-teal-600">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-28 container mx-auto px-6 md:px-12 flex flex-col lg:flex-row-reverse items-center gap-16">
        <div className="lg:w-1/2 overflow-hidden rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(45,212,191,0.5)] transition-all duration-500 transform hover:scale-105 animate-slide-in-right">
          <img
            src={pulsesImg}
            alt="About Us"
            className="w-full h-[400px] object-cover hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        </div>
        <div className="lg:w-1/2 space-y-8 animate-slide-in-left">
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-gray-900 relative after:content-[''] after:absolute after:bottom-[-12px] after:left-0 after:w-20 after:h-1.5 after:bg-teal-500 after:transition-all after:duration-500 hover:after:w-32">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed tracking-wide">
            At <strong className="text-teal-600">Ravindra Kumar</strong>, we bridge India's rich agricultural heritage with global markets, delivering premium products with unmatched expertise.
          </p>
          <button
            onClick={() => navigate("/about")}
            className="bg-teal-500 text-white px-8 py-4 rounded-full shadow-lg hover:bg-teal-600 hover:shadow-xl hover:scale-105 transition-all duration-300 uppercase tracking-wider font-semibold"
            aria-label="Learn more about our story"
          >
            Discover Our Story
          </button>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-28 bg-gradient-to-b from-white to-teal-50">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold mb-16 text-gray-900 relative after:content-[''] after:absolute after:bottom-[-12px] after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1.5 after:bg-teal-500 after:transition-all after:duration-500 animate-slide-in">
            Our Product Range
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8">
            {CATEGORIES.map((cat, i) => (
              <div
                key={i}
                onClick={() => navigate(`/products/${cat.slug}`)}
                className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-teal-100 cursor-pointer hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] transition-all duration-500 group animate-slide-in"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-64 object-cover group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 to-transparent group-hover:from-teal-900/80 flex items-end p-4">
                  <h3 className="text-white text-xl font-semibold tracking-wide">{cat.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white text-center animate-slide-in">
        <h2 className="text-4xl md:text-5xl font-serif font-extrabold mb-6 tracking-tight">
          Partner with Us Today
        </h2>
        <p className="text-lg mb-8 tracking-wide max-w-2xl mx-auto">
          Connect with us to source the finest Indian agricultural products for your global markets.
        </p>
        <a
          href="https://wa.me/919060804572?text=Hello%20Ravindra%20Kumar%20team,%20I'm%20interested%20in%20discussing%20global%20sourcing%20for%20your%20Indian%20agricultural%20products."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-teal-600 px-10 py-4 rounded-full font-semibold hover:bg-teal-100 hover:shadow-xl hover:scale-105 transition-all duration-300 uppercase tracking-wider shadow-lg"
          aria-label="Contact our export team on WhatsApp"
        >
          Get in Touch
        </a>
      </section>
    </div>
  );
};

export default Home;