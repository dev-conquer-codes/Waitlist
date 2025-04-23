'use client';

import { Mail } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <div>
      <header className="flex items-center justify-center py-4 mt-4">
        <div className="flex items-center gap-2 absolute left-8">
          <Image
            className="w-8 h-8"
            src="https://conquercodes.com/images/logo.png"
            alt="Conquer Codes Logo"
            width={32}
            height={32}
          />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-xl text-gray-800">Conquer Jobs</span>
            <span className="text-[10px] text-center text-gray-500">A part of Conquer Codes</span>
          </div>
        </div>

        <div className="absolute right-8 flex items-center gap-2">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <a
              href="mailto:sonuiitian@conquercodes.com"
              className="text-gray-600 hover:text-gray-800 text-base transition duration-200 border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:shadow-md hidden sm:block"
            >
              sonukhairwal@conquercodes.in
            </a>
            <a
              href="mailto:sonuiitian@conquercodes.com"
              className="sm:hidden block p-2 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition duration-200"
            >
              <Mail className="w-6 h-6 text-gray-600" />
            </a>
          </SignedOut>
        </div>
      </header>
    </div>
  );
}
