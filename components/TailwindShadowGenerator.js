'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Copy, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const TailwindShadowGenerator = () => {
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const [verticalOffset, setVerticalOffset] = useState(4);
  const [blurRadius, setBlurRadius] = useState(6);
  const [spreadRadius, setSpreadRadius] = useState(0);
  const [shadowColor, setShadowColor] = useState('#00000033');
  const [inset, setInset] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [copiedPreset, setCopiedPreset] = useState(null);

  const generateShadowClass = () => {
    const insetStr = inset ? 'inset_' : '';
    return `shadow-[${insetStr}${horizontalOffset}px_${verticalOffset}px_${blurRadius}px_${spreadRadius}px_${shadowColor}]`;
  };

  const generateCSSClass = () => {
    const insetStr = inset ? 'inset ' : '';
    return `box-shadow: ${insetStr}${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px ${shadowColor};`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { name: "Subtle", tailwind: "shadow-sm", css: "box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);" },
    { name: "Default", tailwind: "shadow", css: "box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);" },
    { name: "Medium", tailwind: "shadow-md", css: "box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);" },
    { name: "Large", tailwind: "shadow-lg", css: "box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);" },
    { name: "Extra Large", tailwind: "shadow-xl", css: "box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);" },
    { name: "2XL", tailwind: "shadow-2xl", css: "box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);" },
    { name: "Inner", tailwind: "shadow-inner", css: "box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);" },
    { name: "Blue Glow", tailwind: "shadow-lg shadow-blue-500/50", css: "box-shadow: 0 10px 15px -3px rgb(59 130 246 / 0.5), 0 4px 6px -4px rgb(59 130 246 / 0.5);" },
    { name: "Green Success", tailwind: "shadow-lg shadow-green-500/40", css: "box-shadow: 0 10px 15px -3px rgb(34 197 94 / 0.4), 0 4px 6px -4px rgb(34 197 94 / 0.4);" },
    { name: "Purple Accent", tailwind: "shadow-lg shadow-purple-500/50", css: "box-shadow: 0 10px 15px -3px rgb(168 85 247 / 0.5), 0 4px 6px -4px rgb(168 85 247 / 0.5);" },
    { name: "Amber Warning", tailwind: "shadow-lg shadow-amber-500/50", css: "box-shadow: 0 10px 15px -3px rgb(245 158 11 / 0.5), 0 4px 6px -4px rgb(245 158 11 / 0.5);" },
    { name: "Rose Highlight", tailwind: "shadow-lg shadow-rose-500/40", css: "box-shadow: 0 10px 15px -3px rgb(244 63 94 / 0.4), 0 4px 6px -4px rgb(244 63 94 / 0.4);" },
  ];

  const copyPreset = (content, type) => {
    navigator.clipboard.writeText(content);
    setCopiedPreset(`${type}-${content}`);
    setTimeout(() => setCopiedPreset(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col font-sans">
      <main className="max-w-6xl mx-auto">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-900 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tailwind Shadow Generator
        </motion.h1>

        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 flex flex-col lg:flex-row">
          <div className="space-y-6 flex-grow lg:mr-8 mb-8 lg:mb-0">
            <div className="space-y-4">
              <div>
                <Label htmlFor="horizontalOffset">Horizontal Offset</Label>
                <Slider
                  id="horizontalOffset"
                  min={-50}
                  max={50}
                  step={1}
                  value={[horizontalOffset]}
                  onValueChange={([value]) => setHorizontalOffset(value)}
                />
                <span>{horizontalOffset}px</span>
              </div>
              <div>
                <Label htmlFor="verticalOffset">Vertical Offset</Label>
                <Slider
                  id="verticalOffset"
                  min={-50}
                  max={50}
                  step={1}
                  value={[verticalOffset]}
                  onValueChange={([value]) => setVerticalOffset(value)}
                />
                <span>{verticalOffset}px</span>
              </div>
              <div>
                <Label htmlFor="blurRadius">Blur Radius</Label>
                <Slider
                  id="blurRadius"
                  min={0}
                  max={100}
                  step={1}
                  value={[blurRadius]}
                  onValueChange={([value]) => setBlurRadius(value)}
                />
                <span>{blurRadius}px</span>
              </div>
              <div>
                <Label htmlFor="spreadRadius">Spread Radius</Label>
                <Slider
                  id="spreadRadius"
                  min={-50}
                  max={50}
                  step={1}
                  value={[spreadRadius]}
                  onValueChange={([value]) => setSpreadRadius(value)}
                />
                <span>{spreadRadius}px</span>
              </div>
              <div>
                <Label htmlFor="shadowColor">Shadow Color</Label>
                <div className="mt-1 p-1 border rounded w-16 h-10">
                  <Input
                    id="shadowColor"
                    type="color"
                    value={shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="w-full h-full p-0 border-none"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="inset"
                  checked={inset}
                  onCheckedChange={setInset}
                />
                <Label htmlFor="inset">Inset</Label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Tailwind CSS Class</Label>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-2">
                  <div className="text-sm font-mono bg-gray-100 p-2 rounded w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2 overflow-x-auto">
                    {generateShadowClass()}
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={() => copyToClipboard(generateShadowClass())}>
                          {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                          Copy
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div>
                <Label>CSS Class</Label>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-2">
                  <div className="text-sm font-mono bg-gray-100 p-2 rounded w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2 overflow-x-auto">
                    {generateCSSClass()}
                  </div>
                  <Button onClick={() => copyToClipboard(generateCSSClass())}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-64 flex-shrink-0">
            <Label>Preview</Label>
            <div 
              className="h-64 w-full bg-yellow-100 rounded-lg mt-4" 
              style={{
                boxShadow: `${inset ? 'inset ' : ''}${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px ${shadowColor}`
              }}
            ></div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Tailwind CSS Preset Shadows</h2>
          <p className="mb-4">
            Looking for inspiration? Check out these modern and professional Tailwind CSS shadow presets. Simply click "Copy Class" to use them instantly in your project.
          </p>
          
          <Button onClick={() => setShowPresets(!showPresets)} className="mb-4">
            {showPresets ? "Hide Presets" : "Show Presets"}
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showPresets ? "rotate-180" : ""}`} />
          </Button>

          <AnimatePresence>
            {showPresets && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {presets.map((preset, index) => (
                  <div key={index} className={`bg-white rounded-lg p-4 sm:p-6 ${preset.tailwind} h-auto sm:h-34 flex flex-col justify-between`}>
                    <p className="font-medium text-base sm:text-lg mb-4">{preset.name}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button onClick={() => copyPreset(preset.tailwind, 'tailwind')} size="sm" className="w-full sm:w-auto">
                              {copiedPreset === `tailwind-${preset.tailwind}` ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                              Tailwind
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{copiedPreset === `tailwind-${preset.tailwind}` ? "Copied!" : "Tailwind class"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button onClick={() => copyPreset(preset.css, 'css')} size="sm" className="w-full sm:w-auto">
                              {copiedPreset === `css-${preset.css}` ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                              CSS
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{copiedPreset === `css-${preset.css}` ? "Copied!" : "CSS"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default TailwindShadowGenerator;
