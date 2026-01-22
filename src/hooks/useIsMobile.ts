import { useState, useEffect } from "react";

/**
 * Detects whether the viewport matches mobile breakpoint (≤768px).
 *
 * Uses MediaQueryList for efficient change detection without polling.
 * Initial state is false (SSR-safe default).
 *
 * @returns boolean indicating mobile viewport status
 * @cleanup Removes media query change listener
 */
export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };

        checkMobile();

        const mediaQuery = window.matchMedia("(max-width: 768px)");
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return isMobile;
}
