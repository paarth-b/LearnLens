'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-10">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* App Name */}
        <Link href="/" className="text-white font-bold text-lg">
          My App
        </Link>

        {/* Toggle Button for Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
          aria-label="Menu Button"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Menu Items (only show when open) */}
      {isOpen && (
        <div className="mt-4 bg-gray-700 text-center">
          <Link href="/" className="block text-white py-2 hover:bg-gray-600">
            Home
          </Link>
          <Link href="/about" className="block text-white py-2 hover:bg-gray-600">
            About Us
          </Link>
        </div>
      )}
    </nav>
  );
}
