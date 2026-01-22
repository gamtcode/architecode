import { useState, useEffect, useRef } from 'react';

// --- Types ---

export interface RotatingTextConfig {
    phrases: string[];
    wordStaggerMs?: number;
    holdDurationMs?: number;
    fadeOutDurationMs?: number;
}

export type Token = {
    id: string;
    text: string;
    type: 'word' | 'break';
    isVisible: boolean;
};

export interface RotatingTextState {
    currentPhraseIndex: number;
    tokens: Token[];
    isGlobalVisible: boolean;
}

// --- Pure Helper Functions ---

/**
 * Parses a phrase string into an array of Tokens for animation.
 *
 * @param phrase - Raw phrase string; use 'BRBREAK' for line breaks
 * @param phraseIndex - Index used for generating stable token IDs
 * @returns Array of Token objects with deterministic IDs
 */
function parsePhraseToTokens(phrase: string, phraseIndex: number): Token[] {
    const rawParts = phrase.split(' ');

    return rawParts.map((part, index) => {
        const isBreak = part === 'BRBREAK';
        return {
            id: `p-${phraseIndex}-t-${index}-${part}`,
            text: isBreak ? '' : part,
            type: isBreak ? 'break' : 'word',
            isVisible: false,
        };
    });
}

// --- Hook Implementation ---

/**
 * Manages the Hero section's rotating text animation state machine.
 *
 * Implements a 4-phase animation cycle:
 * 1. CASCADE_IN: Words appear sequentially with staggered timing
 * 2. HOLD: Phrase remains visible for the hold duration
 * 3. FADE_OUT: Global opacity transition triggers fade
 * 4. SWAP: Next phrase is loaded and cycle restarts
 *
 * @param config - Animation configuration with phrases and timing parameters
 * @returns Current animation state including tokens and visibility flags
 *
 * @lifecycle Effect re-runs on phrase index change to drive the cycle
 * @cleanup Clears all pending timeouts on unmount or re-run (Strict Mode safe)
 */
export function useHeroRotatingText({
    phrases,
    wordStaggerMs = 400,
    holdDurationMs = 2000,
    fadeOutDurationMs = 800,
}: RotatingTextConfig): RotatingTextState {
    const [state, setState] = useState<RotatingTextState>(() => {
        return {
            currentPhraseIndex: 0,
            tokens: parsePhraseToTokens(phrases[0], 0),
            isGlobalVisible: true,
        };
    });

    const activeTimeouts = useRef<NodeJS.Timeout[]>([]);

    const clearAllTimeouts = () => {
        activeTimeouts.current.forEach(clearTimeout);
        activeTimeouts.current = [];
    };

    useEffect(() => {
        // Clear pending timers from previous cycle or Strict Mode double-mount
        clearAllTimeouts();

        const { currentPhraseIndex } = state;

        // Re-parse tokens for Strict Mode resilience
        const currentTokens = parsePhraseToTokens(phrases[currentPhraseIndex], currentPhraseIndex);

        const wordTokens = currentTokens.filter(t => t.type === 'word');
        const wordCount = wordTokens.length;

        // Phase 1: CASCADE_IN — schedule staggered visibility for each word
        let wordIndexCounter = 0;
        const initialDelay = 100;

        currentTokens.forEach((token, index) => {
            if (token.type === 'break') return;

            const delay = initialDelay + (wordIndexCounter * wordStaggerMs);
            wordIndexCounter++;

            const timeoutId = setTimeout(() => {
                setState(prev => {
                    const newTokens = [...prev.tokens];
                    if (newTokens[index]) {
                        newTokens[index] = { ...newTokens[index], isVisible: true };
                    }
                    return { ...prev, tokens: newTokens };
                });
            }, delay);

            activeTimeouts.current.push(timeoutId);
        });

        // Phase 2-3: HOLD then FADE_OUT
        // Timing: (words × stagger) + holdDuration
        const timeToFadeOut = (wordStaggerMs * wordCount) + holdDurationMs;

        const fadeOutId = setTimeout(() => {
            setState(prev => ({ ...prev, isGlobalVisible: false }));
        }, timeToFadeOut);

        activeTimeouts.current.push(fadeOutId);

        // Phase 4: SWAP — load next phrase after fade completes
        const totalCycleDuration = timeToFadeOut + fadeOutDurationMs;

        const swapId = setTimeout(() => {
            setState(prev => {
                const nextIndex = (prev.currentPhraseIndex + 1) % phrases.length;
                return {
                    currentPhraseIndex: nextIndex,
                    tokens: parsePhraseToTokens(phrases[nextIndex], nextIndex),
                    isGlobalVisible: true,
                };
            });
        }, totalCycleDuration);

        activeTimeouts.current.push(swapId);

        return clearAllTimeouts;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.currentPhraseIndex, phrases, wordStaggerMs, holdDurationMs, fadeOutDurationMs]);

    return state;
}
