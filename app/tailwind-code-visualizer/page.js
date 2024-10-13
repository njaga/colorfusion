"use client"; // Ajoutez cette ligne si vous utilisez App Router

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check, Code2 } from "lucide-react";

const TailwindCodeVisualizer = () => {
  const [code, setCode] = useState(`<div
  class="flex flex-col bg-gray-800 text-white items-center justify-center p-8 pb-12 xl:px-64 xl:py-16">
  <img class="w-16" src="https://wasoe.org/wp-content/uploads/2024/10/ONG-WASOE-1024x1024.png" alt="Icon" />
  <div
    class="flex flex-col items-center justify-center relative z-10 text-center">
    <h1
      class="text-4xl md:text-6xl font-bold leading-tight mb-4">Tailwind
      Code Visualizer</h1>
    <p class="text-lg md:text-xl mb-6">Easily visualize your
      Tailwind source code in a graphical editor.</p>
    <a
      class="bg-white text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300 transition duration-300">Learn
      More</a>
  </div>
</div>`);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, 'text/html');
      if (doc.body.firstChild) {
        setError(null);
      } else {
        setError('The code does not generate any valid HTML elements.');
      }
    } catch (e) {
      setError('Error parsing HTML code.');
    }
  }, [code]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center justify-center mb-12"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Code2 className="w-16 h-16 text-gray-800 mr-4" />
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-800">
            Tailwind Code Visualizer
          </h1>
        </motion.div>

        <motion.p
          className="text-xl text-center text-gray-600 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Instantly transform your Tailwind code into visual designs
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div 
            className="space-y-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Label htmlFor="code-input" className="text-lg font-semibold">Enter your Tailwind CSS code here:</Label>
            <Textarea
              id="code-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-96 font-mono text-gray-800 bg-gray-100 rounded-lg shadow-inner"
              placeholder="Enter your HTML code with Tailwind classes here..."
            />
            <Button onClick={copyToClipboard} className="w-full justify-center bg-gray-800 hover:bg-gray-700 transition-colors duration-300">
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy code'}
            </Button>
          </motion.div>

          <motion.div 
            className="space-y-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Label className="text-lg font-semibold">Preview:</Label>
            <div className="bg-gray-100 p-4 rounded-lg overflow-auto h-96 shadow-xl">
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: code }} />
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TailwindCodeVisualizer;
