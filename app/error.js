'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'

export default function Error({ error, reset }) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    console.error(error)
  }, [error])

  const handleReset = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
      reset()
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white px-4 text-center">
      <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mb-4 sm:mb-6 animate-bounce" />
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Oups ! Quelque chose s'est mal passé</h2>
      <p className="text-lg sm:text-xl mb-6 sm:mb-8">Ne vous inquiétez pas, nous sommes dessus !</p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center transition-all duration-300 ${
            isAnimating ? 'animate-spin' : ''
          }`}
          onClick={handleReset}
        >
          <RefreshCw className="mr-2" />
          Réessayer
        </button>
        <Link href="/" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center transition-all duration-300">
          <Home className="mr-2" />
          Accueil
        </Link>
      </div>
    </div>
  )
}
