/**
 * Senior Shower Hub Site Configuration (Vaisseau Mère)
 */

export interface SiteConfig {
    slug: string;
    domain: string;
    aliases?: string[];
    city: string;
    postalCode: string;
    department: string;
    region: string;
    name: string;
    phoneNumber: string;
    email: string;
    targetType: 'SENIOR' | 'PMR' | 'MIXED';
    priceRange: 'STANDARD' | 'PREMIUM' | 'LUXE';
    theme: 'premium' | 'trust';
    heroImage: string;
    description: string;
    meta: {
        title: string;
        description: string;
    };
    certifications: string[];
    aidesDisponibles: string[];
    features: string[];
    localKeywords: string[];
    quartiers: string[];
    coproprietes: string[];
    centresCommerciaux: string[];
    ga_id?: string;
    gtm_id?: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

const TEMPLATE_CERTIFICATIONS = [
    "Qualibat PMR",
    "Handibat",
    "Silverbat",
    "Assurance décennale"
];

const TEMPLATE_AIDES = [
    "MaPrimeAdapt' (jusqu'à 70% d'aides)",
    "TVA Réduite 5.5%",
    "Crédit d'impôt 25%"
];

const TEMPLATE_FEATURES = [
    "Devis gratuit en 24h",
    "Installation en 48h sans gros travaux",
    "Matériel certifié CE & NF",
    "Garantie décennale",
    "Crédit d'impôt & MaPrimeAdapt' déduits"
];

const _hubConfig: SiteConfig = {
    slug: "home",
    domain: "expertdouchesenior.com",
    city: "France",
    postalCode: "",
    department: "",
    region: "National",
    name: "Expert Douche Senior",
    phoneNumber: "01 84 80 00 00",
    email: "contact@expertdouchesenior.com",
    targetType: 'MIXED',
    priceRange: 'STANDARD',
    theme: 'premium',
    heroImage: "/images/generated/senior-shower-hero.webp",
    description: "Le réseau n°1 d'installateurs de douches sécurisées et PMR en France. Devis gratuit, installation en 48h, certifié Handibat.",
    meta: {
        title: "Expert Douche Senior | Douche Sécurisée & PMR France",
        description: "Installation de douches sécurisées et italiennes PMR pour seniors partout en France. Devis gratuit en 24h. Certifié Handibat. Éligible MaPrimeAdapt' (jusqu'à 70% d'aides)."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: [
        "remplacement baignoire douche senior",
        "douche pmr securisee",
        "installation douche senior",
        "douche italienne pmr",
        "maprimeadapt douche"
    ],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    coordinates: { lat: 46.2276, lng: 2.2137 }
};

export const SITES: Record<string, SiteConfig> = {
    "expertdouchesenior.com": _hubConfig,
    "www.expertdouchesenior.com": _hubConfig,
    "home": _hubConfig
};

export function getSiteConfig(hostnameOrSlug: string): SiteConfig | null {
    let hostname = hostnameOrSlug.split(':')[0];
    hostname = hostname.replace(/^www\./, '');

    const bySlug = Object.values(SITES).find(s => s.slug === hostname);
    if (bySlug) return bySlug;

    if (SITES[hostname]) return SITES[hostname];

    return _hubConfig;
}

export function getSiteBySlug(slug: string): SiteConfig | null {
    return Object.values(SITES).find(s => s.slug === slug) || null;
}

export function getSatelliteSites(): SiteConfig[] {
    return []; // No satellite domains
}

export function isMainHub(hostname: string): boolean {
    return true; // Always true as there are no satellite domains
}

export function getHubConfig(): SiteConfig {
    return _hubConfig;
}
