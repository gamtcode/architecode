"use client";

import { useRef } from "react";
import { SectionHeader, FeatureItem } from "@/types/content";
import FadeUp from "./ui/FadeUp";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useScrollActive } from "@/hooks/useScrollActive";

interface SolutionsProps {
    header: SectionHeader;
    items: FeatureItem[];
}

/**
 * Solutions/cases grid section.
 *
 * Displays case study cards with external links in a 3-column grid.
 * Uses `useScrollActive` for mobile card highlighting.
 */
export default function Solutions({ header, items }: SolutionsProps) {
    const isMobile = useIsMobile();
    const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const activeIndex = useScrollActive({ items: cardRefs.current, enabled: isMobile });

    return (
        <section id="solutions" className="py-20 bg-slate-100 text-primary scroll-mt-16">
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

                <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 list-none p-0 m-0">
                    {items.map((item, index) => {
                        const isActive = isMobile && index === activeIndex;
                        return (
                            <FadeUp key={index} delay={index * 100} className="h-full">
                                <li className="h-full">
                                    <a
                                        href={item.link?.href}
                                        target="_blank"
                                        ref={(el) => { cardRefs.current[index] = el; }}
                                        onClick={() => {
                                            if (typeof window !== 'undefined' && window.gtag && item.link?.trackingId) {
                                                window.gtag('event', 'project_interest', {
                                                    event_category: 'micro_conversion',
                                                    event_label: item.link.trackingId
                                                });
                                            }
                                        }}
                                        className={`case-card group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border transition-all duration-300 md:hover:shadow-xl md:hover:-translate-y-2 md:hover:border-accent/50 transform-gpu ${isActive
                                            ? "shadow-xl border-accent/50"
                                            : "border-slate-200 shadow-lg"
                                            }`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                        <div className="p-8 flex flex-col h-full relative z-10">
                                            <div className="mb-6 pb-4 border-b border-slate-100">
                                                <div className="text-left w-full">
                                                    <h3 className="font-heading text-2xl mb-1 font-bold tracking-tight text-primary">
                                                        {item.title}
                                                    </h3>
                                                    {item.subtitle && (
                                                        <p className="text-sm font-medium text-slate-500">
                                                            {item.subtitle}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="card-content text-slate-600 mb-8 flex-grow leading-relaxed text-justify hyphens-auto">
                                                {item.description}
                                            </div>

                                            <div className="mt-auto">
                                                <span className="btn-solution w-full flex items-center justify-center px-6 py-4 rounded-lg bg-slate-100 text-[#3A5A7A] font-bold transition-all duration-300 shadow-sm transform-gpu">
                                                    {item.link?.label}
                                                    <i
                                                        data-feather="arrow-right"
                                                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                                    ></i>
                                                </span>
                                            </div>
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
