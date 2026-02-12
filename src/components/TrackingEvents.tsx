'use client';

import { useEffect, useRef } from 'react';

export default function TrackingEvents() {
    const scrollTriggered = useRef(false);
    const timeTriggered = useRef(false);

    useEffect(() => {
        // Scroll Tracking (70%)
        const handleScroll = () => {
            if (scrollTriggered.current) return;

            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            if (scrollPercent >= 70) {
                scrollTriggered.current = true;
                if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'scroll_70_percent', {
                        event_category: 'micro_conversion'
                    });
                }
            }
        };

        // Time Tracking (90s)
        const timer = setTimeout(() => {
            if (timeTriggered.current) return;
            timeTriggered.current = true;
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'engaged_90s', {
                    event_category: 'engagement'
                });
            }
        }, 90000);

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    return null;
}
