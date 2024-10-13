'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Copy, Download, ArrowLeft, Search, Check, ChevronDown, ChevronUp, Shapes, Globe, Linkedin, Github, Layers, Grid} from "lucide-react";
import { motion } from "framer-motion";
import Link from 'next/link';
import html2canvas from 'html2canvas';
import { Command } from "cmdk";
import { createGIF } from 'gifshot';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const patterns = [
  {
    name: "Geometric Maze",
    generateCSS: (backColor, frontColor, opacity, spacing) => ({
      backgroundColor: backColor,
      backgroundImage: `linear-gradient(${frontColor}${Math.round(opacity * 255).toString(16)} 2px, transparent 2px), linear-gradient(90deg, ${frontColor}${Math.round(opacity * 255).toString(16)} 2px, transparent 2px), linear-gradient(${frontColor}${Math.round(opacity * 255).toString(16)} 1px, transparent 1px), linear-gradient(90deg, ${frontColor}${Math.round(opacity * 255).toString(16)} 1px, ${backColor} 1px)`,
      backgroundSize: `${spacing * 2}px ${spacing * 2}px, ${spacing * 2}px ${spacing * 2}px, ${spacing}px ${spacing}px, ${spacing}px ${spacing}px`,
      backgroundPosition: `-2px -2px, -2px -2px, -1px -1px, -1px -1px`
    })
  },
  {
    name: "Futuristic Hexagons",
    generateCSS: (backColor, frontColor, opacity, spacing) => ({
      backgroundColor: backColor,
      backgroundImage: `linear-gradient(60deg, ${frontColor}${Math.round(opacity * 255).toString(16)} 25%, transparent 25%, transparent 75%, ${frontColor}${Math.round(opacity * 255).toString(16)} 75%, ${frontColor}${Math.round(opacity * 255).toString(16)}), linear-gradient(120deg, ${frontColor}${Math.round(opacity * 255).toString(16)} 25%, transparent 25%, transparent 75%, ${frontColor}${Math.round(opacity * 255).toString(16)} 75%, ${frontColor}${Math.round(opacity * 255).toString(16)})`,
      backgroundSize: `${spacing * 2}px ${spacing * 3.464}px`,
      backgroundPosition: `0 0, 0 ${spacing * 1.732}px`
    })
  },
  {
    name: "Neon Waves",
    generateCSS: (backColor, frontColor, opacity, spacing) => ({
      backgroundColor: backColor,
      backgroundImage: `radial-gradient(ellipse at 50% 50%, ${frontColor}${Math.round(opacity * 255).toString(16)} 0%, transparent 60%), radial-gradient(ellipse at 0% 100%, ${frontColor}${Math.round(opacity * 255).toString(16)} 0%, transparent 60%), radial-gradient(ellipse at 100% 0%, ${frontColor}${Math.round(opacity * 255).toString(16)} 0%, transparent 60%)`,
      backgroundSize: `${spacing * 4}px ${spacing * 4}px`,
      backgroundPosition: `0 0, 0 0, 0 0`
    })
  },
  {
    name: "Organic Tendrils",
    generateCSS: (backColor, frontColor, opacity, spacing) => ({
      backgroundColor: backColor,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${spacing * 2}' height='${spacing * 2}' viewBox='0 0 200 200'%3E%3Cpath fill='${encodeURIComponent(frontColor)}' fill-opacity='${opacity}' d='M0 0c40 80 100 80 100 0s60-80 100 0 60 80 0 100-100-20-100-100-60-80-100 0z'/%3E%3C/svg%3E")`,
      backgroundSize: `${spacing * 2}px ${spacing * 2}px`
    })
  },
  {
    name: "Retro Circuit",
    generateCSS: (backColor, frontColor, opacity, spacing) => ({
      backgroundColor: backColor,
      backgroundImage: `linear-gradient(${frontColor}${Math.round(opacity * 255).toString(16)} 1px, transparent 1px), linear-gradient(to right, ${frontColor}${Math.round(opacity * 255).toString(16)} 1px, ${backColor} 1px)`,
      backgroundSize: `${spacing}px ${spacing}px`,
      backgroundPosition: `${spacing / 2}px ${spacing / 2}px`,
      backgroundRepeat: 'repeat',
      maskImage: `radial-gradient(${frontColor}${Math.round(opacity * 255).toString(16)} 30%, transparent 30%), radial-gradient(${frontColor}${Math.round(opacity * 255).toString(16)} 30%, transparent 30%)`,
      maskSize: `${spacing * 2}px ${spacing * 2}px`,
      maskPosition: `0 0, ${spacing}px ${spacing}px`
    })
  },
  {
    name: "Dynamic Cubes",
    generateCSS: (backColor, frontColor, opacity, spacing) => ({
      backgroundColor: backColor,
      backgroundImage: `linear-gradient(30deg, ${frontColor}${Math.round(opacity * 255).toString(16)} 12%, transparent 12.5%, transparent 87%, ${frontColor}${Math.round(opacity * 255).toString(16)} 87.5%, ${frontColor}${Math.round(opacity * 255).toString(16)}), linear-gradient(150deg, ${frontColor}${Math.round(opacity * 255).toString(16)} 12%, transparent 12.5%, transparent 87%, ${frontColor}${Math.round(opacity * 255).toString(16)} 87.5%, ${frontColor}${Math.round(opacity * 255).toString(16)}), linear-gradient(30deg, ${frontColor}${Math.round(opacity * 255).toString(16)} 12%, transparent 12.5%, transparent 87%, ${frontColor}${Math.round(opacity * 255).toString(16)} 87.5%, ${frontColor}${Math.round(opacity * 255).toString(16)}), linear-gradient(150deg, ${frontColor}${Math.round(opacity * 255).toString(16)} 12%, transparent 12.5%, transparent 87%, ${frontColor}${Math.round(opacity * 255).toString(16)} 87.5%, ${frontColor}${Math.round(opacity * 255).toString(16)}), linear-gradient(60deg, ${frontColor}77 25%, transparent 25.5%, transparent 75%, ${frontColor}77 75%, ${frontColor}77), linear-gradient(60deg, ${frontColor}77 25%, transparent 25.5%, transparent 75%, ${frontColor}77 75%, ${frontColor}77)`,
      backgroundSize: `${spacing * 2}px ${spacing * 3.464}px`,
      backgroundPosition: `0 0, 0 0, ${spacing}px ${spacing * 1.732}px, ${spacing}px ${spacing * 1.732}px, 0 0, ${spacing}px ${spacing * 1.732}px`
    })
  },
  {
    name: "Abstract Mosaic",
    generateCSS: (backColor, frontColor, opacity, spacing) => ({
      backgroundColor: backColor,
      backgroundImage: `linear-gradient(45deg, ${frontColor}${Math.round(opacity * 255).toString(16)} 25%, transparent 25%, transparent 75%, ${frontColor}${Math.round(opacity * 255).toString(16)} 75%, ${frontColor}${Math.round(opacity * 255).toString(16)}), linear-gradient(-45deg, ${frontColor}${Math.round(opacity * 255).toString(16)} 25%, transparent 25%, transparent 75%, ${frontColor}${Math.round(opacity * 255).toString(16)} 75%, ${frontColor}${Math.round(opacity * 255).toString(16)})`,
      backgroundSize: `${spacing * 2}px ${spacing * 2}px`,
      backgroundPosition: `0 0, ${spacing}px ${spacing}px`
    })
  },
  {
    name: "Fluid Ripples",
    generateCSS: (backColor, frontColor, opacity, spacing) => ({
      backgroundColor: backColor,
      backgroundImage: `radial-gradient(circle at center center, ${frontColor}${Math.round(opacity * 255).toString(16)}, ${backColor}), repeating-radial-gradient(circle at center center, ${frontColor}${Math.round(opacity * 255).toString(16)}, ${frontColor}${Math.round(opacity * 255).toString(16)}, ${spacing / 2}px, transparent ${spacing / 2}px, transparent ${spacing}px)`,
      backgroundBlendMode: 'multiply'
    })
  },
  {
    name: "Digital Rain",
    generateCSS: (backColor, frontColor, opacity, spacing) => ({
      backgroundColor: backColor,
      backgroundImage: `linear-gradient(${frontColor}${Math.round(opacity * 255).toString(16)} 2px, transparent 2px), linear-gradient(90deg, ${frontColor}${Math.round(opacity * 255).toString(16)} 2px, transparent 2px), linear-gradient(${frontColor}${Math.round(opacity * 255).toString(16)} 1px, transparent 1px), linear-gradient(90deg, ${frontColor}${Math.round(opacity * 255).toString(16)} 1px, transparent 1px)`,
      backgroundSize: `${spacing * 2}px ${spacing * 2}px, ${spacing * 2}px ${spacing * 2}px, ${spacing}px ${spacing}px, ${spacing}px ${spacing}px`,
      backgroundPosition: `-2px -2px, -2px -2px, -1px -1px, -1px -1px`,
      animation: 'digitalRain 5s linear infinite'
    })
  },
  {
    name: "Crystalline Structure",
    generateCSS: (backColor, frontColor, opacity, spacing) => ({
      backgroundColor: backColor,
      backgroundImage: `linear-gradient(60deg, ${frontColor}${Math.round(opacity * 255).toString(16)} 25%, transparent 25%, transparent 75%, ${frontColor}${Math.round(opacity * 255).toString(16)} 75%, ${frontColor}${Math.round(opacity * 255).toString(16)}), linear-gradient(120deg, ${frontColor}${Math.round(opacity * 255).toString(16)} 25%, transparent 25%, transparent 75%, ${frontColor}${Math.round(opacity * 255).toString(16)} 75%, ${frontColor}${Math.round(opacity * 255).toString(16)})`,
      backgroundSize: `${spacing * 2}px ${spacing * 3.464}px`,
      backgroundPosition: `0 0, ${spacing}px 0`
    })
  },
];

