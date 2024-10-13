"use client";

import React from 'react';
import Sidebar from '@/components/Sidebar';
import About from '@/components/About';

const AboutPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="flex-grow p-8">
        <About />
      </div>
    </div>
  );
};

export default AboutPage;