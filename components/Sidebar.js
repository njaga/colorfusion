"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Palette, Droplet, Layers, Grid, Zap, Square, LayoutGrid, Table, Code } from 'lucide-react';

const SidebarItem = ({ href, icon: Icon, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`flex items-center p-2 rounded-lg ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
      <Icon className="w-6 h-6 mr-2" />
      <span>{children}</span>
    </Link>
  );
};

const Sidebar = () => {
  const [isFixed, setIsFixed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Liste des chemins où la sidebar doit apparaître
  const visiblePaths = [
    '/trend-palette-generator',
    '/chroma-sync',
    '/tailwind-gradient-generator',
    '/css-background-patterns',
    '/blob-composition',
    '/tailwind-shadow-generator',
    '/tailwind-grid-generator',
    '/tailwind-table-generator',
    '/tailwind-code-visualizer',
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const checkScroll = () => {
      if (isMobile) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const sidebarElement = document.querySelector('.sidebar');
      const sidebarHeight = sidebarElement ? sidebarElement.offsetHeight : 0;
      
      const isAtBottom = scrollTop + windowHeight >= documentHeight - 1;
      setIsFixed(!isAtBottom);
    };

    checkScreenSize();
    checkScroll();

    window.addEventListener('resize', checkScreenSize);
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [isMobile]);

  // Vérifier si la sidebar doit être affichée
  if (!visiblePaths.includes(pathname) || isMobile) {
    return null;
  }

  return (
    <div className={`sidebar w-64 bg-white shadow-[2px_0px_6px_-6px_#00000033] z-20 overflow-y-auto transition-all duration-300 ${
      isFixed ? 'fixed inset-y-0 left-0' : 'absolute bottom-0 left-0'
    } md:sticky md:top-16 md:h-[calc(100vh-4rem)] hidden md:block`}>
      <div className="p-4 space-y-4">
        <SidebarItem href="/trend-palette-generator" icon={Palette}>Palette Generator</SidebarItem>
        <SidebarItem href="/chroma-sync" icon={Droplet}>Color Converter</SidebarItem>
        <SidebarItem href="/tailwind-gradient-generator" icon={Layers}>Tailwind Gradient</SidebarItem>
        <SidebarItem href="/css-background-patterns" icon={Grid}>Background Patterns</SidebarItem>
        <SidebarItem href="/blob-composition" icon={Zap}>Blob Composition</SidebarItem>
        <SidebarItem href="/tailwind-shadow-generator" icon={Square}>Shadow Generator</SidebarItem>
        <SidebarItem href="/tailwind-grid-generator" icon={LayoutGrid}>Grid Generator</SidebarItem>
        <SidebarItem href="/tailwind-table-generator" icon={Table}>Table Generator</SidebarItem>
        <SidebarItem href="/tailwind-code-visualizer" icon={Code}>Code Visualizer</SidebarItem>
      </div>
    </div>
  );
};

export default Sidebar;
