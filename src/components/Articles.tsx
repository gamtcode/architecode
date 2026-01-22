"use client";

import { useRef } from "react";
import { SectionHeader, FeatureItem } from "@/types/content";
import FadeUp from "./ui/FadeUp";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useScrollActive } from "@/hooks/useScrollActive";

interface ArticlesProps {
    header: SectionHeader;
    items: FeatureItem[];
}

/**
 * External articles listing section.
 *
 * Displays article cards with external links in a 3-column grid.
 * Uses `useScrollActive` for mobile card highlighting.
 */
export default function Articles({ header, items }: ArticlesProps) {
    const isMobile = useIsMobile();
    const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const activeIndex = useScrollActive({ items: cardRefs.current, enabled: isMobile });

    return (
        <section id="articles" className="py-20 bg-white text-primary scroll-mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeUp>
                    <div className="text-center mb-10 -translate-y-6">
                        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                            {header.title}
                        </h2>
                        <p className="text-slate-600 max-w-3xl mx-auto text-lg">
                            {header.description}
                        </p>
                    </div>
                </FadeUp>

                <ul className="grid md:grid-cols-3 gap-8 list-none p-0 m-0">
                    {items.map((item, index) => {
                        const isActive = isMobile && index === activeIndex;
                        return (
                            <FadeUp key={index} delay={index * 100} className="h-full">
                                <li className="h-full">
                                    <a
                                        href={item.link?.href}
                                        target="_blank"
                                        ref={(el) => { cardRefs.current[index] = el; }}
                                        className={`block bg-slate-50 rounded-lg overflow-hidden card-hover border transition-all duration-300 h-full md:hover:-translate-y-2 md:hover:shadow-xl md:hover:border-accent/50 ${isActive
                                            ? "shadow-xl border-accent/50"
                                            : "border-slate-200 shadow-lg"
                                            }`}
                                    >
                                        <div className="p-6">
                                            <p className="text-sm font-bold text-slate-500 mb-2">
                                                {item.link?.label}
                                            </p>
                                            <h3 className="font-heading font-semibold text-xl mb-3">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-600 text-justify hyphens-auto">
                                                {item.description}
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            </FadeUp>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
