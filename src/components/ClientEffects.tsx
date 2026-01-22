'use client';

import { useClientEffects } from '../hooks/useClientEffects';

/**
 * Bridge component that activates client-side effects.
 *
 * Renders nothing — exists solely to invoke `useClientEffects` hook
 * which initializes Feather Icons and tsParticles.
 */
export const ClientEffects = () => {
    useClientEffects();
    return null;
};
