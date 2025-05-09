'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function HomePage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleClick = () => {
    toast("Redirecting to resume dashboard...");
    router.push("/resume_dashboard");
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

        {isHydrated && (
          <div className="mt-12 flex flex-col items-center">
            <Button
              variant="default"
              onClick={handleClick}
              className="bg-[#2297F4] text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 h-12 flex items-center justify-center text-lg font-semibold"
            >
              Build your free resume
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
