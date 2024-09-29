'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-white font-bold">
          My App
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </div>
      {isOpen && (
        <div className="mt-4">
          <Link href="/" className="block text-white py-2">
            Home
          </Link>
          <Link href="/about" className="block text-white py-2">
            About Us
          </Link>
        </div>
      )}
    </nav>
  );
}