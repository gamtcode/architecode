'use client';

import { useEffect, useRef, useState } from 'react';

interface FadeUpProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

/**
 * Scroll-triggered entrance animation component.
 *
 * Uses IntersectionObserver for performant visibility detection
 * instead of scroll event listeners. Animation triggers once and
 * does not reverse — the observer is immediately disconnected after
 * the element enters the viewport.
 *
 * @param children - Content to animate
 * @param delay - Optional transition delay in milliseconds
 * @param className - Additional CSS classes
 *
 * @cleanup Disconnects observer on unmount (Strict Mode safe)
 */
export default function FadeUp({ children, delay = 0, className = '' }: FadeUpProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentRef = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                // 10% visibility threshold balances early reveal with perceived intent
                threshold: 0.1,
                // Negative bottom margin triggers animation slightly before element fully enters
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    const delayStyle = delay ? { transitionDelay: `${delay}ms` } : {};

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                } ${className}`}
            style={delayStyle}
        >
            {children}
        </div>
    );
}
