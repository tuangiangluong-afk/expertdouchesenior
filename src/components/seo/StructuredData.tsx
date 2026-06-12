import Script from "next/script";

export default function StructuredData() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Expert Douche Senior",
        "url": "https://expertdouchesenior.com",
        "logo": "https://expertdouchesenior.com/logo.png",
        "description": "Réseau national d'artisans plombiers spécialisés dans le remplacement de baignoire par des douches sécurisées PMR pour seniors. Artisans Handibat & Silverbat.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "FR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33 1 84 80 00 00",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": "French"
        }
    };

    return (
        <Script
            id="org-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
