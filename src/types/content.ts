/**
 * Content Type System
 *
 * Defines the contract between content data (home.ts) and UI components.
 * All page content is strongly typed to ensure consistency and catch
 * structural errors at compile time.
 *
 * Architecture: Components receive typed props → no inline content allowed.
 */

export type IconName = string;

/** Navigation and contact links */
export interface LinkItem {
    label: string;
    href: string;
    icon?: IconName;
    trackingId?: string;
}

/** Reusable section header structure */
export interface SectionHeader {
    title: string;
    subtitle?: string;
    description?: string;
    highlight?: string;
}

/** Hero section configuration */
export interface HeroContent {
    rotatingPhrases: string[];
}

/** Generic feature/service/article item */
export interface FeatureItem {
    title: string;
    subtitle?: string;
    description: string;
    icon?: IconName;
    link?: LinkItem;
}

/** Client testimonial entry */
export interface TestimonialItem {
    quote: string;
    author: string;
    role: string;
    company: string;
    bgImage?: string;
    link?: LinkItem;
}

/** Tech carousel logo item */
export interface TechItem {
    name: string;
    img: string;
}

/**
 * Complete home page content structure.
 * Maps 1:1 to the sections rendered in page.tsx.
 */
export interface HomePageContent {
    navbar: {
        links: LinkItem[];
    };
    hero: {
        header: SectionHeader;
    } & HeroContent;
    techCarousel: {
        label: SectionHeader;
        items: TechItem[];
    };
    about: {
        header: SectionHeader;
        intro: string[];
        mission: string;
        items: FeatureItem[];
    };
    structure: {
        header: SectionHeader;
        problems: FeatureItem[];
        solutions: FeatureItem[];
    };
    services: {
        header: SectionHeader;
        items: FeatureItem[];
    };
    solutions: {
        header: SectionHeader;
        items: FeatureItem[];
    };
    articles: {
        header: SectionHeader;
        items: FeatureItem[];
    };
    clients: {
        header: SectionHeader;
        items: TestimonialItem[];
    };
    contact: {
        header: SectionHeader;
        intro: string;
        links: LinkItem[];
    };
    footer: {
        copyright: string;
        tagline: string;
    };
}
