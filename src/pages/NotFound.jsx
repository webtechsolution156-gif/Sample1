// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Oops! Page not found.</p>
      <Link
        to="/"
        className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2"
      >
        Go Home
      </Link>
    </div>
  );
}