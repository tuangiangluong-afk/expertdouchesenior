import type { CityConfig } from "@/lib/db";

export interface PseoPageContent {
    meta_title: string;
    meta_description: string;
    hero_title: string;
    hero_badge: string;
    intro_html: string;
    cta_primary: string;
    pricing_estimated: string;
    regional_subsidy: string;
    expert_tip: string;
}

const REGIONAL_DATA: Record<string, { subsidyName: string; subsidyAmount: string; avgPrice: string; }> = {
    "75": { subsidyName: "Aide Paris Éco-Adaptation", subsidyAmount: "MaPrimeAdapt' ANAH + Subvention Ville de Paris", avgPrice: "3 800€ – 6 000€" },
    "69": { subsidyName: "Métropole de Lyon Silver Éco", subsidyAmount: "MaPrimeAdapt' ANAH + Aide locale Rhône", avgPrice: "3 500€ – 5 800€" },
    "13": { subsidyName: "Département 13 - Maintien à Domicile", subsidyAmount: "MaPrimeAdapt' ANAH + Subvention CD13", avgPrice: "3 400€ – 5 500€" },
    "06": { subsidyName: "Département 06 - Adaptation Seniors", subsidyAmount: "MaPrimeAdapt' ANAH + Aide Conseil Général 06", avgPrice: "3 800€ – 6 200€" },
    "33": { subsidyName: "Bordeaux Métropole Autonomie", subsidyAmount: "MaPrimeAdapt' ANAH + Aide Gironde", avgPrice: "3 500€ – 5 900€" },
    "59": { subsidyName: "MEL Autonomie Seniors Nord", subsidyAmount: "MaPrimeAdapt' ANAH + Aide MEL", avgPrice: "3 400€ – 5 600€" },
    "44": { subsidyName: "Nantes Métropole Maintien Domicile", subsidyAmount: "MaPrimeAdapt' ANAH + Conseil Départemental 44", avgPrice: "3 400€ – 5 500€" }
};

const DEFAULT_REGIONAL = {
    subsidyName: "Aide nationale MaPrimeAdapt'",
    subsidyAmount: "Jusqu'à 70% de subvention ANAH (Plafond 15 400€)",
    avgPrice: "3 500€ – 5 800€"
};

function getExpertTip(city: string, dept: string, neighborhoods: string[]): string {
    const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const isFrance = city.toLowerCase() === "france";
    const prep = isFrance ? "en" : "à";

    const tips = [
        `Pour une installation de douche senior ${prep} ${city}, nous recommandons un receveur antidérapant de classe PN24 (norme R11) et l'ajout de parois en verre sécurit. Nos installateurs certifiés Handibat s'occupent de toutes les démarches ANAH.`,
        `À ${city}, le remplacement d'une baignoire classique par une douche de plain-pied PMR réduit de 90% le risque de chute domestique chez les seniors. ${isFrance ? "Notre réseau" : `En ${dept}, nos installateurs`} posent votre douche en seulement 48 heures.`,
        `L'aide MaPrimeAdapt' ${prep} ${city} finance jusqu'à 70% du montant hors taxes de vos travaux. Pensez à réaliser votre test d'éligibilité avant d'initier vos devis avec notre conseiller agréé.`,
        `Pour une adaptation PMR réussie de votre salle de bain ${prep} ${city}, vérifiez que l'ouverture de la porte fait au moins 80 cm pour permettre le passage d'un fauteuil roulant ou d'un déambulateur.`,
    ];
    return tips[hash % tips.length];
}

