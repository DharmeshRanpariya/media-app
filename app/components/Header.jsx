"use client";

import { useState } from "react";
import { Menu, X, Search, User, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = ["Man", "Woman", "Children"];

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* ✅ Logo */}
        <div className="text-2xl font-bold text-blue-600 cursor-pointer">
          <Link href="/">MyLogo</Link>
        </div>

        {/* ✅ Search */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1 w-1/2">
          <Search size={18} className="text-black" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 w-full"
          />
        </div>

        {/* ✅ Category Dropdown + Account */}
        <div className="hidden md:flex items-center gap-4 relative">
          {/* ✅ Category Dropdown Button */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full border hover:bg-gray-200 cursor-pointer"
          >
            <span className="font-medium text-gray-700">Category</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* ✅ Dropdown Items */}
          {dropdownOpen && (
            <div className="absolute right-20 top-12 bg-white border rounded-lg shadow-lg py-2 w-40">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {/* ✅ Account Icon */}
          <div className="p-2 bg-gray-100 rounded-full border hover:bg-gray-200 cursor-pointer">
            <User className="w-6 h-6 text-gray-700" />
          </div>
        </div>

        {/* ✅ Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ✅ Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4">
          {/* Mobile Search */}
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
            <Search size={18} className="text-black" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none px-2 w-full text-black placeholder-black"
            />
          </div>

          {/* Mobile Category Selector */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-between w-full bg-gray-100 px-4 py-2 rounded-lg text-black"
            >
              <span>Select Category</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="bg-white border rounded-lg shadow-lg mt-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setDropdownOpen(false)}
                    className="w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ✅ Mobile Account Button */}
          <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
            <User className="w-6 h-6 text-black" />
            <span className="text-black">My Account</span>
          </button>
        </div>
      )}
    </header>
  );
}
