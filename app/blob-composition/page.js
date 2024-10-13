"use client";

import React from 'react';
import BlobComposition from '@/components/BlobComposition';

const BlobCompositionPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex-grow">
        <BlobComposition />
      </div>
    </div>
  );
};

export default BlobCompositionPage;