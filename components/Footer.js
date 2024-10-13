// components/Footer.js
import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 py-6 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} ColorFusion. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="mailto:contact@ndiagandiaye.com" className="hover:text-yellow-500 transition-colors duration-300">
              <Mail size={20} />
            </a>
            <a href="https://ndiagandiaye.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors duration-300">
              <Globe size={20} />
            </a>
            <a href="https://github.com/njaga" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors duration-300">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/ndiagandiaye" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors duration-300">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;