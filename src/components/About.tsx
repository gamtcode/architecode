"use client";

import { useRef } from "react";
import { SectionHeader, FeatureItem } from "@/types/content";
import FadeUp from "./ui/FadeUp";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useScrollActive } from "@/hooks/useScrollActive";

interface AboutProps {
    header: SectionHeader;
    intro: string[];
    mission: string;
    items: FeatureItem[];
}

/**
 * About section with company introduction and value propositions.
 *
 * Structure: header → intro paragraphs → mission quote → feature cards.
 * Uses `useScrollActive` for mobile card highlighting.
 */
export default function About({
    header,
    intro,
    mission,
    items,
}: AboutProps) {
    const isMobile = useIsMobile();
    const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
    const activeIndex = useScrollActive({ items: cardRefs.current, enabled: isMobile });

    return (
        <section id="about" className="py-20 bg-white text-primary scroll-mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeUp>
                    <div className="max-w-7xl mx-auto mb-16">
                        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-center -translate-y-6">
                            {header.title}
                        </h2>
                        <div className="text-justify space-y-4 text-slate-700 text-lg hyphens-auto">
                            {intro.length > 0 && (
                                <p dangerouslySetInnerHTML={{ __html: intro[0] }} />
                            )}

                            {mission && (
                                <p className="font-heading text-lg font-normal italic text-slate-700 bg-slate-50 border-l-4 border-accent pl-6 pr-6 md:pr-12 py-4 my-8 text-justify">
                                    {mission}
                                </p>
                            )}

                            {intro.slice(1).map((paragraph, index) => (
                                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                            ))}
                        </div>
                    </div>
                </FadeUp>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0 m-0">
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
                                    <h3 className="font-heading font-bold text-xl mb-2 text-primary">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-600 text-justify hyphens-auto">
                                        {item.description}
                                    </p>
                                </li>
                            </FadeUp>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
