'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Palette, Home, Globe, Linkedin, Github, Download, Star } from "lucide-react";
import { motion } from "framer-motion";
import Link from 'next/link';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, Zap, BarChart2, Sparkles } from "lucide-react";

const tailwindColors = {
    slate: {
        50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1",
        400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155",
        800: "#1e293b", 900: "#0f172a", 950: "#020617"
    },
    gray: {
        50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db",
        400: "#9ca3af", 500: "#6b7280", 600: "#4b5563", 700: "#374151",
        800: "#1f2937", 900: "#111827", 950: "#030712"
    },
    zinc: {
        50: "#fafafa", 100: "#f4f4f5", 200: "#e4e4e7", 300: "#d4d4d8",
        400: "#a1a1aa", 500: "#71717a", 600: "#52525b", 700: "#3f3f46",
        800: "#27272a", 900: "#18181b", 950: "#09090b"
    },
    neutral: {
        50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4",
        400: "#a3a3a3", 500: "#737373", 600: "#525252", 700: "#404040",
        800: "#262626", 900: "#171717", 950: "#0a0a0a"
    },
    stone: {
        50: "#fafaf9", 100: "#f5f5f4", 200: "#e7e5e4", 300: "#d6d3d1",
        400: "#a8a29e", 500: "#78716c", 600: "#57534e", 700: "#44403c",
        800: "#292524", 900: "#1c1917", 950: "#0c0a09"
    },
    red: {
        50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5",
        400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c",
        800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a"
    },
    orange: {
        50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74",
        400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c",
        800: "#9a3412", 900: "#7c2d12", 950: "#431407"
    },
    amber: {
        50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d",
        400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309",
        800: "#92400e", 900: "#78350f", 950: "#451a03"
    },
    yellow: {
        50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047",
        400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207",
        800: "#854d0e", 900: "#713f12", 950: "#422006"
    },
    lime: {
        50: "#f7fee7", 100: "#ecfccb", 200: "#d9f99d", 300: "#bef264",
        400: "#a3e635", 500: "#84cc16", 600: "#65a30d", 700: "#4d7c0f",
        800: "#3f6212", 900: "#365314", 950: "#1a2e05"
    },
    green: {
        50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac",
        400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d",
        800: "#166534", 900: "#14532d", 950: "#052e16"
    },
    emerald: {
        50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7",
        400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857",
        800: "#065f46", 900: "#064e3b", 950: "#022c22"
    },
    teal: {
        50: "#f0fdfa", 100: "#ccfbf1", 200: "#99f6e4", 300: "#5eead4",
        400: "#2dd4bf", 500: "#14b8a6", 600: "#0d9488", 700: "#0f766e",
        800: "#115e59", 900: "#134e4a", 950: "#042f2e"
    },
    cyan: {
        50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9",
        400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490",
        800: "#155e75", 900: "#164e63", 950: "#083344"
    },
    sky: {
        50: "#f0f9ff", 100: "#e0f2fe", 200: "#bae6fd", 300: "#7dd3fc",
        400: "#38bdf8", 500: "#0ea5e9", 600: "#0284c7", 700: "#0369a1",
        800: "#075985", 900: "#0c4a6e", 950: "#082f49"
    },
    blue: {
        50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd",
        400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8",
        800: "#1e40af", 900: "#1e3a8a", 950: "#172554"
    },
    indigo: {
        50: "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe", 300: "#a5b4fc",
        400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca",
        800: "#3730a3", 900: "#312e81", 950: "#1e1b4b"
    },
    violet: {
        50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd",
        400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9",
        800: "#5b21b6", 900: "#4c1d95", 950: "#2e1065"
    },
    purple: {
        50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d8b4fe",
        400: "#c084fc", 500: "#a855f7", 600: "#9333ea", 700: "#7e22ce",
        800: "#6b21a8", 900: "#581c87", 950: "#3b0764"
    },
    fuchsia: {
        50: "#fdf4ff", 100: "#fae8ff", 200: "#f5d0fe", 300: "#f0abfc",
        400: "#e879f9", 500: "#d946ef", 600: "#c026d3", 700: "#a21caf",
        800: "#86198f", 900: "#701a75", 950: "#4a044e"
    },
    pink: {
        50: "#fdf2f8", 100: "#fce7f3", 200: "#fbcfe8", 300: "#f9a8d4",
        400: "#f472b6", 500: "#ec4899", 600: "#db2777", 700: "#be185d",
        800: "#9d174d", 900: "#831843", 950: "#500724"
    },
    rose: {
        50: "#fff1f2", 100: "#ffe4e6", 200: "#fecdd3", 300: "#fda4af",
        400: "#fb7185", 500: "#f43f5e", 600: "#e11d48", 700: "#be123c",
        800: "#9f1239", 900: "#881337", 950: "#4c0519"
    }
};

