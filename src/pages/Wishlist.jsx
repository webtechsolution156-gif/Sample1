// src/pages/Wishlist.jsx
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="max-w-md mx-auto">
          <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-8">Save items you love for later.</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition">
            <ArrowLeft className="w-5 h-5" /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Wishlist ({wishlist.length} items)</h1>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="block bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow"
            >
              {/* Image + Remove Button */}
              <div className="relative h-56 bg-gray-200">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">No Image</div>
                )}

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation
                    e.stopPropagation();
                    removeFromWishlist(product.id);
                    toast.success(`${product.name} removed from wishlist!`);
                  }}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition shadow-md"
                >
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-primary">₹{product.price}</span>
                  {product.inStock ? (
                    <span className="text-xs text-green-600">In Stock</span>
                  ) : (
                    <span className="text-xs text-red-600">Out of Stock</span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (product.inStock) {
                      addToCart(product);
                      removeFromWishlist(product.id);
                      toast.success(`${product.name} moved to cart!`);
                    }
                  }}
                  disabled={!product.inStock}
                  className={`w-full py-2 rounded-lg text-sm transition flex items-center justify-center gap-1 ${
                    product.inStock
                      ? 'bg-primary text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}