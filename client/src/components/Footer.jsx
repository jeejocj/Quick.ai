import React from "react";
import { Mail } from "lucide-react";
import { assets } from "../assets/assets";

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log("Newsletter subscription submitted");
  };

  return (
    <footer>
      {/* Main content section */}
      <div className="max-w-7xl mx-auto px-6 py-14 bg-white rounded-t-3xl">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Left section */}
          <div>
            <div className="flex items-center space-x-2">
              <img src={assets.logo} alt="Quickai Logo" />
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-500">
              Experience the power of AI with Quickai. Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.
            </p>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">About us</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact us</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />
      </div>

      {/* Copyright section at the very bottom */}
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-sm text-gray-400">
            © 2025 Quickai. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;