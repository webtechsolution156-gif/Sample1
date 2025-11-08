import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../assets/assets'; // Import the categories array

const ProductCategories = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-900 bg-gradient-to-br from-white to-teal-50 min-h-screen animate-slide-in">
      <div className="container mx-auto px-6 md:px-12 py-20">
        <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-center mb-12 text-teal-600 relative after:content-[''] after:absolute after:bottom-[-12px] after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1.5 after:bg-teal-500 after:transition-all after:duration-500 hover:after:w-32 animate-slide-in">
          Explore Our Product Categories
        </h2>
        
        <p className="text-center text-lg text-gray-700 mb-16 max-w-3xl mx-auto tracking-wide animate-slide-in" style={{ animationDelay: '200ms' }}>
          Discover our premium Indian agricultural products, sourced sustainably and ready for global export. Select a category to explore our offerings.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {categories.map((category, i) => (
            <button
              key={category.slug}
              onClick={() => navigate(`/products/${category.slug}`)}
              className="relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-white to-teal-50 border-2 border-teal-100 cursor-pointer hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] transition-all duration-500 group animate-slide-in"
              style={{ animationDelay: `${i * 150}ms` }}
              aria-label={`View ${category.name} Products`}
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover brightness-90 group-hover:brightness-100 group-hover:scale-110 transition-all duration-500"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-serif font-extrabold text-gray-900 mb-2 transition-transform duration-300 group-hover:scale-105">
                  {category.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">{category.description}</p>
              </div>
              
              {/* Call to Action Button */}
              <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-3 text-center text-sm uppercase font-semibold transition-all duration-300 group-hover:opacity-90">
                View Collection →
              </div>
            </button>
          ))}
        </div>
        
        {/* CTA Banner */}
        <div className="mt-20 py-12 px-8 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl text-white text-center shadow-lg hover:shadow-2xl animate-slide-in" style={{ animationDelay: '300ms' }}>
          <h3 className="text-3xl font-serif font-extrabold mb-4 tracking-tight transition-transform duration-300 hover:scale-105">
            Ready for a Bulk Order?
          </h3>
          <p className="text-lg mb-6 text-teal-100 tracking-wide">Contact our team for tailored quotes and seamless export solutions.</p>
          <button
            onClick={() => {
              const phoneNumber = "919060804572";
              const message = encodeURIComponent(
                "Hello, I am interested in placing a bulk order. Please provide details and pricing."
              );
              window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
            }}
            className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold hover:bg-teal-100 hover:shadow-xl hover:scale-105 transition-all duration-300 uppercase tracking-wider shadow-lg"
            aria-label="Get a Quote via WhatsApp"
          >
            Get a Quote Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;