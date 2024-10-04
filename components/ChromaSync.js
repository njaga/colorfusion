"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AlertCircle,
  Copy,
  Check,
  Trash2,
  RefreshCw,
  Linkedin,
  Github,
  ArrowLeftRight,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Head from 'next/head';
import Script from 'next/script';

const tailwindColors = {
  slate: [
    "#f8fafc",
    "#f1f5f9",
    "#e2e8f0",
    "#cbd5e1",
    "#94a3b8",
    "#64748b",
    "#475569",
    "#334155",
    "#1e293b",
    "#0f172a",
  ],
  gray: [
    "#f9fafb",
    "#f3f4f6",
    "#e5e7eb",
    "#d1d5db",
    "#9ca3af",
    "#6b7280",
    "#4b5563",
    "#374151",
    "#1f2937",
    "#111827",
  ],
  zinc: [
    "#fafafa",
    "#f4f4f5",
    "#e4e4e7",
    "#d4d4d8",
    "#a1a1aa",
    "#71717a",
    "#52525b",
    "#3f3f46",
    "#27272a",
    "#18181b",
  ],
  neutral: [
    "#fafafa",
    "#f5f5f5",
    "#e5e5e5",
    "#d4d4d4",
    "#a3a3a3",
    "#737373",
    "#525252",
    "#404040",
    "#262626",
    "#171717",
  ],
  stone: [
    "#fafaf9",
    "#f5f5f4",
    "#e7e5e4",
    "#d6d3d1",
    "#a8a29e",
    "#78716c",
    "#57534e",
    "#44403c",
    "#292524",
    "#1c1917",
  ],
  red: [
    "#fef2f2",
    "#fee2e2",
    "#fecaca",
    "#fca5a5",
    "#f87171",
    "#ef4444",
    "#dc2626",
    "#b91c1c",
    "#991b1b",
    "#7f1d1d",
  ],
  orange: [
    "#fff7ed",
    "#ffedd5",
    "#fed7aa",
    "#fdba74",
    "#fb923c",
    "#f97316",
    "#ea580c",
    "#c2410c",
    "#9a3412",
    "#7c2d12",
  ],
  amber: [
    "#fffbeb",
    "#fef3c7",
    "#fde68a",
    "#fcd34d",
    "#fbbf24",
    "#f59e0b",
    "#d97706",
    "#b45309",
    "#92400e",
    "#78350f",
  ],
  yellow: [
    "#fefce8",
    "#fef9c3",
    "#fef08a",
    "#fde047",
    "#facc15",
    "#eab308",
    "#ca8a04",
    "#a16207",
    "#854d0e",
    "#713f12",
  ],
  lime: [
    "#f7fee7",
    "#ecfccb",
    "#d9f99d",
    "#bef264",
    "#a3e635",
    "#84cc16",
    "#65a30d",
    "#4d7c0f",
    "#3f6212",
    "#365314",
  ],
  green: [
    "#f0fdf4",
    "#dcfce7",
    "#bbf7d0",
    "#86efac",
    "#4ade80",
    "#22c55e",
    "#16a34a",
    "#15803d",
    "#166534",
    "#14532d",
  ],
  emerald: [
    "#ecfdf5",
    "#d1fae5",
    "#a7f3d0",
    "#6ee7b7",
    "#34d399",
    "#10b981",
    "#059669",
    "#047857",
    "#065f46",
    "#064e3b",
  ],
  teal: [
    "#f0fdfa",
    "#ccfbf1",
    "#99f6e4",
    "#5eead4",
    "#2dd4bf",
    "#14b8a6",
    "#0d9488",
    "#0f766e",
    "#115e59",
    "#134e4a",
  ],
  cyan: [
    "#ecfeff",
    "#cffafe",
    "#a5f3fc",
    "#67e8f9",
    "#22d3ee",
    "#06b6d4",
    "#0891b2",
    "#0e7490",
    "#155e75",
    "#164e63",
  ],
  sky: [
    "#f0f9ff",
    "#e0f2fe",
    "#bae6fd",
    "#7dd3fc",
    "#38bdf8",
    "#0ea5e9",
    "#0284c7",
    "#0369a1",
    "#075985",
    "#0c4a6e",
  ],
  blue: [
    "#eff6ff",
    "#dbeafe",
    "#bfdbfe",
    "#93c5fd",
    "#60a5fa",
    "#3b82f6",
    "#2563eb",
    "#1d4ed8",
    "#1e40af",
    "#1e3a8a",
  ],
  indigo: [
    "#eef2ff",
    "#e0e7ff",
    "#c7d2fe",
    "#a5b4fc",
    "#818cf8",
    "#6366f1",
    "#4f46e5",
    "#4338ca",
    "#3730a3",
    "#312e81",
  ],
  violet: [
    "#f5f3ff",
    "#ede9fe",
    "#ddd6fe",
    "#c4b5fd",
    "#a78bfa",
    "#8b5cf6",
    "#7c3aed",
    "#6d28d9",
    "#5b21b6",
    "#4c1d95",
  ],
  purple: [
    "#faf5ff",
    "#f3e8ff",
    "#e9d5ff",
    "#d8b4fe",
    "#c084fc",
    "#a855f7",
    "#9333ea",
    "#7e22ce",
    "#6b21a8",
    "#581c87",
  ],
  fuchsia: [
    "#fdf4ff",
    "#fae8ff",
    "#f5d0fe",
    "#f0abfc",
    "#e879f9",
    "#d946ef",
    "#c026d3",
    "#a21caf",
    "#86198f",
    "#701a75",
  ],
  pink: [
    "#fdf2f8",
    "#fce7f3",
    "#fbcfe8",
    "#f9a8d4",
    "#f472b6",
    "#ec4899",
    "#db2777",
    "#be185d",
    "#9d174d",
    "#831843",
  ],
  rose: [
    "#fff1f2",
    "#ffe4e6",
    "#fecdd3",
    "#fda4af",
    "#fb7185",
    "#f43f5e",
    "#e11d48",
    "#be123c",
    "#9f1239",
    "#881337",
  ],
};

