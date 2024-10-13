"use client";

import React from 'react';
import TailwindGridGenerator from '../../components/TailwindGridGenerator';
import Sidebar from '../../components/Sidebar';

export default function TailwindGridGeneratorPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      <main className="flex-grow p-4 sm:p-8">
        <div className="max-w-6xl mx-auto w-full">
          <TailwindGridGenerator />
        </div>
      </main>
    </div>
  );
}