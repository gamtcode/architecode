"use client";

import { useRef } from "react";
import { SectionHeader, FeatureItem } from "@/types/content";
import FadeUp from "./ui/FadeUp";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useScrollActive } from "@/hooks/useScrollActive";

interface StructureProps {
    header: SectionHeader;
    problems: FeatureItem[];
    solutions: FeatureItem[];
}

/**
 * Problems vs Solutions comparison section.
 *
 * Two-column card layout contrasting pain points with Architecode solutions.
 * Uses `useScrollActive` for mobile card highlighting when centered in viewport.
 */
export default function Structure({
    header,
    problems,
    solutions,
}: StructureProps) {
    const isMobile = useIsMobile();
    const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
    const activeIndex = useScrollActive({ items: cardRefs.current, enabled: isMobile });

    const isActive0 = isMobile && activeIndex === 0;
    const isActive1 = isMobile && activeIndex === 1;

    return (
        <section id="structure" className="py-20 bg-slate-100 text-primary">
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
                <ul className="grid md:grid-cols-2 gap-8 items-stretch list-none p-0 m-0">
                    <FadeUp delay={100} className="h-full">
                        <li
                            ref={(el) => { cardRefs.current[0] = el; }}
                            className={`bg-white p-8 rounded-lg border transition-all duration-300 h-full md:hover:-translate-y-2 md:hover:shadow-xl md:hover:border-accent/50 ${isActive0
                                ? "shadow-xl border-accent/50"
                                : "border-slate-200 shadow-lg"
                                }`}
                        >
                            <h3 className="font-heading font-semibold text-xl mb-4 text-primary">
                                Problemas Comuns
                            </h3>
                            <ul className="space-y-4 text-slate-600">
                                {problems.map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        <div className="hexagon w-10 h-10 flex items-center justify-center bg-red-500/20 mr-4 flex-shrink-0">
                                            <i
                                                data-feather={item.icon}
                                                className="w-5 h-5 text-red-500"
                                            ></i>
                                        </div>
                                        <span>{item.description}</span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </FadeUp>

                    <FadeUp delay={200} className="h-full">
                        <li
                            ref={(el) => { cardRefs.current[1] = el; }}
                            className={`bg-white p-8 rounded-lg border transition-all duration-300 h-full md:hover:-translate-y-2 md:hover:shadow-xl md:hover:border-accent/50 ${isActive1
                                ? "shadow-xl border-accent/50"
                                : "border-slate-200 shadow-lg"
                                }`}
                        >
                            <h3 className="font-heading font-semibold text-xl mb-4 text-primary">
                                Soluções Architecode
                            </h3>
                            <ul className="space-y-4 text-slate-600">
                                {solutions.map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        <div className="hexagon w-10 h-10 flex items-center justify-center bg-accent/20 mr-4 flex-shrink-0">
                                            <i
                                                data-feather={item.icon}
                                                className="w-5 h-5 text-accent"
                                            ></i>
                                        </div>
                                        <span>{item.description}</span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </FadeUp>
                </ul>
            </div>
        </section>
    );
}
