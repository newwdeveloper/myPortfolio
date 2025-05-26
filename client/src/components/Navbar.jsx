import React, { useState } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navVarient = {
    hidden: { y: -100 },
    visible: { y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      variants={navVarient}
      initial="hidden"
      animate="visible"
      className="bg-blue-600 text-white p-4 sticky top-0 z-20 shadow-lg"
    >
      <div className="container mx-auto relative flex items-center justify-center md:justify-between px-4">
        {/* Logo - center on mobile, left on desktop */}
        <Link to="/" className="text-2xl font-bold">
          My Portfolio
        </Link>

        {/* Hamburger icon (mobile only) */}
        <button
          onClick={toggleMenu}
          className="absolute right-0 md:hidden focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-200 transition-colors">
            Home
          </Link>
          <Link
            to="/projects"
            className="hover:text-gray-200 transition-colors"
          >
            Projects
          </Link>
          <Link to="/contact" className="hover:text-gray-200 transition-colors">
            Contact
          </Link>
          <Link to="/login" className="hover:text-gray-200 transition-colors">
            Admin
          </Link>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4">
          <Link
            to="/"
            className="block hover:text-gray-200"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/projects"
            className="block hover:text-gray-200"
            onClick={toggleMenu}
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className="block hover:text-gray-200"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="block hover:text-gray-200"
            onClick={toggleMenu}
          >
            Admin
          </Link>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
