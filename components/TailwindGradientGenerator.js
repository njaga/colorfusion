'use client';

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Copy, Check, ArrowLeft, Globe, Linkedin, Github, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

const directions = [
    { value: 'to-t', label: 'To Top' },
    { value: 'to-tr', label: 'To Top Right' },
    { value: 'to-r', label: 'To Right' },
    { value: 'to-br', label: 'To Bottom Right' },
    { value: 'to-b', label: 'To Bottom' },
    { value: 'to-bl', label: 'To Bottom Left' },
    { value: 'to-l', label: 'To Left' },
    { value: 'to-tl', label: 'To Top Left' },
];

const weights = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

const tailwindColors = {
    slate: {"50":"#f8fafc","100":"#f1f5f9","200":"#e2e8f0","300":"#cbd5e1","400":"#94a3b8","500":"#64748b","600":"#475569","700":"#334155","800":"#1e293b","900":"#0f172a","950":"#020617"},
    gray: {"50":"#f9fafb","100":"#f3f4f6","200":"#e5e7eb","300":"#d1d5db","400":"#9ca3af","500":"#6b7280","600":"#4b5563","700":"#374151","800":"#1f2937","900":"#111827","950":"#030712"},
    zinc: {"50":"#fafafa","100":"#f4f4f5","200":"#e4e4e7","300":"#d4d4d8","400":"#a1a1aa","500":"#71717a","600":"#52525b","700":"#3f3f46","800":"#27272a","900":"#18181b","950":"#09090b"},
    neutral: {"50":"#fafafa","100":"#f5f5f5","200":"#e5e5e5","300":"#d4d4d4","400":"#a3a3a3","500":"#737373","600":"#525252","700":"#404040","800":"#262626","900":"#171717","950":"#0a0a0a"},
    stone: {"50":"#fafaf9","100":"#f5f5f4","200":"#e7e5e4","300":"#d6d3d1","400":"#a8a29e","500":"#78716c","600":"#57534e","700":"#44403c","800":"#292524","900":"#1c1917","950":"#0c0a09"},
    red: {"50":"#fef2f2","100":"#fee2e2","200":"#fecaca","300":"#fca5a5","400":"#f87171","500":"#ef4444","600":"#dc2626","700":"#b91c1c","800":"#991b1b","900":"#7f1d1d","950":"#450a0a"},
    orange: {"50":"#fff7ed","100":"#ffedd5","200":"#fed7aa","300":"#fdba74","400":"#fb923c","500":"#f97316","600":"#ea580c","700":"#c2410c","800":"#9a3412","900":"#7c2d12","950":"#431407"},
    amber: {"50":"#fffbeb","100":"#fef3c7","200":"#fde68a","300":"#fcd34d","400":"#fbbf24","500":"#f59e0b","600":"#d97706","700":"#b45309","800":"#92400e","900":"#78350f","950":"#451a03"},
    yellow: {"50":"#fefce8","100":"#fef9c3","200":"#fef08a","300":"#fde047","400":"#facc15","500":"#eab308","600":"#ca8a04","700":"#a16207","800":"#854d0e","900":"#713f12","950":"#422006"},
    lime: {"50":"#f7fee7","100":"#ecfccb","200":"#d9f99d","300":"#bef264","400":"#a3e635","500":"#84cc16","600":"#65a30d","700":"#4d7c0f","800":"#3f6212","900":"#365314","950":"#1a2e05"},
    green: {"50":"#f0fdf4","100":"#dcfce7","200":"#bbf7d0","300":"#86efac","400":"#4ade80","500":"#22c55e","600":"#16a34a","700":"#15803d","800":"#166534","900":"#14532d","950":"#052e16"},
    emerald: {"50":"#ecfdf5","100":"#d1fae5","200":"#a7f3d0","300":"#6ee7b7","400":"#34d399","500":"#10b981","600":"#059669","700":"#047857","800":"#065f46","900":"#064e3b","950":"#022c22"},
    teal: {"50":"#f0fdfa","100":"#ccfbf1","200":"#99f6e4","300":"#5eead4","400":"#2dd4bf","500":"#14b8a6","600":"#0d9488","700":"#0f766e","800":"#115e59","900":"#134e4a","950":"#042f2e"},
    cyan: {"50":"#ecfeff","100":"#cffafe","200":"#a5f3fc","300":"#67e8f9","400":"#22d3ee","500":"#06b6d4","600":"#0891b2","700":"#0e7490","800":"#155e75","900":"#164e63","950":"#083344"},
    sky: {"50":"#f0f9ff","100":"#e0f2fe","200":"#bae6fd","300":"#7dd3fc","400":"#38bdf8","500":"#0ea5e9","600":"#0284c7","700":"#0369a1","800":"#075985","900":"#0c4a6e","950":"#082f49"},
    blue: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"},
    indigo: {"50":"#eef2ff","100":"#e0e7ff","200":"#c7d2fe","300":"#a5b4fc","400":"#818cf8","500":"#6366f1","600":"#4f46e5","700":"#4338ca","800":"#3730a3","900":"#312e81","950":"#1e1b4b"},
    violet: {"50":"#f5f3ff","100":"#ede9fe","200":"#ddd6fe","300":"#c4b5fd","400":"#a78bfa","500":"#8b5cf6","600":"#7c3aed","700":"#6d28d9","800":"#5b21b6","900":"#4c1d95","950":"#2e1065"},
    purple: {"50":"#faf5ff","100":"#f3e8ff","200":"#e9d5ff","300":"#d8b4fe","400":"#c084fc","500":"#a855f7","600":"#9333ea","700":"#7e22ce","800":"#6b21a8","900":"#581c87","950":"#3b0764"},
    fuchsia: {"50":"#fdf4ff","100":"#fae8ff","200":"#f5d0fe","300":"#f0abfc","400":"#e879f9","500":"#d946ef","600":"#c026d3","700":"#a21caf","800":"#86198f","900":"#701a75","950":"#4a044e"},
    pink: {"50":"#fdf2f8","100":"#fce7f3","200":"#fbcfe8","300":"#f9a8d4","400":"#f472b6","500":"#ec4899","600":"#db2777","700":"#be185d","800":"#9d174d","900":"#831843","950":"#500724"},
    rose: {"50":"#fff1f2","100":"#ffe4e6","200":"#fecdd3","300":"#fda4af","400":"#fb7185","500":"#f43f5e","600":"#e11d48","700":"#be123c","800":"#9f1239","900":"#881337","950":"#4c0519"},
};

