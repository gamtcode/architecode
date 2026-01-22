import { useEffect, useState, useRef } from "react";

/**
 * Props for configuring scroll-based active section detection.
 *
 * @property items - Array of DOM elements to observe
 * @property enabled - Enables/disables observation (default: true)
 * @property rootMargin - IntersectionObserver margin; default creates a 20% detection strip in viewport center
 */
interface UseScrollActiveProps {
    items: (HTMLElement | null)[];
    enabled?: boolean;
    rootMargin?: string;
}

/**
 * Tracks which section is currently "active" based on scroll position.
 *
 * Uses IntersectionObserver with a narrow center-viewport detection zone.
 * The default rootMargin "-40% 0px -40% 0px" creates a 20%-height strip
 * in the middle of the viewport — only elements intersecting this zone
 * are considered for active state.
 *
 * @param props - Configuration including items to observe and rootMargin
 * @returns Index of the currently active item, or null if none
 * @cleanup Disconnects observer on unmount or dependency change
 */
export function useScrollActive({
    items,
    enabled = true,
    rootMargin = "-40% 0px -40% 0px",
}: UseScrollActiveProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (!enabled || items.length === 0) {
            setActiveIndex(null);
            return;
        }

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            // When multiple items intersect the narrow zone, the last entering element wins
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = items.indexOf(entry.target as HTMLElement);
                    if (index !== -1) {
                        setActiveIndex(index);
                    }
                }
            });
        };

        observerRef.current = new IntersectionObserver(handleIntersect, {
            rootMargin,
            threshold: [0, 0.5, 1.0],
        });

        items.forEach((item) => {
            if (item) observerRef.current?.observe(item);
        });

        return () => {
            observerRef.current?.disconnect();
        };
    }, [items, enabled, rootMargin]);

    return activeIndex;
}
