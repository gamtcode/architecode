/**
 * Root Layout — Global App Shell
 *
 * Responsibilities:
 * - Defines HTML document structure with pt-BR locale
 * - Loads Google Fonts (Montserrat, Open Sans) via next/font
 * - Injects global metadata for SEO and social sharing
 * - Loads external CDN scripts for legacy integrations
 *
 * Script loading strategy: async CDN scripts avoid bundling
 * large icon/animation libraries. useClientEffects hook handles
 * initialization after scripts load.
 */

import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google"; // eslint-disable-line @next/next/no-page-custom-font
import "./globals.css";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    display: "swap",
});

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-open-sans",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://architecode.com"),
    title: "ARCHITECODE | Software Architecture and Engineering",
    description:
        "Consultoria de Arquitetura e Engenharia de Software especializada em sistemas robustos, escaláveis e sob medida. Transformamos visão em valor com Java, Spring, .NET e IA.",
    keywords: [
        "Software Architecture",
        "Engenharia de Software",
        "Desenvolvimento Web",
        "Consultoria de TI",
        "Java",
        "Spring Boot",
        "Next.js",
    ],
    authors: [{ name: "Architecode" }],
    creator: "Architecode",
    publisher: "Architecode",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://architecode.com/",
    },
    openGraph: {
        title: "ARCHITECODE | Software Architecture and Engineering",
        description:
            "Consultoria de Arquitetura e Engenharia de Software especializada em sistemas robustos, escaláveis e sob medida.",
        url: "https://architecode.com",
        siteName: "Architecode",
        locale: "pt_BR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "ARCHITECODE | Software Architecture and Engineering",
        description:
            "Consultoria de Arquitetura e Engenharia de Software especializada em sistemas robustos, escaláveis e sob medida.",
    },
    icons: {
        icon: "/icon.png",
    },
};

import JsonLd from "../components/JsonLd";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // lang="pt-BR" required for SEO and accessibility — content is Portuguese
        <html lang="pt-BR" className="scroll-smooth">
            <body
                className={`${montserrat.variable} ${openSans.variable} font-body bg-primary text-white antialiased`}
            >
                {/* Structured data for search engines */}
                <JsonLd />

                {/* External libraries loaded via CDN to avoid bundling */}
                <script src="https://unpkg.com/feather-icons" async></script>
                <script src="https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js" async></script>

                {children}
            </body>
        </html>
    );
}
