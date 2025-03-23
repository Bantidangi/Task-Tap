import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 py-4 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-700">
          <a href="/">TaskTap</a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="hover:text-blue-600">
            How It Works
          </a>
          <a href="#why-choose" className="hover:text-blue-600">
            Why TaskTap
          </a>
          <a href="#testimonials" className="hover:text-blue-600">
            Testimonials
          </a>
          <a href="#jobs" className="hover:text-blue-600">
            Jobs
          </a>
          <a href="/signup">
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg">
              Sign Up
            </button>
          </a>
          <a href="/signin">
            <button className="border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-4 py-2 rounded-lg">
              Sign In
            </button>
          </a>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-blue-700 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2 rounded-lg px-4 py-2">
          <a
            href="#how-it-works"
            className="block py-2 hover:text-blue-600"
            onClick={toggleMenu}>
            How It Works
          </a>
          <a
            href="#why-choose"
            className="block py-2 hover:text-blue-600"
            onClick={toggleMenu}>
            Why TaskTap
          </a>
          <a
            href="#testimonials"
            className="block py-2 hover:text-blue-600"
            onClick={toggleMenu}>
            Testimonials
          </a>
          <a
            href="#jobs"
            className="block py-2 hover:text-blue-600"
            onClick={toggleMenu}>
            Jobs
          </a>
          <button
            className="block w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg mt-2"
            onClick={toggleMenu}>
            Post a Job
          </button>
          <button
            className="block w-full border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-4 py-2 rounded-lg mt-2"
            onClick={toggleMenu}>
            Find a Job
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
