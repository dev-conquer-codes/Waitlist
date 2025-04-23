'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const sampleTemplates = [
  {
    id: '1',
    imageUrl: 'https://res.cloudinary.com/dzonq5wlk/image/upload/v1745312492/John_Doe_resume_5__page-0001_hnm6ra.jpg',
  },
  {
    id: '2',
    imageUrl: 'https://res.cloudinary.com/dzonq5wlk/image/upload/v1745312484/John_Doe_resume_4__page-0001_vp7jar.jpg',
  },
];

export default function TemplateSelector() {
  const router = useRouter();
  const pathname = usePathname();

  const handleTemplateClick = (templateId: string) => {
    router.push(`${pathname}/create_resume?id=${templateId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Select Template</h2>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        {sampleTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleTemplateClick(template.id)}
            className="cursor-pointer transition hover:scale-105 duration-200"
          >
            <Image
              src={template.imageUrl}
              alt={`Template ${template.id}`}
              width={250}
              height={350}
              className="rounded-lg shadow-md object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
