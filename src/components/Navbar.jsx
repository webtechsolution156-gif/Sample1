// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { cartTotalItems } = useCart();
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">SampleShop</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium transition-all duration-300 px-1
                  ${location.pathname === item.path ? 'text-primary' : 'text-gray-700 hover:text-primary'}
                `}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300
                    ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            ))}

            <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-gray-100 transition group">
              <Heart className="h-6 w-6 text-gray-700 group-hover:text-primary" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition group">
              <ShoppingBag className="h-6 w-6 text-gray-700 group-hover:text-primary" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartTotalItems}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link to="/wishlist" className="relative p-2">
              <Heart className="h-6 w-6 text-gray-700" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative p-2">
              <ShoppingBag className="h-6 w-6 text-gray-700" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartTotalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-700 hover:text-primary transition">
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden fixed inset-y-0 right-0 w-64 bg-white shadow-xl transform transition-transform duration-300 z-40 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="pt-20 px-6 pb-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg font-medium transition-all
                ${location.pathname === item.path ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}
              `}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
            <Heart className="h-5 h-5" />
            Wishlist {wishlistCount > 0 && <span className="text-xs font-bold">({wishlistCount})</span>}
          </Link>
          <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
            <ShoppingBag className="h-5 h-5" />
            Cart {cartTotalItems > 0 && <span className="text-xs font-bold">({cartTotalItems})</span>}
          </Link>
        </div>
      </div>

      {mobileOpen && <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setMobileOpen(false)} />}
    </nav>
  );
}