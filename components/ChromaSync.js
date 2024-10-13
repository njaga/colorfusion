'use client';

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
  Globe,
  Home,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Head from "next/head";
import Script from "next/script";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const tailwindColors = {
  slate: {
    50: "#F8FCFB",
    100: "#F5FAFA",
    200: "#E7F4F3",
    300: "#DCEFED",
    400: "#D2EAE8",
    500: "#C6E4E2",
    600: "#8DC9C5",
    700: "#52ADA7",
    800: "#36726E",
    900: "#1C3B39",
    950: "#0D1C1B"
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712"
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b"
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a"
  },
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09"
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a"
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407"
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03"
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
    950: "#422006"
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314",
    950: "#1a2e05"
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16"
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22"
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e"
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344"
  },
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49"
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554"
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b"
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065"
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764"
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e"
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
    950: "#500724"
  },
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519"
  },
};

const findClosestTailwindColor = (hexColor) => {
  const [r, g, b] = hexColor.match(/\w\w/g).map((x) => parseInt(x, 16));
  let closestColor = null;
  let minDistance = Infinity;

  Object.entries(tailwindColors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, shadeHex]) => {
      const [sr, sg, sb] = shadeHex.match(/\w\w/g).map((x) => parseInt(x, 16));
      const distance = Math.sqrt(
        Math.pow(r - sr, 2) + Math.pow(g - sg, 2) + Math.pow(b - sb, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = `${colorName}-${shade}`;
      }
    });
  });

  return closestColor;
};

const getTailwindShades = (colorName) => {
  return Object.values(tailwindColors[colorName] || {});
};

const hexToTailwind = (hexColor) => {
  return findClosestTailwindColor(hexColor);
};

const tailwindToHex = (tailwindClass) => {
  const [colorName, shade] = tailwindClass.split('-');
  return tailwindColors[colorName]?.[shade] || "";
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const rgbToHsl = (r, g, b) => {
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

const detectInputFormat = (value) => {
  if (/^#[0-9A-F]{6}$/i.test(value)) {
    return "hex";
  } else if (/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(value)) {
    return "rgb";
  } else if (/^hsl\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)$/i.test(value)) {
    return "hsl";
  } else if (/^(bg-)?([\w-]+)-([1-9]00)$/.test(value)) {
    return "tailwind";
  }
  return "unknown";
};

// Ajoutez cette fonction pour convertir HSL en HEX
const hslToHex = (h, s, l) => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};


export const metadata = {
  title: "ColorFusion",
  description:
    "Easily convert between HEX, RGB, HSL color codes and Tailwind CSS classes.",
};


