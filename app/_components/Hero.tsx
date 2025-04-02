'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isValidEmail = (email: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleJoinWaitlist = async () => {
    if (!email.trim()) {
      toast("Email field cannot be empty.");
      return;
    }

    if (!isValidEmail(email)) {
      toast("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_RENDER}/user/add_user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        toast("You have successfully joined the waitlist!");
        setEmail(""); // Clear the input field on success
      } else {
        throw new Error(data?.message || "Something went wrong.");
      }
    } catch (error: any) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#F0F4F8] to-[#f1f4f7] px-8">
      <header className="flex items-center justify-center py-4 mt-4">
        <div className="flex items-center gap-2 absolute left-8">
          <Image className="w-8 h-8" src="https://conquercodes.com/images/logo.png" alt="Conquer Codes Logo" width={32} height={32} />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-xl text-gray-800">Conquer Jobs</span>
            <span className="text-[10px] text-center text-gray-500">A part of Conquer Codes</span>
          </div>
        </div>
        <div className="absolute right-8">
          <a href="mailto:sonuiitian@conquercodes.com" className="text-gray-600 hover:text-gray-800 text-base transition duration-200 border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:shadow-md hidden sm:block">
            sonukhairwal@conquercodes.in
          </a>
          <a href="mailto:sonuiitian@conquercodes.com" className="sm:hidden block p-2 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition duration-200">
            <Mail className="w-6 h-6 text-gray-600" />
          </a>
        </div>
      </header>

      <div className="mt-4 h-[1px] bg-gray-300" />

      <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-8">
        <h1 className="text-5xl font-extrabold text-gray-800">The Future of Job Searching</h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">
          Personalized Job Listings, AI-Generated Resumes and <br /> Mock AI Interviews in One Platform
        </p>

        {/* Skeleton loader while hydrating */}
        {!isHydrated ? (
          <div className="mt-8 w-full max-w-md flex flex-col sm:flex-row justify-center gap-4">
            <div className="w-full h-12 bg-gray-300 animate-pulse rounded-lg" />
            <div className="w-full sm:w-auto h-12 bg-gray-300 animate-pulse rounded-lg" />
          </div>
        ) : (
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-gray-700 h-12"
            />
            <div className="w-full sm:w-auto flex justify-center">
              <Button
                variant="default"
                onClick={handleJoinWaitlist}
                className="bg-[#2297F4] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 h-12 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Join Waitlist"}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
