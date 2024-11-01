import { Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <nav className="space-y-4">
        <Stack>
        <Link to="/users" className="block hover:bg-gray-700 p-2 rounded">
          Users
        </Link>
        <Link to="/messages" className="block hover:bg-gray-700 p-2 rounded">
          Messages
        </Link>
        </Stack>
      </nav>
    </div>
  );
};

export default Sidebar;