const tailwindToHex = (tailwindColor) => {
    const [color, shade] = tailwindColor.split("-");
    return tailwindColors[color]?.[shade] || tailwindColor;
};

const hexToRGB = (hex) => {
    hex = hex.replace(/^#/, "");
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
        console.error("Format hexadécimal invalide:", hex);
        return { r: 0, g: 0, b: 0 };
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b };
};

const rgbToHSL = ({ r, g, b }) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
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

    return { h: h * 360, s: s * 100, l: l * 100 };
};

const hslToRGB = ({ h, s, l }) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
        r: Math.round(255 * f(0)),
        g: Math.round(255 * f(8)),
        b: Math.round(255 * f(4)),
    };
};

const rgbToHex = ({ r, g, b }) => {
    return (
        "#" +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
    );
};

const generatePaletteFromBaseColor = (baseColor) => {
    const baseRGB = hexToRGB(baseColor);
    const baseHSL = rgbToHSL(baseRGB);

    const palette = [];
    for (let i = 0; i < 5; i++) {
        const newHSL = { ...baseHSL };
        // Ajustez la luminosité de manière plus équilibrée
        newHSL.l = Math.max(10, Math.min(90, baseHSL.l - 30 + i * 15));
        // Ajustez légèrement la saturation pour plus de variété
        newHSL.s = Math.max(10, Math.min(100, baseHSL.s - 10 + i * 5));
        const newRGB = hslToRGB(newHSL);
        palette.push(rgbToHex(newRGB));
    }

    return palette;
};

const generateComplementaryColors = (color) => {
    const rgb = hexToRGB(color);
    const hsl = rgbToHSL(rgb);
    return [
        rgbToHex(hslToRGB({ ...hsl, h: (hsl.h + 180) % 360 })),
        rgbToHex(hslToRGB({ ...hsl, h: (hsl.h + 120) % 360 })),
        rgbToHex(hslToRGB({ ...hsl, h: (hsl.h + 240) % 360 })),
    ];
};

const generateHarmoniousColors = (baseColor) => {
    const rgb = hexToRGB(baseColor);
    const hsl = rgbToHSL(rgb);
    return {
        analogous: [
            rgbToHex(hslToRGB({ ...hsl, h: (hsl.h + 30) % 360 })),
            rgbToHex(hslToRGB({ ...hsl, h: (hsl.h - 30 + 360) % 360 })),
        ],
        triadic: [
            rgbToHex(hslToRGB({ ...hsl, h: (hsl.h + 120) % 360 })),
            rgbToHex(hslToRGB({ ...hsl, h: (hsl.h + 240) % 360 })),
        ],
        tetradic: [
            rgbToHex(hslToRGB({ ...hsl, h: (hsl.h + 90) % 360 })),
            rgbToHex(hslToRGB({ ...hsl, h: (hsl.h + 180) % 360 })),
            rgbToHex(hslToRGB({ ...hsl, h: (hsl.h + 270) % 360 })),
        ],
        split_complementary: [
            rgbToHex(hslToRGB({ ...hsl, h: (hsl.h + 150) % 360 })),
            rgbToHex(hslToRGB({ ...hsl, h: (hsl.h + 210) % 360 })),
        ],
    };
};

