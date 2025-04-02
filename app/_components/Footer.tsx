'use client';

import { Instagram, Linkedin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-8">
        {/* Left Section */}
        <p className="text-gray-600 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Conquer Codes. All rights reserved.
        </p>

        {/* Right Section */}
        <div className="flex gap-6">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/conquer-codes/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition duration-200"
          >
            <Linkedin size={24} />
          </a>

          {/* Instagram */}
         

          {/* Company Website */}
          <a
            href="https://conquercodes.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition duration-200"
          >
            <Globe size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
