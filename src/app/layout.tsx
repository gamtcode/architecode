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
import Script from "next/script";
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
import TrackingEvents from "../components/TrackingEvents";

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
                <JsonLd />

                <script src="https://unpkg.com/feather-icons" async></script>
                <script src="https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js" async></script>

                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-FK1E2S5FF5"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-FK1E2S5FF5');
                    gtag('config', 'AW-17943626047');
                    `}
                </Script>

                <TrackingEvents />

                {children}
            </body>
        </html>
    );
}
