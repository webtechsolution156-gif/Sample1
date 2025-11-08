// src/pages/Products.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { Search, Filter, Star } from 'lucide-react';

export default function Products() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('name');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filtered = products
    .filter(p => category === 'All' || p.category === category)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price') return a.price - b.price;
      if (sort === 'rating') return (b.rating || 0) - (a.rating || 0);
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">All Products</h1>
        <p className="text-center text-gray-600 mb-12">Discover {filtered.length} amazing items</p>

        {/* Filters */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative max-w-md w-full">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            >
              <option value="name">Name</option>
              <option value="price">Price: Low to High</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <div className="bg-gray-200 border-2 border-dashed rounded-t-xl w-full h-56 group-hover:scale-105 transition-transform duration-300" />
                {product.originalPrice && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    SALE
                  </span>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-xl">
                    <span className="text-white font-bold text-lg">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1 line-clamp-2 group-hover:text-primary transition">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>

                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                    )}
                  </div>
                  {product.inStock && (
                    <span className="text-xs text-green-600 font-medium">{product.stock} left</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}