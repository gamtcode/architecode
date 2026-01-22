"use client";

import { useRef } from "react";
import { SectionHeader, FeatureItem } from "@/types/content";
import FadeUp from "./ui/FadeUp";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useScrollActive } from "@/hooks/useScrollActive";

interface ServicesProps {
    header: SectionHeader;
    items: FeatureItem[];
}

/**
 * Services grid section.
 *
 * Displays service offerings in a 3-column grid (mobile: 1 column).
 * Uses `useScrollActive` for mobile card highlighting.
 */
export default function Services({ header, items }: ServicesProps) {
    const isMobile = useIsMobile();
    const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
    const activeIndex = useScrollActive({ items: cardRefs.current, enabled: isMobile });

    return (
        <section id="services" className="py-20 bg-white text-primary scroll-mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeUp>
                    <div className="text-center mb-10 -translate-y-6">
                        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                            {header.title}
                        </h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
                            {header.description}
                        </p>
                    </div>
                </FadeUp>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 list-none p-0 m-0">
                    {items.map((item, index) => {
                        const isActive = isMobile && index === activeIndex;
                        return (
                            <FadeUp key={index} delay={index * 100} className="h-full">
                                <li
                                    ref={(el) => { cardRefs.current[index] = el; }}
                                    className={`bg-slate-50 p-8 rounded-lg text-center card-hover border transition-all duration-300 h-full md:hover:-translate-y-2 md:hover:shadow-xl md:hover:border-accent/50 ${isActive
                                        ? "shadow-xl border-accent/50"
                                        : "border-slate-200 shadow-lg"
                                        }`}
                                >
                                    <div className="hexagon bg-accent/20 w-16 h-16 mb-6 mx-auto flex items-center justify-center">
                                        <i data-feather={item.icon} className="w-8 h-8 text-accent"></i>
                                    </div>
                                    <h3 className="font-heading text-xl font-bold mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-600 text-justify">{item.description}</p>
                                </li>
                            </FadeUp>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
