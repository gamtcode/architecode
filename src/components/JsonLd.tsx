/**
 * JSON-LD Structured Data for SEO
 *
 * Injects Organization schema markup into the page head.
 * Helps search engines understand business identity and contact info.
 *
 * @see https://schema.org/Organization
 */
export default function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Architecode",
        "url": "https://architecode.com",
        "logo": "https://architecode.com/images/draw.png",
        "sameAs": [
            "https://linkedin.com/company/architecode"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+55-12-98199-6782",
            "contactType": "customer service",
            "email": "contato@architecode.com"
        },
        "description": "Consultoria de Arquitetura e Engenharia de Software especializada em sistemas robustos, escaláveis e sob medida."
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
