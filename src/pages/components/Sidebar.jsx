import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Activity,
  X,
} from "lucide-react";

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      description: "Overview & stats",
    },
    {
      id: "patients",
      label: "Patients",
      path: "/patients",
      icon: Users,
      description: "Manage patient data",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <div
        className={`
          fixed top-0 left-0 z-50 h-full w-72 transform bg-gradient-to-b from-white via-gray-50 to-gray-100 shadow-2xl border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:z-auto
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white/70 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">MedRecords</h1>
              <p className="text-sm text-gray-500">Medical Management</p>
            </div>
          </div>

          {/* Close Button (Mobile only) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-600 hover:text-red-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-5 overflow-y-auto">
          <div className="space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  to={item.path}
                  key={item.id}
                  onClick={() => setIsOpen(false)}
                  className={`group w-full flex items-start gap-3 px-4 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer border
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700"
                        : "bg-white/70 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }
                  `}
                >
                  <Icon
                    className={`w-5 h-5 mt-1 transition-colors duration-200
                      ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-indigo-500"}
                    `}
                  />
                  <div className="text-left">
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Section */}
        <div className="p-5 border-t border-gray-200 bg-white/70 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-medium text-sm">
                  {user?.name?.charAt(0)}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-100 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;