const findClosestTailwindColor = (hexColor) => {
  const [r, g, b] = hexColor.match(/\w\w/g).map((x) => parseInt(x, 16));
  let closestColor = null;
  let minDistance = Infinity;

  // Vérification pour les nuances de gris
  if (Math.abs(r - g) <= 10 && Math.abs(g - b) <= 10 && Math.abs(r - b) <= 10) {
    const grayValue = (r + g + b) / 3;
    const grayShades = tailwindColors.gray;
    grayShades.forEach((shade, index) => {
      const [sr, sg, sb] = shade.match(/\w\w/g).map((x) => parseInt(x, 16));
      const shadeGray = (sr + sg + sb) / 3;
      const distance = Math.abs(grayValue - shadeGray);
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = `gray-${(index + 1) * 100}`;
      }
    });
    return closestColor;
  }

  Object.entries(tailwindColors).forEach(([colorName, shades]) => {
    shades.forEach((shade, index) => {
      const [sr, sg, sb] = shade.match(/\w\w/g).map((x) => parseInt(x, 16));
      const distance = Math.sqrt(
        Math.pow(r - sr, 2) + Math.pow(g - sg, 2) + Math.pow(b - sb, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = `${colorName}-${(index + 1) * 100}`;
      }
    });
  });

  return closestColor;
};

const getTailwindShades = (colorName) => {
  return tailwindColors[colorName] || [];
};

const hexToTailwind = (hexColor) => {
  return findClosestTailwindColor(hexColor);
};

