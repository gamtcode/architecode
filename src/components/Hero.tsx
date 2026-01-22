"use client";
import { HeroContent } from "@/types/content";
import { useHeroRotatingText } from "@/hooks/useHeroRotatingText";
import { RotatingText } from "./RotatingText";

/**
 * Hero section composition layer.
 *
 * Orchestrates the rotating text animation by connecting
 * `useHeroRotatingText` (animation state) with `RotatingText` (rendering).
 * Contains no animation logic itself.
 */
export default function Hero({ rotatingPhrases }: HeroContent) {
    const { tokens, isGlobalVisible } = useHeroRotatingText({
        phrases: rotatingPhrases,
    });

    return (
        <section
            id="home"
            className="relative text-left md:text-center flex items-start md:items-center md:justify-center h-[40vh] min-h-[450px] overflow-hidden"
        >
            {/* sr-only H1 for SEO: visible text uses animated <p> for controlled rendering */}
            <h1 className="sr-only">
                Architecode - Consultoria de Arquitetura e Engenharia de Software
            </h1>
            <div className="absolute top-0 left-0 w-full h-full z-[-1]"></div>
            <div className="max-w-[1050px] mx-auto px-4 sm:px-6 lg:px-9 xl:px-9 w-full">
                <div className="w-full md:mx-auto pt-28 md:pt-0">
                    <RotatingText tokens={tokens} isGlobalVisible={isGlobalVisible} />
                </div>
            </div>
        </section>
    );
}
