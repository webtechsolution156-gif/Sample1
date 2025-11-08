import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Contact Us", path: "/contact" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.675 0h-21.35C.592 0 0 .592 0 1.325v21.351C0 23.407.592 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.588l-.467 3.622h-3.121V24h6.116c.733 0 1.325-.593 1.325-1.324V1.325C24 .592 23.407 0 22.675 0z"/>
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 4.557a9.839 9.839 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.555-2.005.959-3.127 1.184a4.916 4.916 0 0 0-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.828a4.902 4.902 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.788-.023-1.177-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.01-7.514 14.01-14.01 0-.213-.005-.426-.014-.637A10.025 10.025 0 0 0 24 4.557z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.452 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.849-3.037-1.849 0-2.133 1.445-2.133 2.939v5.667H9.36V9h3.414v1.561h.049c.476-.9 1.637-1.849 3.37-1.849 3.604 0 4.269 2.372 4.269 5.455v6.285zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.561V9h3.553v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.206 24 24 23.226 24 22.271V1.729C24 .774 23.206 0 22.225 0z"/>
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 border-b border-gray-600/50 pb-12">
        {/* Logo & About */}
        <div className="space-y-6 transform transition-all duration-500 hover:scale-105">
          <Link to="/" aria-label="Ravindra Kumar Home">
            <img
              src={logo}
              alt="Ravindra Kumar Logo"
              className="h-12 w-auto filter brightness-90 hover:brightness-100 transition-all duration-300"
            />
          </Link>
          <p className="text-gray-300 text-sm font-sans leading-relaxed tracking-wide">
            Delivering premium agricultural and food products from India to the world with a commitment to sustainability and quality.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-teal-400 font-bold text-xl mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-16 after:h-1 after:bg-teal-400 after:transition-all after:duration-300 hover:after:w-24">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {quickLinks.map(link => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-gray-300 hover:text-teal-400 font-medium text-sm transition-all duration-300 ease-in-out hover:pl-2"
                  aria-label={`Navigate to ${link.name}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-teal-400 font-bold text-xl mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-16 after:h-1 after:bg-teal-400 after:transition-all after:duration-300 hover:after:w-24">
            Contact Info
          </h3>
          <div className="space-y-5 text-sm">
            <p className="group transition-transform duration-300 ease-in-out hover:translate-x-1">
              <span className="font-semibold text-gray-100 block">Email:</span>
              <a
                href="mailto:ravindra906080@gmail.com"
                className="text-teal-400 hover:text-teal-300 transition-colors duration-300"
                aria-label="Email Ravindra Kumar"
              >
                ravindra906080@gmail.com
              </a>
            </p>
            <p className="group transition-transform duration-300 ease-in-out hover:translate-x-1">
              <span className="font-semibold text-gray-100 block">Phone:</span>
              <a
                href="tel:+919060804572"
                className="text-teal-400 hover:text-teal-300 transition-colors duration-300"
                aria-label="Call +91 90608 04572"
              >
                +91 90608 04572
              </a>
              ,{' '}
              <a
                href="tel:+919304912554"
                className="text-teal-400 hover:text-teal-300 transition-colors duration-300"
                aria-label="Call +91 93049 12554"
              >
                +91 93049 12554
              </a>
            </p>
            <p className="group transition-transform duration-300 ease-in-out hover:translate-x-1">
              <span className="font-semibold text-gray-100 block">Address:</span>
              0, Basobar Road, Hanuman Mandir, DARU, Basobar, Hazaribag, Jharkhand-825313
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-teal-400 font-bold text-xl mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-16 after:h-1 after:bg-teal-400 after:transition-all after:duration-300 hover:after:w-24">
            Follow Us
          </h3>
          <div className="flex space-x-6">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-teal-400 transition-all duration-300 transform hover:scale-125 focus:scale-125"
                aria-label={`Follow us on ${link.name}`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="pt-2 text-center text-sm text-gray-400 tracking-wide transition-opacity duration-500 hover:opacity-90">
        &copy; {new Date().getFullYear()} <a href="https://www.legalpapersindia.com/" target='_blank'>Legal Papers India</a>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;