"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Link from "next/link";
import {
    ArrowLeft,
    Copy,
    Download,
    Globe,
    Linkedin,
    Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToastProvider } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { saveAs } from 'file-saver';
import { toPng } from 'html-to-image';
import GIF from 'gif.js';

const ShapeGenerator = () => {
    const [shapeColor, setShapeColor] = useState("#facc15");
    const [shapeSize, setShapeSize] = useState(350);
    const [shapeComplexity, setShapeComplexity] = useState(12);
    const [shapeSeed, setShapeSeed] = useState(Math.random());
    const { toast } = useToast();
    const [animation, setAnimation] = useState({
        entrance: "none",
        easing: "easeOut",
        duration: 2,
        loop: "none",
        rotation: 0
    });
    const controls = useAnimation();
    const blobRef = useRef(null);

    const generateBlobPath = useCallback(() => {
        const slice = (Math.PI * 2) / shapeComplexity;
        const points = [];

        const randomRange = (min, max) => Math.random() * (max - min) + min;

        for (let i = 0; i < shapeComplexity; i++) {
            const angle = slice * i;
            const radius = randomRange(0.7, 1);
            points.push([Math.cos(angle) * radius, Math.sin(angle) * radius]);
        }

        const catmullRom = (p0, p1, p2, p3, t) => {
            const v0 = (p2[0] - p0[0]) / 2,
                v1 = (p3[0] - p1[0]) / 2;
            const v2 = (p2[1] - p0[1]) / 2,
                v3 = (p3[1] - p1[1]) / 2;
            const t2 = t * t,
                t3 = t * t * t;
            return [
                (2 * p1[0] - 2 * p2[0] + v0 + v1) * t3 +
                (-3 * p1[0] + 3 * p2[0] - 2 * v0 - v1) * t2 +
                v0 * t +
                p1[0],
                (2 * p1[1] - 2 * p2[1] + v2 + v3) * t3 +
                (-3 * p1[1] + 3 * p2[1] - 2 * v2 - v3) * t2 +
                v2 * t +
                p1[1],
            ];
        };

        let path = `M ${(points[0][0] * 100 + 100).toFixed(2)} ${(points[0][1] * 100 + 100).toFixed(2)} C `;

        for (let i = 0; i < points.length; i++) {
            const p0 = points[(i - 1 + points.length) % points.length];
            const p1 = points[i];
            const p2 = points[(i + 1) % points.length];
            const p3 = points[(i + 2) % points.length];

            for (let t = 0; t <= 1; t += 0.05) {
                const pt = catmullRom(p0, p1, p2, p3, t);
                path += `${(pt[0] * 100 + 100).toFixed(2)} ${(pt[1] * 100 + 100).toFixed(2)} `;
            }
        }

        path += "Z";
        return path;
    }, [shapeComplexity, shapeSeed]);

    const [shapePath, setShapePath] = useState("");

    useEffect(() => {
        setShapePath(generateBlobPath());
    }, [shapeComplexity, shapeSeed, generateBlobPath]);

    const downloadVectorFile = () => {
        const svgContent = `
<svg width="${shapeSize}" height="${shapeSize}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path d="${shapePath}" fill="${shapeColor}" />
</svg>`;
        const blob = new Blob([svgContent], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `blob-shape.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast({
            title: "Vector File Downloaded",
            description: "The vector file has been downloaded successfully.",
            variant: "success",
        });
    };

    const exportSVG = () => {
        const svgContent = `
<svg width="${shapeSize}" height="${shapeSize}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path d="${shapePath}" fill="${shapeColor}" />
</svg>`;
        const blob = new Blob([svgContent], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `blob-shape.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const animateBlob = useCallback(() => {
        const animations = {
            none: {},
            morphing: {
                d: [shapePath, generateBlobPath(), shapePath],
                transition: { duration: 3, repeat: Infinity }
            },
            liquidMetal: {
                filter: ["blur(0px)", "blur(10px)", "blur(0px)"],
                scale: [1, 1.1, 1],
                transition: { duration: 3, repeat: Infinity }
            },
            pulsingGlow: {
                boxShadow: [
                    "0 0 20px rgba(255, 255, 255, 0.3)",
                    "0 0 60px rgba(255, 255, 255, 0.6)",
                    "0 0 20px rgba(255, 255, 255, 0.3)"
                ],
                scale: [1, 1.05, 1],
                transition: { duration: 2, repeat: Infinity }
            },
            neonPulse: {
                filter: [
                    "drop-shadow(0 0 5px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
                    "drop-shadow(0 0 15px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.7))",
                    "drop-shadow(0 0 5px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
                ],
                scale: [1, 1.05, 1],
                transition: { duration: 2, repeat: Infinity }
            },
            elastic: {
                scale: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
                transition: { duration: 2, repeat: Infinity }
            },
        };

        const loopAnimations = {
            none: {},
            wobble: {
                scale: [1, 1.1, 0.9, 1.05, 0.95, 1],
                rotate: [0, -3, 3, -3, 3, 0],
                transition: { duration: 3, repeat: Infinity }
            },
            jellyfish: {
                scale: [1, 0.9, 1.1, 1],
                y: [0, 10, -10, 0],
                transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            },
            orbit: {
                x: [0, 50, 0, -50, 0],
                y: [-50, 0, 50, 0, -50],
                scale: [1, 1.1, 1, 0.9, 1],
                transition: { duration: 5, repeat: Infinity, ease: "linear" }
            },
            wave: {
                y: [0, 30, 0, -30, 0],
                x: [0, 15, 0, -15, 0],
                transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            },
        };

        if (animation.entrance !== "none") {
            controls.start({
                ...animations[animation.entrance],
                transition: {
                    duration: animation.duration,
                    ease: animation.easing,
                },
            });
        }

        if (animation.loop !== "none") {
            controls.start({
                ...loopAnimations[animation.loop],
                rotate: animation.rotation,
            });
        } else {
            controls.start({ rotate: animation.rotation });
        }
    }, [animation, controls, shapePath, generateBlobPath]);

    useEffect(() => {
        animateBlob();
    }, [animation, animateBlob]);

    const exportGif = useCallback(async () => {
        const gif = new GIF({
            workers: 2,
            quality: 10,
            width: shapeSize,
            height: shapeSize,
            workerScript: '/gif.worker.js',
        });
    
        const frames = 60;
        const duration = 2000; // Total duration of the GIF in milliseconds
    
        const canvas = document.createElement('canvas');
        canvas.width = shapeSize;
        canvas.height = shapeSize;
        canvas.setAttribute('willReadFrequently', 'true');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
        for (let i = 0; i < frames; i++) {
            await new Promise(resolve => setTimeout(resolve, duration / frames));
            const blob = blobRef.current;
            if (blob) {
                const svgString = new XMLSerializer().serializeToString(blob);
                const img = new Image();
                img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
                await new Promise(resolve => img.onload = resolve);
                
                ctx.clearRect(0, 0, shapeSize, shapeSize);
                ctx.drawImage(img, 0, 0, shapeSize, shapeSize);
                
                gif.addFrame(ctx, { copy: true, delay: duration / frames });
            }
        }
    
        gif.on('finished', (blob) => {
            saveAs(blob, 'animated-blob.gif');
            toast({
                title: "GIF exported successfully",
                description: "Your animated blob has been saved as a GIF.",
                variant: "success",
            });
        });
    
        gif.render();
    }, [shapeSize, blobRef, toast]);

    return (
        <ToastProvider>
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.h1
                        className="text-4xl sm:text-5xl font-extrabold text-gray-800 text-center mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Blob Generator
                    </motion.h1>
    
                    <motion.div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="shapeColor">Blob Color</Label>
                                    <div className="flex items-center mt-1">
                                        <Input
                                            id="shapeColor"
                                            type="color"
                                            value={shapeColor}
                                            onChange={(e) => setShapeColor(e.target.value)}
                                            className="w-12 h-12 p-1 border-none"
                                        />
                                        <Input
                                            type="text"
                                            value={shapeColor}
                                            onChange={(e) => setShapeColor(e.target.value)}
                                            className="ml-2 flex-grow"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="shapeSize">Blob Size: {shapeSize}px</Label>
                                    <Slider
                                        id="shapeSize"
                                        min={50}
                                        max={500}
                                        step={1}
                                        value={[shapeSize]}
                                        onValueChange={([value]) => setShapeSize(value)}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="shapeComplexity">
                                        Complexity: {shapeComplexity}
                                    </Label>
                                    <Slider
                                        id="shapeComplexity"
                                        min={3}
                                        max={15}
                                        step={1}
                                        value={[shapeComplexity]}
                                        onValueChange={([value]) => setShapeComplexity(value)}
                                        className="mt-1"
                                    />
                                </div>
                                <Button onClick={() => setShapeSeed(Math.random())}>
                                    Regenerate Blob
                                </Button>
                                <Tabs defaultValue="entrance">
                                    <TabsList>
                                        <TabsTrigger value="entrance">Entrance</TabsTrigger>
                                        <TabsTrigger value="loop">Loop</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="entrance">
                                        <Select
                                            onValueChange={(value) =>
                                                setAnimation({ ...animation, entrance: value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose an entrance animation" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">No animation</SelectItem>
                                                <SelectItem value="morphing">Morphing</SelectItem>
                                                <SelectItem value="liquidMetal">Liquid Metal</SelectItem>
                                                <SelectItem value="pulsingGlow">Pulsing Glow</SelectItem>
                                                <SelectItem value="neonPulse">Neon Pulse</SelectItem>
                                                <SelectItem value="elastic">Elastic</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TabsContent>
                                    <TabsContent value="loop">
                                        <Select
                                            onValueChange={(value) =>
                                                setAnimation({ ...animation, loop: value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose a loop animation" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">No animation</SelectItem>
                                                <SelectItem value="wobble">Wobble</SelectItem>
                                                <SelectItem value="jellyfish">Jellyfish</SelectItem>
                                                <SelectItem value="orbit">Orbit</SelectItem>
                                                <SelectItem value="wave">Wave</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TabsContent>
                                </Tabs>
                                <Select
                                    onValueChange={(value) =>
                                        setAnimation({ ...animation, easing: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose an easing" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="linear">Linear</SelectItem>
                                        <SelectItem value="easeIn">Ease In</SelectItem>
                                        <SelectItem value="easeOut">Ease Out</SelectItem>
                                        <SelectItem value="easeInOut">Ease In Out</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div>
                                    <Label htmlFor="duration">Duration: {animation.duration}s</Label>
                                    <Slider
                                        id="duration"
                                        min={0.1}
                                        max={5}
                                        step={0.1}
                                        value={[animation.duration]}
                                        onValueChange={([value]) =>
                                            setAnimation({ ...animation, duration: value })
                                        }
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="rotation">Rotation: {animation.rotation}°</Label>
                                    <Slider
                                        id="rotation"
                                        min={0}
                                        max={360}
                                        step={1}
                                        value={[animation.rotation]}
                                        onValueChange={([value]) =>
                                            setAnimation({ ...animation, rotation: value })
                                        }
                                    />
                                </div>
                            </div>
                            <div
                                className="flex justify-center items-center bg-gray-200 rounded-lg p-4"
                                style={{ minHeight: "300px" }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.svg
                                        ref={blobRef}
                                        key={shapePath}
                                        width={shapeSize}
                                        height={shapeSize}
                                        viewBox="0 0 200 200"
                                        animate={controls}
                                        style={{ willChange: 'transform' }}
                                    >
                                        <motion.path
                                            d={shapePath}
                                            fill={shapeColor}
                                        />
                                    </motion.svg>
                                </AnimatePresence>
                            </div>
                        </div>
    
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button onClick={downloadVectorFile}>
                                <Download className="h-4 w-4 mr-2" />
                                Download Vector File
                            </Button>
                            <Button onClick={exportSVG}>
                                <Download className="h-4 w-4 mr-2" />
                                Export as SVG
                            </Button>
                            <Button onClick={exportGif}>
                                <Download className="h-4 w-4 mr-2" />
                                Export as GIF
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </ToastProvider>
    );
};

export default ShapeGenerator;