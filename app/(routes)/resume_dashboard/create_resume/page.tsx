'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ResumeFinal from '@/ResumeWebsite/pages/ResumeFinal';





export default function CreateResume() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div>
      {/* {id === '1' && <Resume1 />}
      {id === '2' && <Resume2 />}
      {!['1', '2'].includes(id ?? '') && (
        <p className="text-center text-gray-500 mt-4">Invalid template selected.</p>
      )} */}
     <ResumeFinal id={id ?? ''} />

    </div>
  );
}
