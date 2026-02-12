"use client";

import { useState, useEffect } from "react";
import { LinkItem } from "@/types/content";

interface NavbarProps {
    items: LinkItem[];
}

/**
 * Responsive navigation bar with mobile drawer.
 *
 * Desktop: Horizontal link row with hover states.
 * Mobile: Hamburger button toggles full-screen overlay drawer.
 *
 * Feather icons are replaced on mount and on menu toggle to ensure
 * dynamically rendered icons are processed.
 */
export default function Navbar({ items }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).feather) {
            (window as any).feather.replace();
        }
    }, [isOpen]);

    return (
        <nav
            id="navbar"
            className="bg-[#3A5A7A]/80 backdrop-blur-md border-b border-secondary/20 fixed w-full z-50 transition-shadow duration-300"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <a href="#home" className="flex items-center space-x-3">
                            <img src="/images/draw.png" alt="Architecode" className="h-8" />
                            <img
                                src="/images/text.png"
                                alt="Architecode Logo"
                                className="h-5"
                            />
                        </a>
                    </div>

                    <div className="hidden md:ml-6 md:block">
                        <div className="flex space-x-2">
                            {items.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="text-white hover:text-[#FFFFFF] font-medium px-4 py-2 rounded-lg transition duration-200 hover:bg-white/10 flex items-center space-x-2"
                                >
                                    <i data-feather={item.icon} className="w-4 h-4"></i>
                                    <span>{item.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            id="mobile-menu-button"
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <i data-feather="menu" className="w-6 h-6"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div
                id="mobile-menu"
                className={`md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-700 ease-in-out ${isOpen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsOpen(false)}
            >
                <div
                    className="bg-[#3A5A7A] w-full border-t border-secondary/20 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {items.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-white/10 hover:text-secundary block px-4 py-3 text-base font-medium transition duration-200 flex items-center space-x-3 border-b border-white/10 last:border-0"
                            >
                                <i data-feather={item.icon} className="w-5 h-5"></i>
                                <span>{item.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
