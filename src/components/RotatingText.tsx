import React from 'react';
import type { Token } from '../hooks/useHeroRotatingText';

interface RotatingTextProps {
    /** Precomputed tokens from useHeroRotatingText (words and breaks with visibility state) */
    tokens: Token[];

    /** Controls container fade-out transition; managed by useHeroRotatingText */
    isGlobalVisible: boolean;
}

/**
 * Pure presentational renderer for the Hero rotating text animation.
 *
 * This component contains NO animation logic, timers, or state management.
 * It receives fully-computed tokens from `useHeroRotatingText` and renders
 * them with CSS opacity transitions.
 *
 * Architecture notes:
 * - Separation of concerns: hook owns timing, component owns rendering
 * - Break tokens render as <br> visible only on mobile (md:hidden)
 * - Word spacing uses trailing space to match legacy CSS behavior
 */
export const RotatingText = ({ tokens, isGlobalVisible }: RotatingTextProps) => {
    return (
        <p
            id="rotating-text"
            className={`
        font-heading font-bold text-white leading-snug md:!leading-snug
        text-[clamp(1.3rem,9vw,2.25rem)] sm:text-4xl md:text-5xl lg:text-6xl
        transition-opacity duration-[800ms] ease-in-out
        ${isGlobalVisible ? 'opacity-100' : 'opacity-0'}
      `}
        >
            {tokens.map((token) => {
                if (token.type === 'break') {
                    // Line breaks only visible on mobile for responsive text wrapping
                    return <br key={token.id} className="md:hidden" />;
                }

                return (
                    <span
                        key={token.id}
                        className={`
              transition-opacity duration-1000 px-0
              ${token.isVisible ? 'opacity-100' : 'opacity-0'}
            `}
                    >
                        {/* Trailing space matches legacy layout behavior */}
                        {token.text}{' '}
                    </span>
                );
            })}
        </p>
    );
};
