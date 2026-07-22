import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-10 py-6 bg-black text-white">
        {/* Logo */}
        <h1 className="text-3xl font-bold">
          <span className="text-red-500">Alert</span>
          <span className="text-blue-500">X</span>
        </h1>

        {/* Laptop Menu */}
        <div className="hidden md:flex items-center gap-8 text-lg">
          <a href="#home" className="hover:text-red-500 transition">
            Home
          </a>

          <a href="#features" className="hover:text-red-500 transition">
            Features
          </a>

          <a href="#about" className="hover:text-red-500 transition">
            About
          </a>

          <a href="#contact" className="hover:text-red-500 transition">
            Contact
          </a>

          <Link
            to="/login"
            className="border border-blue-500 text-blue-400 px-5 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-5 py-5 bg-black text-white">
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>

          <a href="#features" onClick={() => setMenuOpen(false)}>
            Features
          </a>

          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>

          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="border border-blue-500 text-blue-400 px-5 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
}

export default Navbar;