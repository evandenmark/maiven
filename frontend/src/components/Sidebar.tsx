import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <nav className="space-y-4">
        <Link to="/users" className="block hover:bg-gray-700 p-2 rounded">
          Users
        </Link>
        <Link to="/messages" className="block hover:bg-gray-700 p-2 rounded">
          Messages
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
