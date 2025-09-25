import React, { useState } from "react";
import Sidebar from "../pages/components/Sidebar";
import Header from "../pages/components/Header";

function Authlayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header (mobile only) */}
        <Header setIsOpen={setIsOpen} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="max-w-full overflow-hidden">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default Authlayout;
