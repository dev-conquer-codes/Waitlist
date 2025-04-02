'use client';

import { Briefcase, FileText, ClipboardList, Mic } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: "Resume Building",
      description: "Craft a professional resume with ease using our AI-powered builder.",
      icon: <FileText size={32} className="text-blue-600" />,
    },
    {
      title: "Job Search",
      description: "Discover top opportunities tailored to your skills and preferences.",
      icon: <Briefcase size={32} className="text-blue-600" />,
    },
    {
      title: "Application Management",
      description: "Track and manage your job applications in one place.",
      icon: <ClipboardList size={32} className="text-blue-600" />,
    },
    {
      title: "Mock Interviews",
      description: "Practice with AI-powered mock interviews and get instant feedback.",
      icon: <Mic size={32} className="text-blue-600" />,
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800">What We Offer</h2>
        <p className="text-gray-500 mt-2 text-lg">
          Empowering you with the tools to succeed in your job search.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
