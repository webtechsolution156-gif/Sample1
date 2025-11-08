import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../assets/assets';

const CategoryCollection = () => {
  const { category } = useParams();
  const productList = products[category] || [];
  const WHATSAPP_NUMBER = '919060804572';

  const [quantities, setQuantities] = useState(
    productList.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value < 1 ? 1 : value,
    }));
  };

  const formatCategoryTitle = (slug) => {
    if (!slug) return 'Product Collection';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="font-sans text-gray-900 bg-gradient-to-br from-white to-teal-50 min-h-screen">
      <div className="container mx-auto px-6 sm:px-6 md:px-12 py-20">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold text-center mb-12 text-teal-600 tracking-tight relative after:content-[''] after:absolute after:bottom-[-12px] after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1.5 after:bg-teal-500 after:transition-all after:duration-500 animate-slide-in">
          {formatCategoryTitle(category)}
        </h2>

        {productList.length === 0 ? (
          <p className="text-center text-xl text-gray-700 py-12 tracking-wide animate-slide-in">
            No products available in the "{formatCategoryTitle(category)}" category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {productList.map((product, i) => (
              <div
                key={product.id}
                className="relative bg-gradient-to-br from-white to-teal-50 p-6 rounded-2xl shadow-lg hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] border-t-4 border-teal-500 overflow-hidden transition-all duration-500 group animate-slide-in"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Subtle Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative overflow-hidden rounded-lg mb-6 shadow-md">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 sm:h-64 object-cover brightness-90 group-hover:brightness-100 group-hover:scale-110 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
                <h4 className="font-extrabold text-xl sm:text-2xl mb-3 text-gray-900 font-serif tracking-tight transition-transform duration-300 group-hover:scale-105">
                  {product.name}
                </h4>
                <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed tracking-wide">{product.description}</p>
                <p className="font-extrabold text-teal-600 mb-4 text-lg sm:text-xl">₹{product.price} / {product.unit} (approx.)</p>
                <div className="space-y-3 mb-6 text-sm text-gray-600">
                  <p><strong>Origin:</strong> {product.origin}</p>
                  <p><strong>Production Method:</strong> {product.productionMethod}</p>
                  <p><strong>Certifications:</strong> {product.certifications.join(', ')}</p>
                  <p><strong>Features:</strong> {product.features.join(', ')}</p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between mb-6 bg-teal-50/80 backdrop-blur-sm p-4 rounded-lg border border-teal-200 transition-all duration-300 hover:shadow-md">
                  <label
                    htmlFor={`qty-${product.id}`}
                    className="mr-4 font-semibold text-gray-900 text-sm sm:text-base"
                  >
                    Quantity ({product.unit}):
                  </label>
                  <input
                    id={`qty-${product.id}`}
                    type="number"
                    min="1"
                    value={quantities[product.id]}
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                    className="w-20 border border-teal-200 rounded-lg px-3 py-2 text-center bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                    aria-label={`Select quantity for ${product.name}`}
                  />
                </div>

                {/* WhatsApp Order Button */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hello, I would like to order ${quantities[product.id] || 1} ${product.unit} of ${product.name} (Category: ${formatCategoryTitle(category)}) from Ravindra Kumar. Please confirm availability and shipping.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-600 text-white w-full py-4 rounded-full font-semibold hover:from-teal-600 hover:to-blue-700 hover:scale-105 transition-all duration-300 uppercase tracking-wider shadow-lg hover:shadow-xl text-sm sm:text-base group/button focus:outline-none focus:ring-2 focus:ring-teal-500"
                  aria-label={`Order ${product.name} via WhatsApp`}
                >
                  <span className="absolute inset-0 bg-white/20 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2 group-hover/button:scale-110 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12.036 5.339c-3.635 0-6.591 2.957-6.592 6.589 0 1.403.437 2.708 1.182 3.785L5.5 18.5l2.787-1.463c1.008.662 2.223 1.051 3.512 1.051 3.634 0 6.591-2.956 6.592-6.589 0-3.633-2.957-6.589-6.592-6.589zm3.894 10.277c-.176.492-.547.886-1.019 1.127-.472.24-1.086.302-1.658.057-.824-.352-1.714-.914-2.652-1.766-.938-.852-1.567-1.837-1.918-2.661-.351-.824-.254-1.792.057-2.531.088-.209.265-.352.441-.441.176-.088.353-.025.5.088.147.113.265.324.353.5.088.176.147.412.059.618-.088.206-.235.412-.353.559-.118.147-.235.294-.324.5-.088.206-.029.441.147.618.353.353.794.676 1.321.971.528.294 1.056.5 1.674.559.618.059 1.027-.118 1.409-.353.382-.235.735-.559.853-.971.118-.412.059-.765-.059-.971-.118-.206-.294-.353-.5-.441z"/>
                  </svg>
                  Order on WhatsApp
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCollection;