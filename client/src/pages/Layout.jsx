import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useUser, SignIn } from "@clerk/clerk-react";

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <SignIn />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.25),_transparent_55%)]" />

      <div className="relative z-10 flex flex-col h-screen">
        <nav className="w-full px-6 sm:px-10 py-4 flex items-center justify-between border-b border-white/10 bg-black/60 backdrop-blur-xl">
          <img
            src={assets.logo}
            alt="Logo"
            onClick={() => navigate("/")}
            className="cursor-pointer w-28 sm:w-40 hover:opacity-80 transition"
          />
          <button
            onClick={() => setSidebar((prev) => !prev)}
            className="sm:hidden text-white/80 hover:text-white transition"
          >
            {sidebar ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        <div className="flex-1 w-full flex h-[calc(100vh-72px)]">
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto bg-gradient-to-b from-black/70 via-gray-900/60 to-black/80">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
