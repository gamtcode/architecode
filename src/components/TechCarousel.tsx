"use client";

import { useRef, useEffect, useState } from "react";
import { TechItem, SectionHeader } from "@/types/content";
import FadeUp from "./ui/FadeUp";

interface TechCarouselProps {
    items: TechItem[];
    label: SectionHeader;
}

/**
 * Physics-based infinite carousel with touch/mouse interaction.
 *
 * Behavior model:
 * 1. AUTO-SCROLL: Continuous rightward movement at baseSpeed
 * 2. DRAG: User touch/mouse controls scroll position directly
 * 3. MOMENTUM: After drag release, velocity decays with friction
 * 4. RESUME: When momentum stops, returns to auto-scroll
 *
 * Uses requestAnimationFrame for smooth 60fps updates rather than
 * CSS animations, enabling seamless physics transitions.
 *
 * Mobile UX: Tap on card shows caption, then resumes after delay.
 * Desktop UX: Hover pauses carousel, mouseout resumes.
 */
export default function TechCarousel({ items, label }: TechCarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const firstSetRef = useRef<HTMLUListElement>(null);

    // --- Engine State ---
    const isPaused = useRef(false);
    const animationId = useRef<number>(0);
    const resumeTimeout = useRef<NodeJS.Timeout | null>(null);

    // --- Mobile UX State ---
    const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

    // --- Drag Physics ---
    const dragStartX = useRef(0);
    const dragStartScroll = useRef(0);
    const isDragging = useRef(false);

    // --- Momentum Physics ---
    const lastDragX = useRef(0);
    const lastDragTime = useRef(0);
    const velocity = useRef(0);
    const isMomentum = useRef(false);

    // Physics tuning constants (empirically optimized for natural feel)
    const MAX_VELOCITY = 40;    // Clamp to prevent runaway speed
    const THROW_VELOCITY = 25;  // Arrow button impulse magnitude
    const FRICTION = 0.95;      // Per-frame velocity decay
    const STOP_THRESHOLD = 0.5; // Velocity below which momentum ends


    /**
     * Atomic reset to auto-scroll state.
     * Guarantees: if carousel is moving, caption is cleared.
     */
    const resumeMovement = () => {
        isPaused.current = false;
        isMomentum.current = false;
        velocity.current = 0;
        setActiveItemIndex(null);
    };

    // --- Animation Loop ---
    useEffect(() => {
        const carousel = carouselRef.current;
        const firstSet = firstSetRef.current;
        if (!carousel || !firstSet) return;

        const isMobile = window.innerWidth < 768;
        const baseSpeed = isMobile ? 1.0 : 0.5;

        const singleSetWidth = firstSet.offsetWidth;
        if (carousel.scrollLeft < 10) {
            carousel.scrollLeft = singleSetWidth;
        }

        const animate = () => {
            if (!carousel) return;

            // Phase: DRAG — scroll controlled by touch/mouse events
            if (isDragging.current) {
                // No-op: events handle position
            }
            // Phase: MOMENTUM — velocity decays until threshold
            else if (isMomentum.current) {
                carousel.scrollLeft -= velocity.current;
                velocity.current *= FRICTION;

                checkResets(carousel, firstSet.offsetWidth);

                if (Math.abs(velocity.current) < STOP_THRESHOLD) {
                    resumeMovement();
                }
            }
            // Phase: AUTO-SCROLL — constant rightward movement
            else if (!isPaused.current) {
                carousel.scrollLeft += baseSpeed;
                checkResets(carousel, firstSet.offsetWidth);
            }

            animationId.current = requestAnimationFrame(animate);
        };

        animationId.current = requestAnimationFrame(animate);

        return () => {
            if (animationId.current) cancelAnimationFrame(animationId.current);
            if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
        };
    }, []);

    /** Resets scroll position for infinite loop illusion */
    const checkResets = (carousel: HTMLDivElement, singleSetWidth: number) => {
        if (carousel.scrollLeft >= singleSetWidth * 2) {
            carousel.scrollLeft = singleSetWidth;
        }
        else if (carousel.scrollLeft <= 0) {
            carousel.scrollLeft = singleSetWidth;
        }
    };

    // --- Interaction Helpers ---

    const clearResumeTimers = () => {
        if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    };

    const startMomentum = () => {
        isMomentum.current = true;
        isPaused.current = true;
        setActiveItemIndex(null);
    };

    const scheduleResume = (delay: number) => {
        clearResumeTimers();
        resumeTimeout.current = setTimeout(() => {
            resumeMovement();
        }, delay);
    }

    // --- Arrow Button Handler ---
    const scroll = (direction: 'left' | 'right') => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        isPaused.current = true;
        clearResumeTimers();

        velocity.current = direction === 'left' ? THROW_VELOCITY : -THROW_VELOCITY;
        startMomentum();
    };

    // --- Touch Handlers ---

    const handleTouchStart = (e: React.TouchEvent) => {
        if (activeItemIndex !== null) setActiveItemIndex(null);

        isPaused.current = true;
        isMomentum.current = false;
        velocity.current = 0;
        clearResumeTimers();

        isDragging.current = false;
        dragStartX.current = e.touches[0].clientX;
        if (carouselRef.current) {
            dragStartScroll.current = carouselRef.current.scrollLeft;
        }

        lastDragX.current = e.touches[0].clientX;
        lastDragTime.current = Date.now();
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const currentX = e.touches[0].clientX;
        const delta = currentX - dragStartX.current;

        // Require minimum movement to distinguish from tap
        if (!isDragging.current && Math.abs(delta) < 10) return;

        isDragging.current = true;

        if (activeItemIndex !== null) setActiveItemIndex(null);

        if (carouselRef.current && firstSetRef.current) {
            carouselRef.current.scrollLeft = dragStartScroll.current - delta;
            checkResets(carouselRef.current, firstSetRef.current.offsetWidth);

            // Calculate velocity from recent movement
            const now = Date.now();
            const dt = now - lastDragTime.current;
            const dx = currentX - lastDragX.current;

            if (dt > 0) {
                const rawV = (dx / dt) * 16;
                velocity.current = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, rawV));
            }

            lastDragX.current = currentX;
            lastDragTime.current = now;
        }
    };

    const handleTouchEnd = () => {
        if (isDragging.current) {
            isDragging.current = false;
            startMomentum();
        } else {
            // Tap without drag — brief pause then resume
            isMomentum.current = false;
            scheduleResume(500);
        }
    };

    const handleCardClick = (index: number) => {
        if (isDragging.current) return;
        if (window.innerWidth >= 768) return;

        isPaused.current = true;
        isMomentum.current = false;
        velocity.current = 0;
        clearResumeTimers();

        setActiveItemIndex(index);
        scheduleResume(2000);
    };

    const handleMouseEnter = () => { isPaused.current = true; };
    const handleMouseLeave = () => { isPaused.current = false; };

    return (
        <section id="start" className="py-6 md:py-12 bg-white text-primary border-b border-gray-100">
            <FadeUp>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="max-w-7xl mx-auto mb-4 md:mb-8">
                        <div className="block md:hidden max-w-xs mx-auto">
                            <div className="flex flex-col gap-1 border-l-4 border-accent pl-4 py-1 text-left">
                                <span
                                    className="text-xl font-heading text-slate-700 leading-tight"
                                    dangerouslySetInnerHTML={{ __html: label.title }}
                                />
                                {label.subtitle && (
                                    <span
                                        className="text-xl font-heading text-slate-700 leading-tight"
                                        dangerouslySetInnerHTML={{ __html: label.subtitle }}
                                    />
                                )}
                            </div>
                        </div>

                        <p
                            className="hidden md:block w-fit mx-auto text-left border-l-4 border-accent pl-4 py-1 text-slate-500 font-medium text-lg whitespace-nowrap"
                            dangerouslySetInnerHTML={{ __html: label.description || "" }}
                        />
                    </div>

                    <div className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button
                            id="scrollLeftBtn"
                            aria-label="Anterior"
                            onClick={(e) => { e.stopPropagation(); scroll('left'); }}
                            onTouchStart={(e) => e.stopPropagation()}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-cyan-50 hover:bg-cyan-100 text-[#00C1D4] w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 md:-left-4 opacity-80 hover:opacity-100"
                        >
                            <i data-feather="chevron-left" className="w-6 h-6"></i>
                        </button>

                        <div
                            id="techCarousel"
                            ref={carouselRef}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            className="flex overflow-x-hidden gap-6 py-8 -my-4 md:py-10 md:my-0 px-2 no-scrollbar items-center touch-pan-y"
                        >
                            {[0, 1, 2].map((setIndex) => (
                                <ul
                                    key={`set-${setIndex}`}
                                    ref={setIndex === 0 ? firstSetRef : null}
                                    className="flex gap-6 flex-shrink-0 list-none p-0 m-0"
                                >
                                    {items.map((tech, itemIndex) => {
                                        const instanceIndex = (setIndex * items.length) + itemIndex;
                                        const isActive = activeItemIndex === instanceIndex;

                                        return (
                                            <TechItemCard
                                                key={`s${setIndex}-${tech.name}`}
                                                tech={tech}
                                                isActive={isActive}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCardClick(instanceIndex);
                                                }}
                                            />
                                        );
                                    })}
                                </ul>
                            ))}
                        </div>

                        <button
                            id="scrollRightBtn"
                            aria-label="Próximo"
                            onClick={(e) => { e.stopPropagation(); scroll('right'); }}
                            onTouchStart={(e) => e.stopPropagation()}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-cyan-50 hover:bg-cyan-100 text-[#00C1D4] w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 md:-right-4 opacity-80 hover:opacity-100"
                        >
                            <i data-feather="chevron-right" className="w-6 h-6"></i>
                        </button>
                    </div>

                    <div className="text-center mt-6">
                        <a href="#about" className="inline-block animate-bounce">
                            <i data-feather="chevron-down" className="w-8 h-8 text-primary/40"></i>
                        </a>
                    </div>
                </div>
            </FadeUp>
        </section>
    );
}

/** Individual tech logo card with hover/active states */
function TechItemCard({ tech, isActive, onClick }: { tech: TechItem, isActive: boolean, onClick: (e: any) => void }) {
    return (
        <li
            onClick={onClick}
            className={`
                group relative flex-shrink-0 min-w-[100px] h-[100px] bg-slate-50 rounded-2xl shadow-sm border border-slate-200 
                flex flex-col items-center justify-center transition-all duration-300 cursor-pointer
                md:hover:shadow-lg
                ${isActive ? '!shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)] scale-105 bg-white !border-cyan-200 z-10' : ''}
            `}
        >
            <img
                src={`/logos/${tech.img}`}
                alt={tech.name}
                className={`
                    w-14 h-14 object-contain transition-transform duration-300 
                    md:group-hover:-translate-y-2
                    ${isActive ? '-translate-y-2' : ''}
                `}
            />
            <span
                className={`
                    absolute bottom-2 transition-opacity duration-300 text-[10px] font-bold text-slate-500 uppercase tracking-wide text-center
                    opacity-0 md:group-hover:opacity-100
                    ${isActive ? 'opacity-100' : ''}
                `}
            >
                {tech.name}
            </span>
        </li>
    );
}
