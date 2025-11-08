import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png'; // Ensure the logo path is correct

const Header = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contacts', path: '/contact' },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  // Animation variants for nav items
  const navItemVariants = {
    hover: { scale: 1.1, y: -2, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  // Animation for mobile menu
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.1 },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.header
      className="sticky top-0 w-full z-50 bg-gradient-to-r from-teal-800/95 to-blue-700/95 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo/Brand (Left Section) */}
          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" onClick={closeMenu}>
              <img
                src={logo}
                alt="RAVINDRA KUMAR Logo"
                className="h-12 w-auto transition-all duration-300 ease-in-out hover:brightness-110"
              />
            </Link>
            <span className="hidden md:inline text-2xl font-serif font-extrabold text-white tracking-tight">
              RAVINDRA KUMAR
            </span>
          </motion.div>

          {/* Desktop Navigation (Centered) */}
          <nav className="hidden md:flex flex-1 justify-center items-center space-x-8 lg:space-x-12 font-medium">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative group text-base lg:text-lg tracking-wide transition-colors duration-300 ease-in-out 
                  ${
                    isActive
                      ? 'text-emerald-300 font-semibold'
                      : 'text-white hover:text-emerald-300'
                  }`
                }
              >
                {({ isActive }) => (
                  <motion.span
                    variants={navItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-300 transform transition-all duration-300 ease-in-out
                        ${isActive ? 'w-full scale-x-100' : 'w-0 group-hover:w-full group-hover:scale-x-100'}`}
                      aria-hidden="true"
                    ></span>
                  </motion.span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-lg hover:bg-emerald-600/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div
          className="md:hidden absolute top-16 left-0 w-full bg-gradient-to-br from-teal-800/95 to-blue-700/95 backdrop-blur-lg shadow-2xl border-t border-emerald-300/50"
          variants={mobileMenuVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col items-start py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-white font-medium text-lg w-full px-6 py-3 transition-all duration-200 ease-in-out border-l-4
                  ${
                    isActive
                      ? 'text-emerald-300 font-semibold bg-emerald-800/30 border-emerald-300'
                      : 'hover:bg-emerald-800/30 border-transparent hover:border-emerald-300 hover:text-emerald-300'
                  }`
                }
              >
                <motion.span variants={mobileItemVariants}>
                  {item.name}
                </motion.span>
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;