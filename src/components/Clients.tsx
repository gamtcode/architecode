"use client";

import { useRef } from "react";
import { SectionHeader, TestimonialItem } from "@/types/content";
import FadeUp from "./ui/FadeUp";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useScrollActive } from "@/hooks/useScrollActive";

interface ClientsProps {
    header: SectionHeader;
    items: TestimonialItem[];
}

/**
 * Testimonials section with scroll-activated card highlighting.
 *
 * Uses `useScrollActive` to detect which card is centered on mobile,
 * applying elevated visual treatment (shadow, border) to the active card.
 * Desktop relies on hover states instead.
 */
export default function Clients({ header, items }: ClientsProps) {
    const isMobile = useIsMobile();
    const cardRefs = useRef<(HTMLQuoteElement | null)[]>([]);
    const activeIndex = useScrollActive({ items: cardRefs.current, enabled: isMobile });

    return (
        <section id="clients" className="py-20 bg-slate-100 text-primary scroll-mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeUp>
                    <div className="text-center mb-10 -translate-y-6">
                        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                            {header.title.split("BRBREAK").map((part, index) => (
                                <span key={index}>
                                    {part.trim()}
                                    {index < header.title.split("BRBREAK").length - 1 && (
                                        <br className="block md:hidden" />
                                    )}
                                    {index < header.title.split("BRBREAK").length - 1 && <span className="hidden md:inline"> </span>}
                                </span>
                            ))}
                        </h2>
                        <p className="text-slate-600 max-w-3xl mx-auto text-lg">
                            {header.description}
                        </p>
                    </div>
                </FadeUp>
                <ul className="grid lg:grid-cols-2 gap-8 list-none p-0 m-0">
                    {items.map((testimonial, index) => {
                        const isActive = isMobile && index === activeIndex;
                        return (
                            <FadeUp key={index} delay={index * 100} className="h-full">
                                <li className="h-full">
                                    <blockquote
                                        ref={(el) => { cardRefs.current[index] = el; }}
                                        className={`bg-white p-8 rounded-lg border transition-all duration-300 h-full md:hover:-translate-y-2 md:hover:shadow-xl md:hover:border-accent/50 ${isActive
                                            ? "shadow-xl border-accent/50"
                                            : "border-slate-200 shadow-lg"
                                            }`}
                                    >
                                        <p className="text-lg text-slate-600 italic text-justify hyphens-auto">
                                            &ldquo;{testimonial.quote}&rdquo;
                                        </p>
                                        <footer className="mt-6">
                                            <div className="font-bold text-primary">
                                                {testimonial.company}
                                            </div>
                                            <div className="text-slate-500">
                                                {testimonial.author} {/* | {testimonial.role} */}
                                            </div>
                                            {testimonial.link && (
                                                <a
                                                    href={testimonial.link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-accent hover:underline mt-2 inline-block"
                                                >
                                                    {testimonial.link.label}
                                                </a>
                                            )}
                                        </footer>
                                    </blockquote>
                                </li>
                            </FadeUp>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
