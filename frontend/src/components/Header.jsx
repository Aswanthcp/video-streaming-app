// Header.js
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="p-2 border rounded-md"
        />
      </div>
      <div className="space-x-4">
        <button className="px-4 py-2 bg-gray-200 rounded-md">Sign In</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;