const TailwindGradientGenerator = () => {
    const [direction, setDirection] = useState('to-r');
    const [fromColor, setFromColor] = useState('yellow');
    const [fromWeight, setFromWeight] = useState('300');
    const [toColor, setToColor] = useState('yellow');
    const [toWeight, setToWeight] = useState('600');
    const [viaColor, setViaColor] = useState('');
    const [viaWeight, setViaWeight] = useState('500');
    const [copied, setCopied] = useState(false);
    const [showExamples, setShowExamples] = useState(false);
    const [gradientType, setGradientType] = useState('background');

    const gradientClass = gradientType === 'background' 
        ? `bg-gradient-${direction} from-${fromColor}-${fromWeight} to-${toColor}-${toWeight}${viaColor ? ` via-${viaColor}-${viaWeight}` : ''}`
        : `text-transparent bg-clip-text bg-gradient-${direction} from-${fromColor}-${fromWeight} to-${toColor}-${toWeight}${viaColor ? ` via-${viaColor}-${viaWeight}` : ''}`;

    const getColorHex = (color, weight) => {
        return tailwindColors[color]?.[weight] || '#000000';
    };

    const ColorSelect = ({ value, onChange, colors, label }) => (
        <div>
            <Label htmlFor={label} className="mb-2">{label}</Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger id={label} className="w-full">
                    <SelectValue placeholder="Select color">
                        <div className="flex items-center">
                            <div className="w-5 h-5 rounded mr-2" style={{ backgroundColor: getColorHex(value, '500') }}></div>
                            {value}
                        </div>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(colors).map((color) => (
                        <SelectItem key={color} value={color}>
                            <div className="flex items-center">
                                <div className="w-5 h-5 rounded mr-2" style={{ backgroundColor: getColorHex(color, '500') }}></div>
                                {color}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );

    const WeightSelect = ({ value, onChange, weights, label, color }) => (
        <div>
            <Label htmlFor={label} className="mb-2">{label}</Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger id={label} className="w-full">
                    <SelectValue placeholder="Select weight">
                        <div className="flex items-center">
                            <div className="w-5 h-5 rounded mr-2" style={{ backgroundColor: getColorHex(color, value) }}></div>
                            {value}
                        </div>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {weights.map((weight) => (
                        <SelectItem key={weight} value={weight}>
                            <div className="flex items-center">
                                <div className="w-5 h-5 rounded mr-2" style={{ backgroundColor: getColorHex(color, weight) }}></div>
                                {weight}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );

    const gradientStyle = useMemo(() => {
        const fromHex = getColorHex(fromColor, fromWeight);
        const toHex = getColorHex(toColor, toWeight);
        const viaHex = viaColor ? getColorHex(viaColor, viaWeight) : null;
        
        let gradientDirection;
        switch(direction) {
            case 'to-t': gradientDirection = 'to top'; break;
            case 'to-tr': gradientDirection = 'to top right'; break;
            case 'to-r': gradientDirection = 'to right'; break;
            case 'to-br': gradientDirection = 'to bottom right'; break;
            case 'to-b': gradientDirection = 'to bottom'; break;
            case 'to-bl': gradientDirection = 'to bottom left'; break;
            case 'to-l': gradientDirection = 'to left'; break;
            case 'to-tl': gradientDirection = 'to top left'; break;
            default: gradientDirection = 'to right';
        }

        return {
            backgroundImage: `linear-gradient(${gradientDirection}, ${fromHex}, ${viaHex ? viaHex + ',' : ''} ${toHex})`,
        };
    }, [direction, fromColor, fromWeight, toColor, toWeight, viaColor, viaWeight]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(gradientClass);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const colorPreview = (color, weight) => (
        <div 
            className={`w-6 h-6 rounded-full bg-${color}-${weight} mr-2`} 
            title={`${color}-${weight}`}
        ></div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col font-sans ">
            <main className="flex-grow flex flex-col p-8 max-w-6xl mx-auto w-full">
                <motion.h1
                    className="text-4xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-900 mb-8 sm:mb-12 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Tailwind Gradient Generator
                </motion.h1>

                <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <Label htmlFor="gradientType" className="mb-2">Gradient type</Label>
                            <Select value={gradientType} onValueChange={setGradientType}>
                                <SelectTrigger id="gradientType" className="w-full">
                                    <SelectValue placeholder="Sélectionner le type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="background">Background</SelectItem>
                                    <SelectItem value="text">Text</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="md:col-span-2">
                            <Label htmlFor="direction" className="mb-2">Gradient Direction</Label>
                            <Select value={direction} onValueChange={setDirection}>
                                <SelectTrigger id="direction" className="w-full">
                                    <SelectValue placeholder="Select direction" />
                                </SelectTrigger>
                                <SelectContent>
                                    {directions.map((dir) => (
                                        <SelectItem key={dir.value} value={dir.value}>
                                            {dir.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <ColorSelect
                            value={fromColor}
                            onChange={setFromColor}
                            colors={tailwindColors}
                            label="From Color"
                        />
                        <WeightSelect
                            value={fromWeight}
                            onChange={setFromWeight}
                            weights={weights}
                            label="From Weight"
                            color={fromColor}
                        />
                        <ColorSelect
                            value={toColor}
                            onChange={setToColor}
                            colors={tailwindColors}
                            label="To Color"
                        />
                        <WeightSelect
                            value={toWeight}
                            onChange={setToWeight}
                            weights={weights}
                            label="To Weight"
                            color={toColor}
                        />
                        <ColorSelect
                            value={viaColor}
                            onChange={setViaColor}
                            colors={tailwindColors}
                            label="Via Color (optional)"
                        />
                        {viaColor && (
                            <WeightSelect
                                value={viaWeight}
                                onChange={setViaWeight}
                                weights={weights}
                                label="Via Weight"
                                color={viaColor}
                            />
                        )}
                    </div>

                    <div>
                        <Label>Preview</Label>
                        {gradientType === 'background' ? (
                            <div className="h-32 rounded" style={gradientStyle}></div>
                        ) : (
                            <div className={`text-6xl font-bold ${gradientClass}`}>
                                Text with gradient
                            </div>
                        )}
                    </div>

                    <div>
                        <Label>Tailwind Classes</Label>
                        <div className="flex items-center mt-2">
                            <Input value={gradientClass} readOnly />
                            <Button onClick={copyToClipboard} className="ml-2">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* New section for predefined gradients */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Tailwind CSS Pre-Made Gradients</h2>
                    <p className="mb-4">Need inspiration? Here are some groovy pre-made Tailwind CSS gradients for you. Just click "Copy" and paste into your Tailwind CSS project.</p>
                    
                    <Button onClick={() => setShowExamples(!showExamples)} className="mb-4">
                        {showExamples ? "Hide Examples" : "Show Examples"}
                        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showExamples ? "rotate-180" : ""}`} />
                    </Button>

                    <AnimatePresence>
                        {showExamples && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >
                                {[
                                    { name: "Sunset", class: "bg-gradient-to-r from-orange-500 to-pink-500" },
                                    { name: "Deep Ocean", class: "bg-gradient-to-r from-blue-600 to-teal-400" },
                                    { name: "Tropical Forest", class: "bg-gradient-to-r from-green-400 to-emerald-600" },
                                    { name: "Northern Lights", class: "bg-gradient-to-r from-purple-500 to-indigo-500" },
                                    { name: "Campfire", class: "bg-gradient-to-r from-yellow-400 to-red-500" },
                                    { name: "Morning Mist", class: "bg-gradient-to-r from-gray-300 to-blue-200" },
                                    { name: "Twilight", class: "bg-gradient-to-r from-indigo-700 to-purple-800" },
                                    { name: "Lemon Lime", class: "bg-gradient-to-r from-yellow-300 to-lime-400" },
                                    { name: "Cherry Raspberry", class: "bg-gradient-to-r from-red-400 to-pink-600" },
                                    { name: "Glacier", class: "bg-gradient-to-r from-cyan-200 to-blue-400" },
                                    { name: "Desert", class: "bg-gradient-to-r from-yellow-600 to-orange-500" },
                                    { name: "Lavender", class: "bg-gradient-to-r from-purple-300 to-pink-300" }
                                ].map((gradient, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow p-4">
                                        <div className={`h-24 rounded-lg mb-2 ${gradient.class}`}></div>
                                        <p className="font-medium mb-2">{gradient.name}</p>
                                        <div className="flex items-center justify-between">
                                            <code className="text-sm bg-gray-100 p-1 rounded">{gradient.class}</code>
                                            <Button onClick={() => {
                                                navigator.clipboard.writeText(gradient.class);
                                                // You can add a copy notification here if you wish
                                            }} size="sm">
                                                <Copy className="h-4 w-4" />
                                            </Button>
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

export default TailwindGradientGenerator;