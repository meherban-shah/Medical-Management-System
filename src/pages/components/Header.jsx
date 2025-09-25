import React from "react";
import { Menu } from "lucide-react";

function Header({ setIsOpen }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow px-4 py-3 md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-600 dark:text-gray-200 focus:outline-none"
      >
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
}

export default Header;
