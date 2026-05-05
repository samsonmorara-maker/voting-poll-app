import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-blue-500 text-white p-4 mb-6">
        <h1 className="text-2xl font-bold">Voting Poll App</h1>
        <a href="/" className="text-white hover:text-gray-300 p-4">
          Home
        </a>
        <a href="/about" className="text-white hover:text-gray-300 p-4">
          About Us
        </a>
      </nav>
    </div>
  );
};

export default Navbar;