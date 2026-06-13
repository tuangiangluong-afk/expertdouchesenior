import Script from "next/script";

export default function StructuredData() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Expert Douche Senior",
        "url": "https://expertdouchesenior.com",
        "logo": "https://expertdouchesenior.com/logo.png",
        "description": "Réseau national d'artisans plombiers spécialisés dans le remplacement de baignoire par des douches sécurisées PMR pour seniors. Artisans Handibat & Silverbat.",
        "sameAs": [
            "https://www.facebook.com/expertdouchesenior",
            "https://www.instagram.com/expertdouchesenior"
        ],
        "foundingDate": "2020",
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
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://expertdouchesenior.com/ville/{search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://expertdouchesenior.com",
        "name": "expertdouchesenior",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://expertdouchesenior.com/ville/{search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Installation et Dépannage",
        "provider": { "@type": "Organization", "name": "expertdouchesenior" },
        "areaServed": { "@type": "Country", "name": "France" }
    };

    return (
        <Script
            id="org-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) + '\n' + JSON.stringify(websiteSchema) + '\n' + JSON.stringify(serviceSchema) }}
        />
    );
}
