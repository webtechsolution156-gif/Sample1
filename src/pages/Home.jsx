// src/components/Home.jsx
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, Shield, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { useState, useEffect } from 'react';

export default function Home() {
  // -------------------------------------------------
  // 1. HERO CAROUSEL
  // -------------------------------------------------
  const heroSlides = [
    {
      title: 'Summer Sale – Up to 50% Off!',
      subtitle: 'Limited time only. Grab your favorites now.',
      cta: 'Shop Sale',
      link: '/products?filter=sale',
      bg: 'bg-gradient-to-r from-pink-500 to-orange-500',
    },
    {
      title: 'New Arrivals Are Here',
      subtitle: 'Fresh styles, fresh prices.',
      cta: 'Explore New',
      link: '/products?filter=new',
      bg: 'bg-gradient-to-r from-teal-500 to-cyan-600',
    },
    {
      title: 'Free Shipping on Orders ₹50+',
      subtitle: 'Fast, reliable, and on us.',
      cta: 'Shop Now',
      link: '/products',
      bg: 'bg-gradient-to-r from-indigo-600 to-purple-600',
    },
  ];

  const [slideIdx, setSlideIdx] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setSlideIdx((i) => (i + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [heroSlides.length]);

  const goPrev = () => setSlideIdx((i) => (i - 1 + heroSlides.length) % heroSlides.length);
  const goNext = () => setSlideIdx((i) => (i + 1) % heroSlides.length);

  // -------------------------------------------------
  // 2. SALE BANNER
  // -------------------------------------------------
  const SaleBanner = () => (
    <section className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          🔥 FLASH SALE – 48 HOURS ONLY! 🔥
        </h2>
        <p className="mt-2 text-lg">
          Use code <span className="font-mono bg-white text-red-600 px-2 py-1 rounded">SAVE20</span> for an extra 20% off
        </p>
        <Link
          to="/products?filter=sale"
          className="mt-4 inline-block bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Shop Flash Sale
        </Link>
      </div>
    </section>
  );

  // -------------------------------------------------
  // 3. FEATURED PRODUCTS (now 6)
  // -------------------------------------------------
  const featured = products.slice(0, 6);

  return (
    <div>
      {/* ====================== HERO CAROUSEL ====================== */}
      <section className="relative overflow-hidden">
        {/* Slides */}
        <div className="relative h-[450px] md:h-[550px]">
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 ${slide.bg} transition-opacity duration-700 ${
                i === slideIdx ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-lg md:text-xl mb-6 max-w-2xl">{slide.subtitle}</p>
                <Link
                  to={slide.link}
                  className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2"
                >
                  {slide.cta} <ShoppingBag className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIdx(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === slideIdx ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ====================== SALE BANNER ====================== */}
      <SaleBanner />

      {/* ====================== FEATURES ====================== */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Fast Delivery</h3>
            <p className="text-gray-600">Free shipping on orders over ₹50</p>
          </div>
          <div className="text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Secure Payment</h3>
            <p className="text-gray-600">100% secure transactions</p>
          </div>
          <div className="text-center">
            <Star className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Top Quality</h3>
            <p className="text-gray-600">Premium products only</p>
          </div>
        </div>
      </section>

      {/* ====================== FEATURED PRODUCTS ====================== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featured.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-3">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        product.inStock
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/products" className="text-primary font-semibold hover:underline">
              View All Products →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}