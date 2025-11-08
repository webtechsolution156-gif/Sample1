// src/pages/ProductDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { ShoppingBag, Star, Truck, Shield, ChevronLeft, Check, Share2, Heart, ZoomIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const inWishlist = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    setQuantity(1);
    setSelectedImg(0);
  }, [id]);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find the product you're looking for.</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition">
            <ChevronLeft className="w-5 h-5" /> Back to All Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-primary">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-primary">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
              {product.images?.[selectedImg] ? (
                <img
                  src={product.images[selectedImg]}
                  alt={`${product.name} - View ${selectedImg + 1}`}
                  className="w-full h-96 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="h-96 flex items-center justify-center text-gray-400">
                  <span className="text-lg">No Image</span>
                </div>
              )}
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition">
                <ZoomIn className="w-5 h-5" />
              </button>
              {product.originalPrice && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  SALE
                </span>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImg === i ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>
              <button
                onClick={toggleWishlist}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <Heart className={`w-6 h-6 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">₹{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toFixed(2)}</span>
                )}
                {product.originalPrice && (
                  <span className="text-sm font-semibold text-red-600">
                    Save ₹{(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>
              {product.inStock ? (
                <p className="text-green-600 font-medium mt-2 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                  In Stock • Only {product.stock} left
                </p>
              ) : (
                <p className="text-red-600 font-medium mt-2">Out of Stock</p>
              )}
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>

            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-3">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                  disabled={quantity === 1}
                >
                  -
                </button>
                <span className="px-5 py-2 font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                  disabled={!product.inStock || quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(product, quantity);
                  toast.success(`Added ${quantity} × ${product.name} to cart!`);
                }}
                disabled={!product.inStock}
                className={`flex-1 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 text-lg ${
                  product.inStock
                    ? 'bg-primary text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            {/* Trust & Share */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-gray-600 border-t pt-6">
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>Free Shipping on ₹50+</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Secure Checkout</span>
                </div>
              </div>
              <button className="flex items-center gap-2 hover:text-primary transition">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>

            {/* Specifications */}
            <div className="mt-10 border-t pt-8">
              <h3 className="font-semibold text-lg mb-4">Specifications</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                      <dt className="font-medium text-gray-600">{key}</dt>
                      <dd className="text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(rel => (
                <Link
                  key={rel.id}
                  to={`/product/${rel.id}`}
                  className="group bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <div className="h-40 bg-gray-200 relative">
                    {rel.images?.[0] ? (
                      <img src={rel.images[0]} alt={rel.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">No Image</div>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary">{rel.name}</h4>
                    <p className="text-lg font-bold text-primary mt-1">₹{rel.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}