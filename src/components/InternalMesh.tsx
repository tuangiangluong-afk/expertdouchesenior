import Link from "next/link";
import { NATIONAL_CONFIG } from "@/config/national";
import { slugify } from "@/lib/slugify";
import { SiteConfig } from "@/lib/sites-config";
import { CityConfig } from "@/lib/db";
import { getNearbyCities } from "@/lib/geo";

interface InternalMeshProps {
    city?: string;
    config?: CityConfig | SiteConfig;
}

export function InternalMesh({ city, config }: InternalMeshProps) {
    const neighborhoods = (config as any)?.neighborhoods || (config as any)?.quartiers || [];

    // Geographically nearby partner cities for linking
    const rawNearby = config ? getNearbyCities(config.slug, 12) : [];
    const slugs = new Set();
    const nearbyCities = rawNearby.filter(city => {
        if (slugs.has(city.slug)) return false;
        slugs.add(city.slug);
        return true;
    });

    // Varied Anchor Logic
    function getVariedAnchor(name: string, index: number) {
        const variations = [
            `Douche senior ${name}`,
            `Douche PMR ${name}`,
            `Remplacement baignoire ${name}`,
            `Salle de bain PMR ${name}`,
            `Douche sécurisée ${name}`
        ];
        return variations[index % variations.length];
    }

    return (
        <section className="bg-neutral-900 border-t border-white/5 py-16 px-6">
            <div className="mx-auto max-w-7xl">
                <div className="grid md:grid-cols-4 gap-12 text-left">
                    {/* 1. Services */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Nos Services</h4>
                        <ul className="space-y-3">
                            {[
                                "Remplacement Baignoire par Douche",
                                "Installation Douche Italienne PMR",
                                "Rénovation Salle de Bain PMR",
                                "Aménagement WC Suspendu & Ergonomie",
                                "Pose de barres d'appui & Sièges"
                            ].map((service, i) => (
                                <li key={i}>
                                    <a href="#simulateur" className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
                                        <span className="w-1/2 bg-teal-500 rounded-full h-1 w-1 shrink-0"></span>
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 2. Villes à Proximité */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Agences à Proximité</h4>
                        <ul className="space-y-3">
                            {nearbyCities.slice(0, 6).map((city, i) => (
                                <li key={city.slug}>
                                    <Link
                                        href={`/ville/${city.slug}`}
                                        className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2"
                                    >
                                        <span className="w-1/2 bg-teal-500 rounded-full h-1 w-1 shrink-0"></span>
                                        {getVariedAnchor(city.city, i)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Quartiers / Zones (SEO Local) */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">
                            {config ? `Quartiers de ${config.city}` : "Zones d'intervention"}
                        </h4>
                        <ul className="space-y-3">
                            {neighborhoods.slice(0, 8).map((quartier: string, i: number) => (
                                <li key={quartier}>
                                    <Link href={`#simulateur`} className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
                                        <span className="w-1/2 bg-teal-500 rounded-full h-1 w-1 shrink-0"></span>
                                        {getVariedAnchor(quartier, i + 2)}
                                    </Link>
                                </li>
                            ))}
                            {neighborhoods.length === 0 && (
                                <li className="text-neutral-500 text-sm italic">Tout {config?.city || "France"} et agglomération</li>
                            )}
                        </ul>
                    </div>

                    {/* 4. Guides & Aides */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">
                            Documentation &amp; Aides
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: "Guide MaPrimeAdapt'", href: "/guides/ma-prime-adapt-mode-d-emploi" },
                                { label: "Tarifs Remplacement Baignoire", href: "/guides/prix-remplacement-baignoire-douche-senior" },
                                { label: "Normes d'Accessibilité PMR", href: "/guides/normes-accessibilite-douche-pmr" },
                                { label: "Tous nos guides", href: "/guides" }
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
                                        <span className="w-1/2 bg-teal-500 rounded-full h-1 w-1 shrink-0"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
