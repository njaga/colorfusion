'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, Home } from 'lucide-react'

export default function NotFound() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <Search 
        className={`w-24 h-24 text-yellow-400 mb-8 transition-all duration-300 ${
          isHovering ? 'rotate-12 scale-110' : ''
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link 
        href="/" 
        className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-bold py-3 px-6 rounded-full flex items-center transition-all duration-300 transform hover:scale-105"
      >
        <Home className="mr-2" />
        Back to Home
      </Link>
    </div>
  )
}