"use client";

import React from 'react';
import CSSBackgroundPatterns from '@/components/CSSBackgroundPatterns';

const CSSBackgroundPatternsPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex-grow">
        <CSSBackgroundPatterns />
      </div>
    </div>
  );
};

export default CSSBackgroundPatternsPage;