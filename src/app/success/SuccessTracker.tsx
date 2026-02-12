'use client';

import { useEffect, useRef } from 'react';

export default function SuccessTracker() {
    const eventFired = useRef(false);

    useEffect(() => {
        if (eventFired.current) return;
        eventFired.current = true;

        if (typeof window !== 'undefined' && window.gtag) {
            // GA4
            window.gtag('event', 'generate_lead', {
                event_category: 'conversion',
                event_label: 'form_submission'
            });

            // Google Ads
            window.gtag('event', 'conversion', {
                send_to: 'AW-17943626047/X6SJCM28mvcbEL-CmOxC'
            });
        }
    }, []);

    return null;
}