const TrendPaletteGenerator = () => {
    const [currentPalette, setCurrentPalette] = useState(['#ffffff', '#cccccc', '#999999', '#666666', '#333333']);
    const [complementaryColors, setComplementaryColors] = useState([]);
    const [inputColor, setInputColor] = useState('');
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('paletteFavorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const [harmoniousColors, setHarmoniousColors] = useState({
        analogous: ['#ffffff', '#ffffff'],
        triadic: ['#ffffff', '#ffffff'],
        tetradic: ['#ffffff', '#ffffff', '#ffffff'],
        split_complementary: ['#ffffff', '#ffffff'],
    });

    const examplePalettes = [
        { name: "FiliPEFiLMS", colors: ["#C10A69", "#FFFFFF", "#39255E"] },
        { name: "Pencil.co", colors: ["#F4DAEB", "#C6E4E2", "#8875B4"] },
        { name: "Coconey", colors: ["#FFE18F", "#F9BE4A", "#0E343E"] },
        { name: "TDC", colors: ["#C1D100", "#67BC98", "#000000"] },
        { name: "Curcuma", colors: ["#E58B36", "#936548", "#EAB725", "#E3693F"] },
        { name: "Cowabunga", colors: ["#08B797", "#EEEDEA", "#B7B4B1", "#D36643"] },
        { name: "Hotel Leriotis", colors: ["#F9BE4A", "#45B69F", "#283480"] },
        { name: "Hey Protein Roll", colors: ["#688EBD", "#4760A2", "#D5D2D0", "#D8CF8C"] },
    ];

    const generateNewPalette = () => {
        let baseColor = inputColor.trim().toLowerCase();

        if (!baseColor) {
            baseColor = `#${Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0")}`;
        }

        if (baseColor.includes("-")) {
            baseColor = tailwindToHex(baseColor);
        }

        if (!/^#[0-9A-F]{6}$/i.test(baseColor)) {
            const ctx = document.createElement("canvas").getContext("2d");
            ctx.fillStyle = baseColor;
            baseColor = ctx.fillStyle;
        }

        const newPalette = generatePaletteFromBaseColor(baseColor);
        setCurrentPalette(newPalette);
        setComplementaryColors(newPalette.map(generateComplementaryColors));
        setHarmoniousColors(generateHarmoniousColors(baseColor));
    };

    useEffect(() => {
        generateNewPalette();
    }, []);

    const copyToClipboard = (color, index) => {
        navigator.clipboard.writeText(color);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    useEffect(() => {
        generateNewPalette();
    }, []);

    const exportPalette = (format) => {
        let exportContent = '';
        const fileName = `palette_${Date.now()}`;

        switch (format) {
            case 'css':
                exportContent = currentPalette.map((color, index) =>
                    `--color-${index + 1}: ${color};`
                ).join('\n');
                downloadFile(`${fileName}.css`, exportContent);
                break;
            case 'json':
                exportContent = JSON.stringify(currentPalette, null, 2);
                downloadFile(`${fileName}.json`, exportContent);
                break;
            case 'figma':
                // Créer un fichier compatible Figma (format simplifié)
                exportContent = JSON.stringify({
                    name: "Exported Palette",
                    colors: currentPalette
                });
                downloadFile(`${fileName}.figma`, exportContent);
                break;
            case 'colorgen':
                exportColorGenFormat();
                break;
            default:
                console.error("Format d'exportation non pris en charge");
        }
    };

    const exportColorGenFormat = () => {
        const colorName = "brand"; // Vous pouvez permettre à l'utilisateur de choisir ce nom
        const colorShades = {};

        currentPalette.forEach((color, index) => {
            colorShades[(index + 1) * 100] = color;
        });

        // Ajout des nuances manquantes pour avoir 50 à 950
        if (!colorShades[50]) colorShades[50] = lightenColor(colorShades[100], 0.5);
        if (!colorShades[950]) colorShades[950] = darkenColor(colorShades[900], 0.5);

        const exportContent = {
            colors: {
                [colorName]: colorShades
            }
        };

        const jsonContent = JSON.stringify(exportContent, null, 2);
        downloadFile(`${colorName}_palette.json`, jsonContent);
    };

    // Fonction utilitaire pour éclaircir une couleur
    const lightenColor = (hex, factor) => {
        const rgb = hexToRGB(hex);
        const hsl = rgbToHSL(rgb);
        hsl.l = Math.min(100, hsl.l + (100 - hsl.l) * factor);
        return rgbToHex(hslToRGB(hsl));
    };

    // Fonction utilitaire pour assombrir une couleur
    const darkenColor = (hex, factor) => {
        const rgb = hexToRGB(hex);
        const hsl = rgbToHSL(rgb);
        hsl.l = Math.max(0, hsl.l * (1 - factor));
        return rgbToHex(hslToRGB(hsl));
    };

    const downloadFile = (fileName, content) => {
        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const addToFavorites = () => {
        const newFavorite = {
            id: Date.now(),
            palette: currentPalette,
            complementary: complementaryColors
        };
        const updatedFavorites = [...favorites, newFavorite];
        setFavorites(updatedFavorites);
        localStorage.setItem('paletteFavorites', JSON.stringify(updatedFavorites));
    };

    const removeFromFavorites = (id) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('paletteFavorites', JSON.stringify(updatedFavorites));
    };

    const resetGenerator = () => {
        setInputColor('');
        generateNewPalette();
    };

    // Sauvegarder les favoris dans localStorage chaque fois qu'ils changent
    useEffect(() => {
        localStorage.setItem('paletteFavorites', JSON.stringify(favorites));
    }, [favorites]);

    const copyColor = (color) => {
        navigator.clipboard.writeText(color);
        // Optionnel : ajouter une notification pour indiquer que la couleur a été copiée
    };

    const renderExamples = () => {
        return (
            <motion.div
                className="mt-12 bg-white rounded-xl shadow-lg p-8 space-y-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Inspiring Design Examples</h2>
                <div className="space-y-12">
                    {/* Exemple 1: Card de produit moderne */}
                    <div className="relative overflow-hidden rounded-2xl shadow-xl" style={{ background: `linear-gradient(135deg, ${currentPalette[0]}, ${currentPalette[1]})` }}>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-white mb-4">Futuristic Smartwatch</h3>
                            <p className="text-white text-opacity-80 mb-6">Experience the future on your wrist with our latest AI-powered smartwatch.</p>
                            <motion.button
                                className="group px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ease-in-out flex items-center space-x-2"
                                style={{
                                    backgroundColor: '#ffffff',
                                    color: currentPalette[4],
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>Discover Now</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </motion.button>
                        </div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 translate-y-16"></div>
                    </div>

                    {/* Exemple 2: Interface de tableau de bord */}
                    <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-white mb-4">Analytics Dashboard</h3>
                            <p className="text-gray-400 mb-6">Visualize your data with our powerful and intuitive analytics platform.</p>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {[1, 2, 3].map((_, index) => (
                                    <div key={index} className="bg-gray-800 p-4 rounded-lg">
                                        <div className="w-full h-20 rounded-md mb-2" style={{ background: `linear-gradient(135deg, ${currentPalette[index]}, ${currentPalette[index + 1]})` }}></div>
                                        <div className="h-2 w-20 bg-gray-700 rounded"></div>
                                    </div>
                                ))}
                            </div>
                            <motion.button
                                className="group px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ease-in-out flex items-center space-x-2"
                                style={{
                                    backgroundColor: currentPalette[2],
                                    color: '#ffffff',
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>Explore Dashboard</span>
                                <BarChart2 className="w-4 h-4 transition-transform group-hover:translate-y-[-2px]" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Exemple 3: Landing page créative */}
                    <div className="relative overflow-hidden rounded-2xl shadow-xl" style={{ background: `linear-gradient(135deg, ${currentPalette[3]}, ${currentPalette[4]})` }}>
                        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5">
                            <div className="w-full h-full" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                        </div>
                        <div className="relative p-8">
                            <h3 className="text-3xl font-bold text-white mb-4">Innovate & Create</h3>
                            <p className="text-white text-opacity-80 mb-6">Unleash your creativity with our cutting-edge design tools and resources.</p>
                            <motion.button
                                className="group px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ease-in-out flex items-center space-x-2 bg-white"
                                style={{ color: currentPalette[4] }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>Start Creating</span>
                                <Zap className="w-4 h-4 transition-transform group-hover:rotate-12" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Nouvel exemple avec fond clair */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Minimalist Task Manager</h3>
                            <p className="text-gray-600 mb-6">Streamline your workflow with our clean and efficient task management solution.</p>
                            <div className="flex space-x-4 mb-6">
                                {[0, 1, 2].map((index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: currentPalette[index] }}></div>
                                        <span className="text-sm text-gray-500">Task {index + 1}</span>
                                    </div>
                                ))}
                            </div>
                            <motion.button
                                className="group px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ease-in-out flex items-center space-x-2"
                                style={{
                                    backgroundColor: currentPalette[3],
                                    color: '#ffffff',
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>Get Organized</span>
                                <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    const renderHarmoniousExamples = () => {
        return (
            <motion.div
                className="mt-12 bg-white rounded-xl shadow-lg p-8 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Examples of harmonious combinations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {examplePalettes.map((palette, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-700 mb-2">{palette.name}</h3>
                            <div className="flex space-x-2">
                                {palette.colors.map((color, colorIndex) => (
                                    <button
                                        key={colorIndex}
                                        className="w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110"
                                        style={{ backgroundColor: color }}
                                        onClick={() => copyColor(color)}
                                        title={`Copy ${color}`}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col font-sans">
            <main className="flex-grow flex flex-col p-4 sm:p-8 max-w-6xl mx-auto w-full">
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-900 mb-6 sm:mb-8 md:mb-12 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Palette Generator
                </motion.h1>

                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 space-y-4 sm:space-y-6">
                    <motion.div
                        className="w-full mb-8"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="flex space-x-2">
                            <Input
                                type="text"
                                value={inputColor}
                                onChange={(e) => setInputColor(e.target.value)}
                                placeholder="Enter a color (HEX, RGB, HSL) or a Tailwind class"
                                className="flex-grow text-gray-400"
                            />
                            <Button onClick={generateNewPalette} className="bg-gradient-to-r from-gray-600 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800">
                                <Palette className="mr-2 h-4 w-4" /> Generate
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="space-y-8 w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        {[
                            { colors: currentPalette, title: "Main Palette" },
                            { colors: complementaryColors.map(set => set[0]), title: "Complementary Colors" },
                            { colors: complementaryColors.map(set => set[1]), title: "Triadic Colors" },
                        ].map(({ colors, title }, groupIndex) => (
                            <div key={groupIndex} className="space-y-2">
                                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                                <div className="flex w-full h-16">
                                    {colors.map((color, index) => (
                                        <TooltipProvider key={index}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <motion.div
                                                        className="flex-grow h-full cursor-pointer relative overflow-hidden"
                                                        style={{ backgroundColor: color }}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => copyToClipboard(color, groupIndex * 5 + index)}
                                                    >
                                                        {copiedIndex === groupIndex * 5 + index && (
                                                            <motion.div
                                                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                            >
                                                                <Check className="text-white h-6 w-6" />
                                                            </motion.div>
                                                        )}
                                                    </motion.div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Click to copy : {color}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="mt-8 flex justify-between items-center">
                            <Button onClick={addToFavorites} className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900">
                                <Star className="h-4 w-4" />
                                Add to Favorites
                            </Button>

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
                                    <DropdownMenuItem onClick={() => exportPalette('figma')}>
                                        Export for Figma
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => exportPalette('colorgen')}>
                                        Export ColorGen Format
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </motion.div>
                </div>

                {renderExamples()}

                {favorites.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Favorites</h2>
                        <div className="space-y-4">
                            {favorites.map(fav => (
                                <div key={fav.id} className="bg-white rounded-lg shadow-md p-4">
                                    <div className="flex space-x-2 mb-2">
                                        {fav.palette.map((color, index) => (
                                            <div
                                                key={index}
                                                className="w-8 h-8 rounded-full"
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                    <Button
                                        onClick={() => removeFromFavorites(fav.id)}
                                        variant="outline"
                                        size="sm"
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

{renderHarmoniousExamples()}

            </main>
        </div>
    );
};

export default TrendPaletteGenerator;