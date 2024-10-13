'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ExternalLink, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
    const pathname = usePathname();
    const menuRef = useRef(null);
    const featuresRef = useRef(null);
    const [mobileFeatureOpen, setMobileFeatureOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
            if (featuresRef.current && !featuresRef.current.contains(event.target)) {
                setIsFeaturesOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
        setIsFeaturesOpen(false);
    }, [pathname]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsFeaturesOpen(false);
    };

    const toggleFeatures = (e) => {
        e.stopPropagation();
        setIsFeaturesOpen(!isFeaturesOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsFeaturesOpen(false);
    };

    const toggleMobileFeatures = (e) => {
        e.stopPropagation();
        setMobileFeatureOpen(!mobileFeatureOpen);
    };

    return (
        <nav className={`bg-white text-gray-800 w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg py-2' : 'py-4'}`}>
            <div className="container mx-auto px-4 flex items-center justify-between font-medium">
                <Link href="/" className="flex items-center z-20" onClick={closeMenu}>
                    <Image src="/favicon.ico" alt="ColorFusion Logo" width={32} height={32} className="mr-2" />
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">ColorFusion</span>
                </Link>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center">
                    <NavLink href="/" isActive={pathname === '/'}>Home</NavLink>
                    <div className="relative" ref={featuresRef}>
                        <button 
                            className="flex items-center text-gray-800 hover:text-yellow-500 transition duration-200"
                            onClick={toggleFeatures}
                        >
                            Features <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                        {isFeaturesOpen && (
                            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <FeatureLink href="/trend-palette-generator">Palette Generator</FeatureLink>
                                <FeatureLink href="/chroma-sync">Color Converter</FeatureLink>
                                <FeatureLink href="/tailwind-gradient-generator">Tailwind Gradient</FeatureLink>
                                <FeatureLink href="/css-background-patterns">CSS Patterns</FeatureLink>
                                <FeatureLink href="/blob-composition">Blob Composition</FeatureLink>
                                <FeatureLink href="/tailwind-shadow-generator">Tailwind Shadow</FeatureLink>
                                <FeatureLink href="/tailwind-table-generator">Table Generator</FeatureLink>
                                <FeatureLink href="/tailwind-grid-generator">Grid Generator</FeatureLink>
                                <FeatureLink href="/tailwind-code-visualizer">Code Visualizer</FeatureLink>
                            </div>
                        )}
                    </div>
                    <NavLink href="/about" isActive={pathname === '/about'}>About</NavLink>
                    <NavLink href="/contact" isActive={pathname === '/contact'}>Contact</NavLink>
                    <a href="https://github.com/njaga/colorfusion" target="_blank" rel="noopener noreferrer" className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full hover:bg-yellow-500 transition duration-200 font-semibold flex items-center">
                        Contribute <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden z-50 text-gray-800 hover:text-yellow-500 transition-colors duration-300" onClick={toggleMenu}>
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-white bg-opacity-95 z-40 md:hidden" ref={menuRef}>
                    <div className="flex flex-col items-center justify-center h-full space-y-8 overflow-y-auto">
                        <NavLink href="/" isActive={pathname === '/'} mobile>Home</NavLink>
                        <div className="flex flex-col items-center space-y-4">
                            <button 
                                className="text-2xl font-semibold text-gray-800 hover:text-yellow-500 transition duration-200"
                                onClick={toggleMobileFeatures}
                            >
                                Features {mobileFeatureOpen ? <ChevronUp className="inline ml-1 h-4 w-4" /> : <ChevronDown className="inline ml-1 h-4 w-4" />}
                            </button>
                            {mobileFeatureOpen && (
                                <div className="flex flex-col items-center space-y-2">
                                    <FeatureLink href="/trend-palette-generator" mobile>Palette Generator</FeatureLink>
                                    <FeatureLink href="/chroma-sync" mobile>Color Converter</FeatureLink>
                                    <FeatureLink href="/tailwind-gradient-generator" mobile>Tailwind Gradient</FeatureLink>
                                    <FeatureLink href="/css-background-patterns" mobile>CSS Patterns</FeatureLink>
                                    <FeatureLink href="/blob-composition" mobile>Blob Composition</FeatureLink>
                                    <FeatureLink href="/tailwind-shadow-generator" mobile>Tailwind Shadow</FeatureLink>
                                    <FeatureLink href="/tailwind-table-generator" mobile>Table Generator</FeatureLink>
                                    <FeatureLink href="/tailwind-grid-generator" mobile>Grid Generator</FeatureLink>
                                    <FeatureLink href="/tailwind-code-visualizer" mobile>Code Visualizer</FeatureLink>
                                </div>
                            )}
                        </div>
                        <NavLink href="/about" isActive={pathname === '/about'} mobile>About</NavLink>
                        <NavLink href="/contact" isActive={pathname === '/contact'} mobile>Contact</NavLink>
                        <a href="https://github.com/njaga/colorfusion" target="_blank" rel="noopener noreferrer" className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full hover:bg-yellow-500 transition duration-200 font-semibold flex items-center text-xl">
                            Contribute <ExternalLink className="ml-2 h-5 w-5" />
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}

function NavLink({ href, children, isActive, mobile }) {
    const baseClass = "transition duration-200 relative group";
    const activeClass = mobile ? "text-yellow-500" : "text-yellow-500";
    const inactiveClass = mobile ? "text-gray-800 hover:text-yellow-500" : "text-gray-800 hover:text-yellow-500";
    const mobileClass = mobile ? "text-2xl" : "";

    return (
        <Link
            href={href}
            className={`${baseClass} ${isActive ? activeClass : inactiveClass} ${mobileClass}`}
        >
            {children}
            {!mobile && (
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            )}
        </Link>
    );
}

function FeatureLink({ href, children, mobile }) {
    const baseClass = mobile
        ? "text-gray-800 hover:text-yellow-500 transition duration-200 text-xl"
        : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-500 transition duration-200";

    return (
        <Link href={href} className={baseClass}>
            {children}
        </Link>
    );
}