function getIntroHtml(city: string, dept: string, neighborhoods: string[], postalCode: string, avgPrice: string): string {
    const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const isFrance = city.toLowerCase() === "france";
    const prep = isFrance ? "en" : "à";

    const neighborhoodMention = neighborhoods.length >= 2
        ? `Nos artisans Handibat interviennent dans tous les secteurs : <strong>${neighborhoods.slice(0, 3).join(', ')}</strong> et communes voisines.`
        : "";

    const postalCodeMention = postalCode ? ` (${postalCode})` : "";

    const intros = [
        `<p class="mb-4">
            Vous souhaitez remplacer votre ancienne baignoire par une <strong>douche sécurisée pour senior ou PMR</strong> ${prep} <strong>${city}${postalCodeMention}</strong> ? 
            Notre réseau d'électriciens-plombiers agréés réalise l'installation complète de votre espace douche de plain-pied sans gros travaux.
            ${neighborhoodMention}
        </p>
        <p>
            Le tarif moyen pour installer une douche ergonomique de sécurité ${prep} ${city} oscille entre <strong>${avgPrice}</strong>. 
            Grâce à l'aide de l'État <strong>MaPrimeAdapt'</strong>, vous pouvez bénéficier d'un financement allant jusqu'à <strong>70%</strong> du montant de vos travaux.
        </p>`,

        `<p class="mb-4">
            Sécurisez votre salle de bain ${prep} <strong>${city}</strong>${dept ? ` (${dept})` : ''} avec nos solutions d'aménagement pour seniors et personnes à mobilité réduite. 
            Équipées de receveurs ultra-plats antidérapants, de mitigeurs thermostatiques anti-brûlure, de sièges ergonomiques rabattables et de barres de maintien, nos douches garantissent un maintien à domicile serein.
        </p>
        <p>
            ${neighborhoodMention} Le prix d'installation ${prep} ${city} s'élève en moyenne à <strong>${avgPrice}</strong>. 
            Nous vous accompagnons dans le montage complet de vos dossiers de subventions pour un reste à charge minimal.
        </p>`,

        `<p class="mb-4">
            Le remplacement d'une baignoire difficile d'accès par une douche à l'italienne sécurisée ${prep} <strong>${city}</strong> est la première étape pour prévenir les chutes domestiques. 
            Nos installateurs certifiés <strong>Handibat</strong> et <strong>Silverbat</strong> adaptent votre salle de bain aux normes d'accessibilité PMR en 48 heures.
        </p>
        <p>
            Toutes nos douches sécurisées ${prep} ${city} ouvrent droit à une TVA réduite à <strong>5.5%</strong> et sont subventionnables jusqu'à 70% par MaPrimeAdapt'. 
            ${neighborhoodMention}
        </p>`,
    ];

    return intros[hash % intros.length];
}

export async function getPseoContent(cityConfig: CityConfig, targetType: string = 'MIXED'): Promise<PseoPageContent> {
    const { city, department, region, postalCode, neighborhoods, pricing } = cityConfig;
    const dept = department || "";
    const postal = postalCode || "";
    const quartiers = neighborhoods || [];

    const deptCode = dept.length >= 2 ? dept.substring(0, 2) : "";
    const regionalInfo = REGIONAL_DATA[deptCode] || DEFAULT_REGIONAL;

    const realPrice = pricing?.base || "Sur Devis";

    const isFrance = city.toLowerCase() === "france";
    const prep = isFrance ? "en" : "à";

    const meta_title = `Installation Douche Senior ${isFrance ? "en France" : city}${postal ? ` (${postal})` : ''} | Aides MaPrimeAdapt'`;
    const meta_description = `Remplacement baignoire par douche sécurisée ${prep} ${city} par un électricien-plombier certifié Handibat. Éligible MaPrimeAdapt' (jusqu'à 70% d'aides). Devis gratuit sous 24h.`;

    const hero_title = `Installation <span class="text-teal-600">Douche Senior</span> ${prep} ${city}${postal ? ` <span class="text-slate-400 text-3xl">(${postal})</span>` : ''}`;
    const hero_badge = regionalInfo.subsidyName;

    const intro_html = getIntroHtml(city, dept, quartiers, postal, regionalInfo.avgPrice);

    return {
        meta_title,
        meta_description,
        hero_title,
        hero_badge,
        intro_html,
        cta_primary: "Simuler mes subventions",
        pricing_estimated: realPrice,
        regional_subsidy: regionalInfo.subsidyAmount,
        expert_tip: getExpertTip(city, dept, quartiers),
    };
}
