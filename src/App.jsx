import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "./elements/Footer";
import Home from "./components/Home";
import AboutUs from "./components/About";
import ContactUs from "./components/Contact";
import ProductCategories from "./Product/ProductCategories";
import CategoryCollection from "./Product/Collection";
import ScrollToTop from "./elements/ScrollToTop";
import Header from "./elements/Header";

// Enhanced animation variants with more dynamic effects
const pageVariants = {
  fade: {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 200, scale: 0.95 },
    in: { opacity: 1, x: 0, scale: 1 },
    out: { opacity: 0, x: -200, scale: 0.95 },
  },
  slideRight: {
    initial: { opacity: 0, x: -200, scale: 0.95 },
    in: { opacity: 1, x: 0, scale: 1 },
    out: { opacity: 0, x: 200, scale: 0.95 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.85, y: 50 },
    in: { opacity: 1, scale: 1, y: 0 },
    out: { opacity: 0, scale: 1.15, y: -50 },
  },
  flip: {
    initial: { opacity: 0, rotateY: 90, scale: 0.9 },
    in: { opacity: 1, rotateY: 0, scale: 1 },
    out: { opacity: 0, rotateY: -90, scale: 0.9 },
  },
  // New "best" animation: Combines scale, opacity, rotation, and blur for a dynamic entrance
  dynamic: {
    initial: { opacity: 0, scale: 0.8, rotateX: 20, y: 100, filter: "blur(5px)" },
    in: { opacity: 1, scale: 1, rotateX: 0, y: 0, filter: "blur(0px)" },
    out: { opacity: 0, scale: 0.8, rotateX: -20, y: -100, filter: "blur(5px)" },
  },
};

// Transition settings with spring physics for smoother, natural motion
const pageTransition = {
  fade: { duration: 0.5, ease: "easeInOut" },
  slideLeft: { type: "spring", stiffness: 100, damping: 20 },
  slideRight: { type: "spring", stiffness: 100, damping: 20 },
  scale: { duration: 0.7, ease: "easeInOut" },
  flip: { type: "spring", stiffness: 120, damping: 15 },
  dynamic: { type: "spring", stiffness: 150, damping: 20, duration: 0.8 },
};

// Map routes to specific transition types
const routeTransitions = {
  "/": "dynamic", // Use the "best" animation for the homepage
  "/about": "slideLeft",
  "/contact": "slideRight",
  "/products": "scale",
  "/products/:category": "flip",
};

// Staggered animation for child elements within a page
const containerVariants = {
  initial: { transition: { staggerChildren: 0.1 } },
  in: { transition: { staggerChildren: 0.1 } },
  out: { transition: { staggerChildren: 0.1 } },
};

const childVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

// Inner component that uses useLocation
function AppContent() {
  const location = useLocation();
  // Select transition type based on the current route
  const transitionType = routeTransitions[location.pathname] || "fade";

  return (
    <>
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants[transitionType]}
                transition={pageTransition[transitionType]}
                className="relative"
              >
                <motion.div variants={containerVariants} initial="initial" animate="in" exit="out">
                  <Home />
                </motion.div>
              </motion.div>
            }
          />
          <Route
            path="/about"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants[transitionType]}
                transition={pageTransition[transitionType]}
                className="relative"
              >
                <motion.div variants={containerVariants} initial="initial" animate="in" exit="out">
                  <AboutUs />
                </motion.div>
              </motion.div>
            }
          />
          <Route
            path="/contact"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants[transitionType]}
                transition={pageTransition[transitionType]}
                className="relative"
              >
                <motion.div variants={containerVariants} initial="initial" animate="in" exit="out">
                  <ContactUs />
                </motion.div>
              </motion.div>
            }
          />
          <Route
            path="/products"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants[transitionType]}
                transition={pageTransition[transitionType]}
                className="relative"
              >
                <motion.div variants={containerVariants} initial="initial" animate="in" exit="out">
                  <ProductCategories />
                </motion.div>
              </motion.div>
            }
          />
          <Route
            path="/products/:category"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants[transitionType]}
                transition={pageTransition[transitionType]}
                className="relative"
              >
                <motion.div variants={containerVariants} initial="initial" animate="in" exit="out">
                  <CategoryCollection />
                </motion.div>
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;