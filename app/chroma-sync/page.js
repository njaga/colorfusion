import React from 'react';
import ChromaSync from '@/components/ChromaSync';

const ChromaSyncPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex-grow">
        <ChromaSync />
      </div>
    </div>
  );
};

export default ChromaSyncPage;
