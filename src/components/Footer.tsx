import Link from "next/link";
import { CityConfig } from "@/lib/db";
import { SiteConfig } from "@/lib/sites-config";
import { getTheme } from "@/lib/theme";
import { Mail } from "lucide-react";
import { CITIES } from "@/lib/db";
import { slugify } from "@/lib/slugify";

interface FooterProps {
    config: CityConfig | SiteConfig;
}

export function Footer({ config }: FooterProps) {
    if (!config) return null;

    const neighborhoods = (config as any).neighborhoods || (config as any).quartiers || [];
    const theme = getTheme(config.slug);

    // Group UNIQUE cities by region for the Mega Footer Directory
    const uniqueCities = Object.values(CITIES).filter(
        site => site.slug !== 'home' && site.slug !== 'expertdouchesenior.com' && site.slug !== 'www.expertdouchesenior.com'
    );

    const sitesByRegion = uniqueCities.reduce((acc, site) => {
        const region = site.region || 'Autres Régions';
        if (!acc[region]) acc[region] = [];
        acc[region].push(site);
        return acc;
    }, {} as Record<string, CityConfig[]>);

    // Varied Anchor Logic (Local SEO)
    const getGlobalDiverseAnchor = (cityName: string, index: number) => {
        const variations = [
            `Douche senior ${cityName}`,
            `Douche PMR ${cityName}`,
            `Remplacement baignoire douche ${cityName}`,
            `Douche italienne sécurisée ${cityName}`,
            `Salle de bain PMR ${cityName}`,
            `${cityName} (Douche PMR)`
        ];
        return variations[index % variations.length];
    };

    return (
        <footer className="bg-neutral-900 border-t border-white/10 py-12 text-neutral-400">
            <div className="container mx-auto px-4 text-center">
                <h4 className="text-white font-bold mb-4">À propos de {config.name}</h4>
                <p className="max-w-2xl mx-auto text-sm mb-8">
                    {config.name} est le comparateur de référence pour le remplacement de baignoire par une douche sécurisée pour senior et PMR à {config.city}.
                    Nous sélectionnons les meilleurs artisans plombiers agréés Handibat et Silverbat pour vos projets d&apos;adaptation du logement.
                    Obtenez jusqu&apos;à 3 devis gratuits, éligibles aux aides de l&apos;État (MaPrimeAdapt&apos; jusqu&apos;à 70%).
                </p>

                <div className="inline-flex items-center gap-2 bg-teal-900/30 border border-teal-800 px-4 py-2 rounded-full mb-8">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    <span className="text-teal-400 font-bold text-sm">Réseau d&apos;Installateurs Agréés Handibat &amp; Silverbat</span>
                </div>

                <div className="border-t border-white/10 pt-12 mt-12">
                    <div className="grid md:grid-cols-4 gap-8 text-left max-w-7xl mx-auto">
                        {/* Column 1: Zones / Quartiers */}
                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">
                                {config.slug === 'home' ? 'Nos Régions' : 'Zones d\'Intervention'}
                            </h5>
                            <ul className="space-y-3 text-sm">
                                {config.slug === 'home' ? (
                                    <>
                                        <li><Link href="/ville/paris" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-teal-500 transition"></span>Île-de-France</Link></li>
                                        <li><Link href="/ville/lyon" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-teal-500 transition"></span>Auvergne-Rhône-Alpes</Link></li>
                                        <li><Link href="/ville/marseille" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-teal-500 transition"></span>Provence-Alpes-Côte d&apos;Azur</Link></li>
                                        <li><Link href="/ville/bordeaux" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-teal-500 transition"></span>Nouvelle-Aquitaine</Link></li>
                                        <li><Link href="/ville/toulouse" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-teal-500 transition"></span>Occitanie</Link></li>
                                        <li><Link href="/ville/nantes" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-teal-500 transition"></span>Pays de la Loire</Link></li>
                                    </>
                                ) : (
                                    <>
                                        {neighborhoods.slice(0, 6).map((zone: string) => (
                                            <li key={zone}>
                                                <Link href={`#simulateur`} className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                                    <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                                    {zone}
                                                </Link>
                                            </li>
                                        ))}
                                        {neighborhoods.length === 0 && (
                                            <li className="text-neutral-500 italic">Tout {config.city} et agglomération</li>
                                        )}
                                    </>
                                )}
                            </ul>
                        </div>

                        {/* Column 2: Smart Network */}
                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">
                                {(() => {
                                    if (config.slug === 'home') return 'Notre Réseau';
                                    const currentSite = config as any;
                                    const strictNeighbors = uniqueCities.filter(s => {
                                        if (!s.postalCode || !currentSite.postalCode) return false;
                                        const sameDept = s.postalCode.substring(0, 2) === currentSite.postalCode.substring(0, 2);
                                        return sameDept && s.slug !== currentSite.slug;
                                    });
                                    return strictNeighbors.length > 0 ? 'À proximité' : 'Notre Réseau';
                                })()}
                            </h5>
                            <ul className="space-y-3 text-sm">
                                {(() => {
                                    let nearbySites = [];
                                    const currentSite = config as any;

                                    if (config.slug === 'home') {
                                        const topSlugs = ['paris', 'marseille', 'lyon', 'bordeaux', 'nice'];
                                        nearbySites = uniqueCities.filter(s => topSlugs.includes(s.slug));
                                    } else {
                                        const currentDept = currentSite.postalCode ? currentSite.postalCode.substring(0, 2) : "";
                                        const sameDept = uniqueCities.filter(s => s.postalCode && s.postalCode.substring(0, 2) === currentDept && s.slug !== currentSite.slug);
                                        const others = uniqueCities.filter(s => s.slug !== currentSite.slug && !(s.postalCode && s.postalCode.substring(0, 2) === currentDept));
                                        nearbySites = [...sameDept, ...others].slice(0, 5);
                                    }

                                    const getVariedFooterAnchor = (cityName: string, index: number) => {
                                        const variations = [
                                            `Douche senior ${cityName}`,
                                            `Adaptation PMR ${cityName}`,
                                            `Salle de bain senior ${cityName}`,
                                            `Remplacement baignoire ${cityName}`,
                                            `Douche sécurisée ${cityName}`
                                        ];
                                        return variations[index % variations.length];
                                    };

                                    return nearbySites.map((site, index) => (
                                        <li key={site.slug}>
                                            <Link
                                                href={`/ville/${site.slug}`}
                                                className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"
                                            >
                                                <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                                {getVariedFooterAnchor(site.city, index)}
                                            </Link>
                                        </li>
                                    ));
                                })()}
                            </ul>
                        </div>

                        {/* Column 3: Solutions */}
                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">Guides &amp; Aides</h5>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link href="/guides/ma-prime-adapt-mode-d-emploi" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Guide MaPrimeAdapt&apos;
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/guides/prix-remplacement-baignoire-douche-senior" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Tarifs Remplacement Baignoire
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/guides/normes-accessibilite-douche-pmr" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Normes Douches PMR
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/guides" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Tous nos guides
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Devenir Installateur Partenaire
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: Marques & Contact */}
                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">Marques Réf.</h5>
                            <ul className="space-y-3 text-sm mb-8">
                                {[
                                    { name: "Kinedo", slug: "kinedo" },
                                    { name: "Indépendance Royale", slug: "independance-royale" },
                                    { name: "Idhra", slug: "idhra" },
                                    { name: "Mobilae", slug: "mobilae" }
                                ].map((brand) => (
                                    <li key={brand.slug}>
                                        <Link href={`#simulateur`} className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                            <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                            Douche {brand.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">Contact</h5>
                            <ul className="space-y-6">
                                <li>
                                    <Link href="/contact" className="flex items-start gap-4 text-neutral-400 hover:text-white transition group text-left">
                                        <div className={`p-2 rounded-lg bg-white/5 group-hover:${theme.classes.bg} transition group-hover:text-neutral-900`}>
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <span className="block text-white font-bold text-lg">Nous écrire</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* MEGA FOOTER */}
                <div className="border-t border-white/10 pt-12 mt-4 text-left max-w-7xl mx-auto mb-16 px-4 md:px-0">
                    <h5 className="text-white font-bold mb-8 text-xl tracking-tight text-center md:text-left">
                        Notre Réseau National d&apos;Installateurs Douche Senior
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {Object.entries(sitesByRegion).map(([region, sites]) => (
                            <div key={region} className="space-y-4">
                                <h6 className="text-white/80 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-teal-500/50"></span>
                                    {region}
                                </h6>
                                <ul className="space-y-3 text-sm">
                                    {sites.map((site, index) => (
                                        <li key={site.slug}>
                                            <Link
                                                href={`/ville/${site.slug}`}
                                                className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"
                                            >
                                                <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                                {getGlobalDiverseAnchor(site.city, index)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-xs border-t border-white/10 pt-8">
                    &copy; {new Date().getFullYear()} {config.name} - Tous droits réservés.
                </div>
                <div className="flex justify-center gap-4 text-xs mt-4 mb-2">
                    <Link href={(config as any).basePath ? `${(config as any).basePath}/mentions-legales` : "/mentions-legales"} className="text-neutral-500 hover:text-white transition-colors">Mentions Légales</Link>
                    <span className="text-neutral-700">•</span>
                    <Link href={(config as any).basePath ? `${(config as any).basePath}/cgv` : "/cgv"} className="text-neutral-500 hover:text-white transition-colors">CGV</Link>
                </div>
            </div>
        </footer>
    );
}
