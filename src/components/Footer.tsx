/**
 * Institutional footer with branding and legal text.
 * Static content only — no interactive elements.
 */

interface FooterProps {
    copyright: string;
    tagline: string;
}

export default function Footer({ copyright, tagline }: FooterProps) {
    return (
        <footer className="bg-primary border-t border-secondary/20 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-secondary">
                <div className="flex justify-center items-center mb-4">
                    <a href="#home" className="flex items-center space-x-3">
                        <img src="/images/draw.png" alt="Architecode Symbol" className="h-8" />
                        <img
                            src="/images/text.png"
                            alt="Architecode Logo"
                            className="h-5"
                        />
                    </a>
                </div>
                <small className="text-sm block">{copyright}</small>
                <p className="text-xs text-secondary/70 mt-1 uppercase tracking-wider">
                    {tagline}
                </p>
            </div>
        </footer>
    );
}
