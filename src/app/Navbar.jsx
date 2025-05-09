"use client";
import Image from "next/image";
import { useState } from "react";
import { FaUser, FaPlus, FaArrowLeft, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import logo from "./img.png";

export default function Navbar({ activeComponent, setActiveComponent }) {
  const router = useRouter();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Log out the user
      router.push("/sign-in"); // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true); // Show confirmation dialog
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false); // Hide confirmation dialog
  };

  if (activeComponent === "feed") {
    return (
      <>
        <nav className="fixed top-0 left-0 right-0 bg-[#E0EAF6] shadow-sm z-[1000] flex justify-between items-center px-4 py-0 border-b border-grey-600">
          <div className="flex items-center ml-[-20px]">
            <Image
              src={logo}
              width={90}
              height={70}
              alt="KommUnity Logo"
            />
            <span className="text-xl font-bold text-[#323030] font-inter ml-[-10px]">
              KommUnity
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveComponent("search")}
              aria-label="Search"
              className="text-gray-600 hover:text-blue-500"
            >
              <FaSearch size={20} />
            </button>
            <button
              onClick={() => setActiveComponent("profile")}
              aria-label="Profile"
              className="text-gray-600 hover:text-blue-500"
            >
              <FaUser size={20} />
            </button>
            <button
              onClick={handleLogoutClick}
              aria-label="Logout"
              className="text-gray-600 hover:text-red-500"
            >
              <FaSignOutAlt size={20} />
            </button>
          </div>
        </nav>

        {/* Horizontal Line */}
        <hr className="fixed top-[70px] left-0 right-0 border-t border-gray-300 z-[900]" />

        {/* Floating Create Post Button */}
        <button
          onClick={() => setActiveComponent("createPost")}
          aria-label="Create Post"
          className="fixed bottom-4 right-4 bg-gradient-to-r from-orange-400 to-red-500 text-white p-5 rounded-full shadow-lg z-[1100] hover:shadow-xl transition-all"
        >
          <FaPlus size={25} />
        </button>

        {/* Logout Confirmation Dialog */}
        {showLogoutConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1200]">
            <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md">
              <p className="text-gray-800 text-lg font-semibold mb-4">
                Are you sure you want to Log out?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={cancelLogout}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Render back button for other components
  if (activeComponent === "search" || "createPost") {
    return (
      <>
        <button
          onClick={() => setActiveComponent("feed")}
          className="fixed top-6 left-4 bg-gradient-to-r from-orange-400 to-red-500 text-white p-3 rounded-full shadow-lg z-[1100] hover:shadow-xl transition-all"
          aria-label="Back"
        >
          <FaArrowLeft size={24} />
        </button>
      </>
    );
  }

  return null;
}