const tailwindToHex = (tailwindClass) => {
  const [colorName, shade] = tailwindClass.split('-');
  const shadeIndex = parseInt(shade) / 100 - 1;
  return tailwindColors[colorName]?.[shadeIndex] || '';
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHsl = (r, g, b) => {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

const detectInputFormat = (value) => {
  if (/^#[0-9A-F]{6}$/i.test(value)) {
    return 'hex';
  } else if (/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(value)) {
    return 'rgb';
  } else if (/^hsl\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)$/i.test(value)) {
    return 'hsl';
  } else if (/^bg-[a-z]+-[1-9]00$/.test(value)) {
    return 'tailwind';
  }
  return 'unknown';
};

export const metadata = {
  title: "ColorFusion",
  description: "Easily convert between HEX, RGB, HSL color codes and Tailwind CSS classes.",
};

export default function Wind2Hex() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [shades, setShades] = useState([]);
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isHexMode, setIsHexMode] = useState(true);
  const [previewColor, setPreviewColor] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [inputFormat, setInputFormat] = useState('hex');
  const [copiedStates, setCopiedStates] = useState({
    result: false,
    hex: false,
    rgb: false,
    hsl: false
  });

  useEffect(() => {
    // Load history from localStorage when component mounts
    const savedHistory = localStorage.getItem('colorConversionHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }

    // Google Analytics initialization
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_ID) {
      import('react-ga').then((ReactGA) => {
        ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
        ReactGA.pageview(window.location.pathname + window.location.search);
      });
    }
  }, []);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedStates(prev => ({ ...prev, [key]: true }));
        setTimeout(() => setCopiedStates(prev => ({ ...prev, [key]: false })), 2000);
      },
      (err) => {
        console.error('Error copying to clipboard: ', err);
      }
    );
  };

  const resetApplication = () => {
    setInput('');
    setOutput('');
    setShades([]);
    setError('');
    setPreviewColor('');
    setIsHexMode(true);
    setInputFormat('hex');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    const format = detectInputFormat(value);
    setInputFormat(format);
    setIsHexMode(format !== 'tailwind');
  };

  const handleConvert = () => {
    setError('');
    let result, colorName, hexColor;

    switch (inputFormat) {
      case 'hex':
        hexColor = input;
        result = hexToTailwind(input);
        [colorName] = result ? result.split('-') : [null];
        break;
      case 'rgb':
        const rgbMatch = input.match(/\d+/g);
        if (rgbMatch) {
          const [r, g, b] = rgbMatch.map(Number);
          hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
          result = hexToTailwind(hexColor);
          [colorName] = result ? result.split('-') : [null];
        }
        break;
      case 'hsl':
        // La conversion de HSL à HEX est plus complexe et nécessiterait une fonction supplémentaire
        setError("Direct conversion from HSL is not yet supported.");
        return;
      case 'tailwind':
        hexColor = tailwindToHex(input.replace('bg-', ''));
        if (hexColor) {
          result = input.startsWith('bg-') ? input : `bg-${input}`;
          [colorName] = input.replace('bg-', '').split('-');
        }
        break;
      default:
        setError('Unrecognized input format.');
        return;
    }

    if (!hexColor || !result) {
      setError('Conversion impossible.');
      return;
    }

    setOutput(result);
    setPreviewColor(hexColor);
    setShades(getTailwindShades(colorName));

    const rgb = hexToRgb(hexColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Ajouter la recherche à l'historique avec les formats supplémentaires
    const newHistoryItem = {
      input,
      output: result,
      hex: hexColor,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    };

    const newHistory = [newHistoryItem, ...searchHistory.slice(0, 4)];
    setSearchHistory(newHistory);
    localStorage.setItem('colorConversionHistory', JSON.stringify(newHistory));
  };

  const deleteHistoryItem = (index) => {
    const newHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(newHistory);
    localStorage.setItem('colorConversionHistory', JSON.stringify(newHistory));
  };

  const reuseHistoryItem = (item) => {
    setInput(item.input);
    setIsHexMode(item.input.startsWith('#'));
  };

  return (
    <>
      <Head>
        <title>ColorFusion - Convertisseur de Codes Couleur</title>
        <meta name="description" content="Convertissez facilement entre les codes couleur HEX, RGB, HSL et les classes Tailwind CSS avec ColorFusion. Parfait pour les développeurs web et les designers." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="keywords" content="convertisseur de couleur, hex vers rgb, rgb vers hsl, tailwind css, codes couleur, développement web, outils de design" />
        <meta property="og:title" content="ColorFusion - Convertisseur de Codes Couleur" />
        <meta property="og:description" content="Convertissez facilement les codes couleur avec ColorFusion. Support pour HEX, RGB, HSL et Tailwind CSS." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://colorfusion-five.vercel.app/" />
        <meta property="og:image" content="https://colorfusion-five.vercel.app/og-image.png" />
        <link rel="canonical" href="https://colorfusion-five.vercel.app/" />
      </Head>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
          </Script>
        </>
      )}
      <div className="p-8 max-w-2xl mx-auto">
        <motion.h1
          className="text-5xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-900 cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={resetApplication}
        >
          ColorFusion
        </motion.h1>
        <p className="text-center text-gray-600 mb-4">
          Convertissez facilement entre les codes couleur HEX, RGB, HSL et les classes Tailwind CSS. L'outil parfait pour les développeurs web et les designers.
        </p>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col space-y-4 mb-6">
            <Input
              type="text"
              placeholder="Enter a color (HEX, RGB, HSL) or a Tailwind class"
              value={input}
              onChange={handleInputChange}
              className="flex-grow"
            />
            <Button onClick={handleConvert}>Convert</Button>
          </div>

          {error && (
            <motion.div
              className="flex items-center text-red-500 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              <span>{error}</span>
            </motion.div>
          )}
          {output && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">Result:</p>
                <div className="flex items-center space-x-2">
                  <span className="font-mono bg-gray-200 px-2 py-1 rounded">
                    {output}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => copyToClipboard(output, 'result')}
                  >
                    {copiedStates.result ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              {previewColor && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Current Color:</h3>
                  <div
                    className="w-full h-12 rounded-md shadow-inner mb-4"
                    style={{ backgroundColor: previewColor }}
                  ></div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p><strong>HEX:</strong> {previewColor}</p>
                      <Button size="icon" variant="outline" onClick={() => copyToClipboard(previewColor, 'hex')}>
                        {copiedStates.hex ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <p><strong>RGB:</strong> {searchHistory[0]?.rgb}</p>
                      <Button size="icon" variant="outline" onClick={() => copyToClipboard(searchHistory[0]?.rgb, 'rgb')}>
                        {copiedStates.rgb ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <p><strong>HSL:</strong> {searchHistory[0]?.hsl}</p>
                      <Button size="icon" variant="outline" onClick={() => copyToClipboard(searchHistory[0]?.hsl, 'hsl')}>
                        {copiedStates.hsl ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              {shades.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Shades:</h3>
                  <div className="grid grid-cols-10 gap-2">
                    {shades.map((shade, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex flex-col items-center">
                              <div
                                className="w-8 h-8 rounded-full cursor-pointer shadow-md"
                                style={{ backgroundColor: shade }}
                                onClick={() => {
                                  setInput(isHexMode ? shade : `bg-${output.split('-')[0]}-${(index + 1) * 100}`);
                                }}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    setInput(isHexMode ? shade : `bg-${output.split('-')[0]}-${(index + 1) * 100}`);
                                  }
                                }}
                              ></div>
                              <span className="text-xs mt-1">{`${index + 1}00`}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>HEX: {shade}</p>
                            <p>RGB: {hexToRgb(shade).r}, {hexToRgb(shade).g}, {hexToRgb(shade).b}</p>
                            <p>HSL: {rgbToHsl(hexToRgb(shade).r, hexToRgb(shade).g, hexToRgb(shade).b).h}, {rgbToHsl(hexToRgb(shade).r, hexToRgb(shade).g, hexToRgb(shade).b).s}%, {rgbToHsl(hexToRgb(shade).r, hexToRgb(shade).g, hexToRgb(shade).b).l}%</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {searchHistory.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Search History</h3>
              <ul className="space-y-2">
                {searchHistory.map((item, index) => (
                  <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                    <div className="flex items-center">
                      <div
                        className="w-6 h-6 rounded-full mr-2"
                        style={{ backgroundColor: item.hex }}
                      ></div>
                      <span className="font-mono text-sm">{item.input} → {item.output}</span>
                    </div>
                    <div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => reuseHistoryItem(item)}
                        className="mr-2"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteHistoryItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Developed by Ndiaga Ndiaye</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="https://ndiagandiaye.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
              <Globe className="h-4 w-4 text-gray-600" />
            </a>
            <a href="https://www.linkedin.com/in/ndiagandiaye" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
              <Linkedin className="h-4 w-4 text-gray-600" />
            </a>
            <a href="https://github.com/njaga" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
              <Github className="h-4 w-4 text-gray-600" />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}