const animations = [
  {
    name: "Slide",
    css: (spacing, duration) => `
      @keyframes slide {
        0% { background-position: 0 0; }
        100% { background-position: ${spacing * 2}px ${spacing * 2}px; }
      }
    `,
    style: (duration) => ({
      animation: `slide ${duration}s linear infinite`
    })
  },
  {
    name: "Rotate",
    css: (duration) => `
      @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `,
    style: (duration) => ({
      animation: `rotate ${duration}s linear infinite`
    })
  },
  {
    name: "Pulse",
    css: (duration) => `
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    `,
    style: (duration) => ({
      animation: `pulse ${duration}s ease-in-out infinite`
    })
  },
  {
    name: "Wave",
    css: (spacing, duration) => `
      @keyframes wave {
        0%, 100% { background-position: 0 0; }
        50% { background-position: ${spacing}px ${spacing / 2}px; }
      }
    `,
    style: (duration) => ({
      animation: `wave ${duration}s ease-in-out infinite`
    })
  },
  {
    name: "Fade",
    css: (duration) => `
      @keyframes fade {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `,
    style: (duration) => ({
      animation: `fade ${duration}s ease-in-out infinite`
    })
  }
];

const CSSBackgroundPatterns = () => {
  const [backColor, setBackColor] = useState('#fef08a'); // Jaune clair (yellow-200)
  const [frontColor, setFrontColor] = useState('#ca8a04'); // Jaune foncé
  const [opacity, setOpacity] = useState(0.1);
  const [spacing, setSpacing] = useState(20);
  const [selectedPattern, setSelectedPattern] = useState(patterns.find(p => p.name === "Dynamic Cubes") || patterns[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const previewRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [selectedAnimation, setSelectedAnimation] = useState(animations[0]);
  const [animationDuration, setAnimationDuration] = useState(5);
  const [isExporting, setIsExporting] = useState(false);

  const generateCSS = () => {
    const baseCSS = selectedPattern.generateCSS(backColor, frontColor, opacity, spacing);
    if (isAnimated) {
      return {
        ...baseCSS,
        ...selectedAnimation.style(animationDuration)
      };
    }
    return baseCSS;
  };

  const copyCSS = () => {
    const css = generateCSS();
    const cssString = Object.entries(css).map(([key, value]) => `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`).join("\n");
    navigator.clipboard.writeText(cssString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportPNG = () => {
    if (previewRef.current) {
      html2canvas(previewRef.current).then(canvas => {
        const link = document.createElement('a');
        link.download = `${selectedPattern.name.toLowerCase().replace(' ', '-')}-pattern.png`;
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  const exportGIF = () => {
    setIsExporting(true);
    const frames = [];
    const frameCount = 30; // Nombre de frames pour le GIF

    const captureFrame = (index) => {
      return new Promise((resolve) => {
        const frameElement = document.createElement('div');
        frameElement.style.width = '300px';
        frameElement.style.height = '300px';
        Object.assign(frameElement.style, generateCSS());
        frameElement.style.animationDelay = `-${(index / frameCount) * animationDuration}s`;
        document.body.appendChild(frameElement);

        setTimeout(() => {
          html2canvas(frameElement).then(canvas => {
            frames.push(canvas.toDataURL());
            document.body.removeChild(frameElement);
            resolve();
          });
        }, 50); // Petit délai pour s'assurer que le rendu est complet
      });
    };

    const captureFrames = async () => {
      for (let i = 0; i < frameCount; i++) {
        await captureFrame(i);
      }

      createGIF({
        images: frames,
        gifWidth: 300,
        gifHeight: 300,
        interval: animationDuration / frameCount,
        numFrames: frameCount,
        frameDuration: animationDuration / frameCount,
        sampleInterval: 10,
        progressCallback: (progress) => console.log(`GIF Export Progress: ${progress * 100}%`),
      }, (obj) => {
        if (!obj.error) {
          const link = document.createElement('a');
          link.href = obj.image;
          link.download = `${selectedPattern.name.toLowerCase().replace(' ', '-')}-animated.gif`;
          link.click();
        }
        setIsExporting(false);
      });
    };

    captureFrames();
  };

  const handleExport = async (type) => {
    setIsExporting(true);
    if (type === 'PNG') {
      await exportPNG();
    } else if (type === 'GIF') {
      await exportGIF();
    }
    setIsExporting(false);
  };

  const filteredPatterns = patterns.filter(pattern =>
    pattern.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closeMenu = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.pattern-select')) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col font-sans">
      <main className="flex-grow flex flex-col p-4 sm:p-8 max-w-6xl mx-auto w-full">
        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-900 mb-8 pb-4 sm:mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          CSS Background Patterns
        </motion.h1>

        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Label htmlFor="backColor" className="w-24">Back Color</Label>
              <Input
                id="backColor"
                type="color"
                value={backColor}
                onChange={(e) => setBackColor(e.target.value)}
                className="w-12 h-12 p-1 border-none"
              />
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Label htmlFor="frontColor" className="w-24">Front Color</Label>
              <Input
                id="frontColor"
                type="color"
                value={frontColor}
                onChange={(e) => setFrontColor(e.target.value)}
                className="w-12 h-12 p-1 border-none"
              />
            </div>
            <div className="w-full sm:w-auto">
              <Label htmlFor="opacity" className="mb-2 block">Opacity</Label>
              <Slider
                id="opacity"
                min={0}
                max={1}
                step={0.01}
                value={[opacity]}
                onValueChange={([value]) => setOpacity(value)}
                className="w-full sm:w-48"
              />
            </div>
            <div className="w-full sm:w-auto">
              <Label htmlFor="spacing" className="mb-2 block">Spacing</Label>
              <Slider
                id="spacing"
                min={5}
                max={100}
                step={1}
                value={[spacing]}
                onValueChange={([value]) => setSpacing(value)}
                className="w-full sm:w-48"
              />
            </div>
          </div>

          <div className="pattern-select relative">
            <Label htmlFor="pattern-select">Select Pattern</Label>
            <div
              className="flex items-center justify-between border rounded-lg p-2 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>{selectedPattern.name || "Select a pattern"}</span>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
            {isOpen && (
              <Command className="absolute w-full mt-1 rounded-lg border shadow-md z-10 bg-white">
                <div className="flex items-center border-b px-3">
                  <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <input
                    className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search patterns..."
                  />
                </div>
                <Command.List className="max-h-[300px] overflow-y-auto">
                  <Command.Empty>No pattern found.</Command.Empty>
                  {filteredPatterns.map((pattern) => (
                    <Command.Item
                      key={pattern.name}
                      onSelect={() => {
                        setSelectedPattern(pattern);
                        closeMenu();
                      }}
                      className="px-2 py-1 cursor-pointer hover:bg-accent flex items-center justify-between"
                    >
                      <span>{pattern.name}</span>
                      {selectedPattern.name === pattern.name && <Check className="h-4 w-4" />}
                    </Command.Item>
                  ))}
                </Command.List>
              </Command>
            )}
          </div>

          <div>
            <Label>Preview</Label>
            <div
              ref={previewRef}
              className="h-64 rounded-lg mt-2"
              style={generateCSS()}
            ></div>
          </div>

          <div className="flex items-center space-x-4">
            <Switch
              id="animate-switch"
              checked={isAnimated}
              onCheckedChange={setIsAnimated}
            />
            <Label htmlFor="animate-switch">Animate Pattern</Label>
          </div>

          {isAnimated && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="animation-select">Select Animation</Label>
                <Select
                  value={selectedAnimation.name}
                  onValueChange={(value) => setSelectedAnimation(animations.find(a => a.name === value))}
                >
                  <SelectTrigger id="animation-select">
                    <SelectValue placeholder="Select an animation" />
                  </SelectTrigger>
                  <SelectContent>
                    {animations.map((animation) => (
                      <SelectItem key={animation.name} value={animation.name}>
                        {animation.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="animation-duration">Animation Duration (seconds)</Label>
                <Slider
                  id="animation-duration"
                  min={1}
                  max={10}
                  step={0.1}
                  value={[animationDuration]}
                  onValueChange={([value]) => setAnimationDuration(value)}
                />
                <span>{animationDuration.toFixed(1)}s</span>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button onClick={copyCSS}>
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied!" : "Copy CSS"}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={isExporting}>
                  <Download className="h-4 w-4 mr-2" />
                  {isExporting ? "Exporting..." : "Export"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport('PNG')}>
                  Export as PNG
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleExport('GIF')}
                  disabled={!isAnimated}
                >
                  Export as GIF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes digitalRain {
          0% {
            background-position: 0 0, 0 0, 0 0, 0 0;
          }
          100% {
            background-position: 0 ${spacing * 2}px, 0 ${spacing * 2}px, 0 ${spacing}px, 0 ${spacing}px;
          }
        }
        ${isAnimated ? selectedAnimation.css(spacing, animationDuration) : ''}
      `}</style>
    </div>
  );
};

export default CSSBackgroundPatterns;