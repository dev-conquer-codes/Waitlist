'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ResumeFinal from '@/ResumeWebsite/pages/ResumeFinal';

function CreateResumeContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return <ResumeFinal id={id ?? ''} />;
}

export default function CreateResume() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CreateResumeContent />
      </Suspense>
    </div>
  );
}
