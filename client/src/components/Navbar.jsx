import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-2' : 'bg-black/30 backdrop-blur-lg py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={assets.logo}
              alt="logo"
              className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            {user ? (
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-8 h-8',
                    userButtonPopoverCard: 'bg-gray-900 border border-gray-800',
                  }
                }}
              />
            ) : (
              <button 
                onClick={openSignIn} 
                className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Get started <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="md:hidden">
            {user ? (
              <UserButton />
            ) : (
              <button 
                onClick={openSignIn} 
                className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 transition-all duration-200"
              >
                Get started <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
