"use client";

import React from 'react';
import TrendPaletteGenerator from '@/components/TrendPaletteGenerator';

const TrendPaletteGeneratorPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex-grow">
        <TrendPaletteGenerator />
      </div>
    </div>
  );
};

export default TrendPaletteGeneratorPage;

