'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        feather?: {
            replace: () => void;
        };
        tsParticles?: {
            load: (id: string, options: any) => void;
        };
    }
}

/**
 * Initializes external client-side libraries loaded via CDN.
 *
 * Handles Feather Icons replacement and tsParticles background animation.
 * Uses multiple initialization strategies to ensure reliability:
 * - Synchronous attempt (for cached/preloaded scripts)
 * - Window load event (for deferred scripts)
 * - MutationObserver (for dynamically injected icons)
 *
 * @lifecycle Mount-only effect with deterministic cleanup
 * @cleanup Removes load listener and disconnects MutationObserver
 */
export const useClientEffects = () => {
    useEffect(() => {
        const initFeather = () => {
            if (window.feather) {
                window.feather.replace();
            }
        };

        const initParticles = () => {
            if (window.tsParticles) {
                window.tsParticles.load("tsparticles-global", {
                    particles: {
                        number: { value: 60, density: { enable: true, value_area: 800 } },
                        color: { value: "#B0B9C2" },
                        shape: { type: "circle" },
                        opacity: { value: 0.5, random: true },
                        size: { value: 2, random: true },
                        move: {
                            enable: true,
                            speed: 1,
                            direction: "none",
                            out_mode: "out",
                        },
                        links: {
                            enable: true,
                            distance: 150,
                            color: "#00C1D4",
                            opacity: 0.4,
                            width: 1
                        }
                    },
                    interactivity: {
                        events: {
                            onhover: { enable: true, mode: "grab" },
                            onclick: { enable: true, mode: "push" }
                        },
                        modes: {
                            grab: { distance: 140, links: { opacity: 1 } },
                            push: { particles_nb: 4 }
                        }
                    },
                    detectRetina: true,
                });
            }
        };

        // Attempt immediate init for already-loaded scripts
        initFeather();
        initParticles();

        const handleLoad = () => {
            initFeather();
            initParticles();
        };

        window.addEventListener('load', handleLoad);

        // Observes DOM mutations to handle dynamically added feather icons
        const observer = new MutationObserver(() => {
            if (window.feather) window.feather.replace();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-feather']
        });

        return () => {
            window.removeEventListener('load', handleLoad);
            observer.disconnect();
        };
    }, []);
};
