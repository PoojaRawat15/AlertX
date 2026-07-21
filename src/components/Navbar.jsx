import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-6">

      <h1 className="text-3xl font-bold">
        <span className="text-red-500">Alert</span>
        <span className="text-blue-500">X</span>
      </h1>

      <div className="flex items-center gap-8 text-lg">

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

    </nav>
  );
}

export default Navbar;