const ChromaSync = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [shades, setShades] = useState([]);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isHexMode, setIsHexMode] = useState(true);
  const [previewColor, setPreviewColor] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [inputFormat, setInputFormat] = useState("hex");
  const [copiedStates, setCopiedStates] = useState({
    result: false,
    hex: false,
    rgb: false,
    hsl: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [colorName, setColorName] = useState("");

  useEffect(() => {
    // Load history from localStorage when component mounts
    const savedHistory = localStorage.getItem("colorConversionHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }

    // Google Analytics initialization
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_GA_ID) {
      import("react-ga").then((ReactGA) => {
        ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
        ReactGA.pageview(window.location.pathname + window.location.search);
      });
    }
  }, []);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedStates((prev) => ({ ...prev, [key]: true }));
        setTimeout(
          () => setCopiedStates((prev) => ({ ...prev, [key]: false })),
          2000
        );
      },
      (err) => {
        console.error("Error copying to clipboard: ", err);
      }
    );
  };

  const resetApplication = () => {
    setInput("");
    setOutput("");
    setShades([]);
    setError("");
    setPreviewColor("");
    setIsHexMode(true);
    setInputFormat("hex");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    const format = detectInputFormat(value);
    setInputFormat(format);
    setIsHexMode(format !== "tailwind");
  };

  const handleConvert = (inputValue = input) => {
    if (!inputValue.trim()) {
      setError("Veuillez entrer une valeur");
      setOutput("");
      setPreviewColor("");
      setShades([]);
      return;
    }

    setError("");
    setIsProcessing(true);
    let result, extractedColorName, hexColor, tailwindClass;

    const format = detectInputFormat(inputValue);

    switch (format) {
      case "hex":
        hexColor = inputValue;
        tailwindClass = hexToTailwind(inputValue);
        [extractedColorName] = tailwindClass ? tailwindClass.split("-") : [""];
        result = tailwindClass;
        break;
      case "rgb":
        const rgbMatch = inputValue.match(/\d+/g);
        if (rgbMatch) {
          const [r, g, b] = rgbMatch.map(Number);
          hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b)
            .toString(16)
            .slice(1)}`;
          tailwindClass = hexToTailwind(hexColor);
          [extractedColorName] = tailwindClass ? tailwindClass.split("-") : [""];
          result = tailwindClass;
        }
        break;
      case "hsl":
        const hslMatch = inputValue.match(/\d+/g);
        if (hslMatch) {
          const [h, s, l] = hslMatch.map(Number);
          hexColor = hslToHex(h, s, l);
          tailwindClass = hexToTailwind(hexColor);
          [extractedColorName] = tailwindClass ? tailwindClass.split("-") : [""];
          result = tailwindClass;
        }
        break;
      case "tailwind":
        const tailwindMatch = inputValue.match(/^(bg-)?([\w-]+)-([1-9]00)$/);
        if (tailwindMatch) {
          const [, , colorName, shade] = tailwindMatch;
          extractedColorName = colorName;
          tailwindClass = `${colorName}-${shade}`;
          hexColor = tailwindToHex(tailwindClass);
          result = hexColor;
        }
        break;
      default:
        setError("Format d'entrée non reconnu");
        setIsProcessing(false);
        return;
    }

    if (!hexColor || !result) {
      setError("Conversion impossible");
      setIsProcessing(false);
      return;
    }

    setOutput(result);
    setPreviewColor(hexColor);
    setColorName(extractedColorName);
    setShades(getTailwindShades(extractedColorName));

    const rgb = hexToRgb(hexColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Mettre à jour l'historique
    const newHistoryItem = {
      input: inputValue,
      output: result,
      hex: hexColor,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      tailwind: tailwindClass
    };

    const newHistory = [newHistoryItem, ...searchHistory.slice(0, 4)];
    setSearchHistory(newHistory);
    localStorage.setItem("colorConversionHistory", JSON.stringify(newHistory));

    setIsProcessing(false);
  };

  const deleteHistoryItem = (index) => {
    const newHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(newHistory);
    localStorage.setItem("colorConversionHistory", JSON.stringify(newHistory));
  };

  const reuseHistoryItem = (item) => {
    setInput(item.input);
    handleConvert(item.input);
  };

  // Ajoutez cette nouvelle fonction pour l'exportation
  const exportPalette = (format) => {
    let exportContent = '';
    const fileName = `palette_${Date.now()}`;

    const colorName = output.split('-')[0];
    const colorShades = shades; // Utiliser directement les nuances calculées

    switch (format) {
      case 'css':
        exportContent = colorShades.map((shade, index) =>
          `--color-${colorName}-${(index + 1) * 100}: ${shade};`
        ).join('\n');
        downloadFile(`${fileName}.css`, exportContent);
        break;
      case 'json':
        const jsonContent = {};
        colorShades.forEach((shade, index) => {
          jsonContent[`${colorName}-${(index + 1) * 100}`] = shade;
        });
        exportContent = JSON.stringify(jsonContent, null, 2);
        downloadFile(`${fileName}.json`, exportContent);
        break;
      case 'tailwind':
        exportContent = `module.exports = {
  theme: {
    extend: {
      colors: {
        '${colorName}': {
          ${colorShades.map((shade, index) => `'${(index + 1) * 100}': '${shade}'`).join(',\n          ')}
        }
      }
    }
  }
}`;
        downloadFile(`${fileName}_tailwind_config.js`, exportContent);
        break;
      case 'colorgen':
        exportColorGenFormat();
        break;
      default:
        console.error("Format d'exportation non pris en charge");
    }
  };

  const downloadFile = (fileName, content) => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Ajoutez cette nouvelle fonction pour l'exportation au format spécifié
  const exportColorGenFormat = () => {
    const colorName = output.split('-')[0];
    const colorShades = {};
    
    shades.forEach((shade, index) => {
      colorShades[(index + 1) * 50] = shade;
    });

    const exportContent = {
      colors: {
        [colorName]: colorShades
      }
    };

    const jsonContent = JSON.stringify(exportContent, null, 2);
    downloadFile(`${colorName}_palette.json`, jsonContent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col font-sans ">
      <main className="flex-grow flex flex-col p-8 max-w-7xl mx-auto w-full">
        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-900 mb-8 sm:mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Color Converter
        </motion.h1>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <motion.div
            className="w-full mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter a color (HEX, RGB, HSL) or a Tailwind class"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow"
              />
              <Button
                onClick={() => handleConvert()}
                className="bg-gradient-to-r from-gray-600 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Converting...
                  </span>
                ) : (
                  <>
                    <ArrowLeftRight className="mr-2 h-4 w-4" /> Convert
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {error && !isProcessing && (
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
              className="space-y-6"
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
                    onClick={() => copyToClipboard(output, "result")}
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
                    className="w-full h-16 rounded-md shadow-inner mb-4"
                    style={{ backgroundColor: previewColor }}
                  ></div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "HEX", value: previewColor },
                      { label: "RGB", value: searchHistory[0]?.rgb },
                      { label: "HSL", value: searchHistory[0]?.hsl },
                      { label: "Tailwind", value: searchHistory[0]?.tailwind }
                    ].map(({ label, value }, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                        <span className="font-semibold">{label}:</span>
                        <div className="flex items-center">
                          <span className="font-mono mr-2">{value}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => copyToClipboard(value, label.toLowerCase())}
                          >
                            {copiedStates[label.toLowerCase()] ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {shades.length > 0 && colorName && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Shades:</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Export palette
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => exportPalette('css')}>
                          Export in CSS
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => exportPalette('json')}>
                          Export in JSON
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => exportPalette('tailwind')}>
                          Export for Tailwind
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => exportPalette('colorgen')}>
                          Export ColorGen Format
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex w-full h-16 mb-2">
                    {Object.entries(tailwindColors[colorName]).map(([shade, hexValue]) => (
                      <TooltipProvider key={shade}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div
                              className="flex-grow h-full cursor-pointer relative overflow-hidden"
                              style={{ backgroundColor: hexValue }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setInput(
                                  isHexMode
                                    ? hexValue
                                    : `${colorName}-${shade}`
                                );
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>HEX: {hexValue}</p>
                            <p>Tailwind: {`${colorName}-${shade}`}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    {Object.keys(tailwindColors[colorName]).map((shade) => (
                      <span key={shade} className="text-xs">{shade}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {searchHistory.length > 0 && (
            <motion.div 
              className="mt-12 bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Search History</h3>
              <div className="space-y-4">
                <AnimatePresence>
                  {searchHistory.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-4 rounded-md"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-10 h-10 rounded-full shadow-md"
                          style={{ backgroundColor: item.hex }}
                        />
                        <div>
                          <p className="font-semibold">{item.input} → {item.output}</p>
                          <p className="text-sm text-gray-500">
                            HEX: {item.hex} | RGB: {item.rgb} | HSL: {item.hsl}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => reuseHistoryItem(item)}
                        >
                          <RefreshCw className="h-4 w-4" />
                          <span className="hidden sm:inline ml-1">Reuse</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteHistoryItem(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="hidden sm:inline ml-1">Delete</span>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ChromaSync;