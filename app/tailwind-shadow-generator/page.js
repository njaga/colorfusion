"use client";

import React from 'react';
import TailwindShadowGenerator from '../../components/TailwindShadowGenerator';

export default function TailwindShadowGeneratorPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      <main className="flex-grow p-4 sm:p-8">
        <div className="max-w-4xl mx-auto w-full">
          <TailwindShadowGenerator />
        </div>
      </main>
    </div>
  );
}