"use client";

import React from 'react';
import TailwindGradientGenerator from '@/components/TailwindGradientGenerator';

const TailwindGradientGeneratorPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex-grow">
        <TailwindGradientGenerator />
      </div>
    </div>
  );
};

export default TailwindGradientGeneratorPage;
