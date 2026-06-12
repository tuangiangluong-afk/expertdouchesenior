import { getSiteConfig } from "@/lib/sites-config";
import { getCity } from "@/lib/db";
import { getPseoContent } from "@/lib/pseo";
import { CheckCircle, Zap, TrendingDown, Home, Building2, Briefcase, Award, ArrowRight, Shield, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import LeadForm from "@/components/LeadForm";
import Header from "@/components/Header";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import FAQ from "@/components/FAQ";
import FAQSection from "@/components/FAQSection";
import SchemaJSON from "@/components/SchemaJSON";
import Reviews from "@/components/Reviews";
import { Footer } from "@/components/Footer";
import { InternalMesh } from "@/components/InternalMesh";
import RealizationsGrid from "@/components/RealizationsGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import FloatingCTA from "@/components/FloatingCTA";
import { slugify } from "@/lib/slugify";
 
// ============================================
// METADATA
// ============================================
 
export async function generateMetadata({
    params,
}: {
    params: Promise<{ domain: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const site = getSiteConfig(resolvedParams.domain);
 
    if (!site) {
        return {
            title: "Expert Douche Senior | Remplacement Baignoire",
            description: "Installation de douches sécurisées et italiennes PMR pour seniors.",
        };
    }
 
    const cityConfig = getCity(resolvedParams.domain);
    if (!cityConfig) {
        return {
            title: site.meta.title,
            description: site.meta.description,
            keywords: site.localKeywords,
        };
    }
 
    // Dynamic Meta via pSEO
    const pseo = await getPseoContent(cityConfig);
 
    return {
        title: pseo.meta_title,
        description: pseo.meta_description,
        keywords: site.localKeywords,
        alternates: {
            canonical: `https://${site.domain}`,
        },
        openGraph: {
            title: pseo.meta_title,
            description: pseo.meta_description,
            url: `https://${site.domain}`,
            siteName: site.name,
            images: [
                {
                    url: site.heroImage,
                    width: 1200,
                    height: 630,
                    alt: `Installation douche senior à ${site.city}`
                }
            ],
            locale: "fr_FR",
            type: "website",
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}
 
// ============================================
// PAGE COMPONENT
// ============================================
 
interface SitePageProps {
    params: Promise<{ domain: string }>;
    basePath?: string; // Optional for Demo Mode
}
 
export default async function SitePage({ params, basePath }: SitePageProps) {
    const resolvedParams = await params;
 
    let site = getSiteConfig(resolvedParams.domain);
 
    if (site && basePath) {
        site = { ...site, basePath } as any;
    }
 
    if (!site) {
        return notFound();
    }
 
    const cityConfig = getCity(resolvedParams.domain);
    if (!cityConfig) {
        return notFound();
    }
 
    const isHub = site.slug === 'home';
 
    // pSEO Generation
    const pseo = await getPseoContent(cityConfig);
 
    const h1Content = pseo.hero_title;
    const introContent = pseo.intro_html;
    const badgeContent = pseo.hero_badge;
 
    type ThemeColor = 'teal' | 'emerald' | 'amber' | 'purple';
 
    let themeColor: ThemeColor = 'teal';
    if (site.priceRange === 'LUXE') themeColor = 'amber';
    else if (site.targetType === 'PMR') themeColor = 'purple';
    else if (site.priceRange === 'STANDARD') themeColor = 'emerald';
 
    const colors = {
        teal: {
            primary: "bg-teal-600",
            hover: "hover:bg-teal-700",
            text: "text-teal-600",
            light: "bg-teal-50",
            border: "border-teal-200",
            gradient: "from-teal-600 to-teal-700",
            shadow: "shadow-teal-500/30"
        },
        emerald: {
            primary: "bg-emerald-600",
            hover: "hover:bg-emerald-700",
            text: "text-emerald-600",
            light: "bg-emerald-50",
            border: "border-emerald-200",
            gradient: "from-emerald-600 to-emerald-700",
            shadow: "shadow-emerald-500/30"
        },
        amber: {
            primary: "bg-amber-600",
            hover: "hover:bg-amber-700",
            text: "text-amber-600",
            light: "bg-amber-50",
            border: "border-amber-200",
            gradient: "from-amber-600 to-amber-700",
            shadow: "shadow-amber-500/30"
        },
        purple: {
            primary: "bg-purple-600",
            hover: "hover:bg-purple-700",
            text: "text-purple-600",
            light: "bg-purple-50",
            border: "border-purple-200",
            gradient: "from-purple-600 to-purple-700",
            shadow: "shadow-purple-500/30"
        }
    };
 
    const palette = colors[themeColor];
    const isPremium = site.theme === 'premium';
 
    const coloredH1Content = h1Content.replace(/text-blue-500/g, palette.text);
 
    return (
        <div className="min-h-screen font-sans text-neutral-900 bg-neutral-50">
            <Header
                isHub={isHub}
                city={site.city}
                phoneNumber={site.phoneNumber}
                variant={isPremium ? "light" : "default"}
                themeColor={themeColor}
            />
 
            <SchemaJSON type="LocalBusiness" site={site} />
            {isHub && <SchemaJSON type="Organization" site={site} />}
 
            <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-4 relative z-20">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 flex flex-col gap-8 text-center lg:text-left">
                            <div className="space-y-6">
                                <div className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-bold border mx-auto lg:mx-0 ${isPremium ? "border-amber-500/30 bg-amber-500/10 text-amber-500" : `${palette.border} ${palette.light} ${palette.text}`}`}>
                                    <CheckCircle size={16} className="mr-2" />
                                    {badgeContent}
                                </div>
                                <h1
                                    className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ${isPremium ? "text-white" : "text-neutral-900"}`}
                                    dangerouslySetInnerHTML={{ __html: coloredH1Content }}
                                />
                                <div
                                    className={`text-xl max-w-xl mx-auto lg:mx-0 ${isPremium ? "text-neutral-400" : "text-neutral-600"}`}
                                    dangerouslySetInnerHTML={{ __html: introContent }}
                                />
                            </div>
 
                            <div className="w-full max-w-xl mx-auto lg:mx-0 relative z-30 text-left">
                                <div id="simulateur" className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 overflow-hidden border border-slate-200">
                                    <div className={`p-1 bg-gradient-to-r ${palette.gradient}`}></div>
                                    <div className="p-6 md:p-8">
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-slate-900">Simuler mes aides de l&apos;État</h3>
                                            <p className="text-sm text-slate-500">Réponse immédiate • Gratuit • Sans engagement</p>
                                        </div>
                                        <LeadForm
                                            city={site.city}
                                            domain={site.domain}
                                            targetType={site.targetType}
                                            themeColor={themeColor}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
 
                        <div className="lg:col-span-5 hidden lg:block relative w-full">
                            <div className="relative h-[640px] w-full mb-8">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-100 bg-white p-2">
                                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                                        <SafeImage
                                            src={site.heroImage || "/images/generated/modern-home.png"}
                                            fallbackSrc="/images/generated/modern-home.png"
                                            alt={`Installation douche senior à ${site.city}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                                        <div className="absolute bottom-8 left-8 right-8 z-20">
                                            <div className="bg-white/95 backdrop-blur rounded-xl p-5 shadow-xl border border-white/50 flex items-center gap-4 cursor-default">
                                                <div className="bg-teal-100 p-3 rounded-full shrink-0">
                                                    <CheckCircle className="w-6 h-6 text-teal-600" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-lg text-slate-900">Normes Accessibilité</div>
                                                    <div className="text-sm font-medium text-slate-500">Certifié Handibat</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 justify-center px-4">
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    <Award size={24} className="text-teal-500 fill-teal-100" />
                                    <span className="font-bold text-slate-900 text-base">Handibat</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    <Award size={24} className="text-blue-500 fill-blue-100" />
                                    <span className="font-bold text-slate-900 text-base">Silverbat</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    <CheckCircle size={24} className="text-green-500 fill-green-100" />
                                    <span className="font-bold text-slate-900 text-base">Décennale</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
 
            {isHub && (
                <section className={`py-20 bg-gradient-to-b ${palette.gradient} text-white`}>
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                Jusqu&apos;à <span className="text-yellow-400">70%</span> de subventions de l&apos;État
                            </h2>
                            <p className="text-teal-100 text-lg">
                                Cumulez les aides MaPrimeAdapt&apos; et fiscales en 2026
                            </p>
                        </div>
                        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                            {[
                                { label: "MaPrimeAdapt'", value: "Jusqu'à 70%", detail: "Financement ANAH" },
                                { label: "Crédit d'Impôt", value: "25%", detail: "Équipements seniors" },
                                { label: "TVA Réduite", value: "5.5%", detail: "Applicable d'office" },
                                { label: "Aides Locales", value: "Sur Mesure", detail: "Selon départements" },
                            ].map((aide, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                                    <div className="text-3xl font-bold text-yellow-400 mb-2">{aide.value}</div>
                                    <div className="font-semibold mb-1">{aide.label}</div>
                                    <div className="text-sm text-teal-200">{aide.detail}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
 
            {isHub && (
                <section className="py-20 bg-neutral-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 text-sm font-bold mb-4">
                                <TrendingDown size={18} />
                                Prévention &amp; Économie
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                                Baignoire Classique vs Douche Sécurisée
                            </h2>
                            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                                Remplacez votre baignoire par une douche de plain-pied et réduisez de <strong>90% les risques de chute</strong>
                            </p>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200">
                                <div className="grid md:grid-cols-2">
                                    <div className="p-8 bg-red-50 border-b md:border-b-0 md:border-r border-red-100 rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                                <span className="text-2xl">🛁</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-red-900">Baignoire Classique</h3>
                                                <p className="text-sm text-red-600">Sécurité &amp; Confort limités</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center py-3 border-b border-red-100">
                                                <span className="text-neutral-700">Risque de chute</span>
                                                <span className="font-semibold text-red-600">Élevé (Enjambement)</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3 border-b border-red-100">
                                                <span className="text-neutral-700">Consommation eau</span>
                                                <span className="font-semibold">~150L par bain</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3 border-b border-red-100">
                                                <span className="text-neutral-700">Accès fauteuil/PMR</span>
                                                <span className="font-semibold text-red-600">Impossible</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-4">
                                                <span className="font-bold text-neutral-900">Autonomie senior</span>
                                                <span className="text-lg font-bold text-red-600">Perte d&apos;indépendance</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 bg-green-50 relative rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl">
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-10">
                                            RECOMMANDÉ
                                        </div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                                <Zap className="text-teal-600" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-green-900">Douche Sécurisée</h3>
                                                <p className="text-sm text-green-600">Maintien à domicile</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center py-3 border-b border-green-100">
                                                <span className="text-neutral-700">Risque de chute</span>
                                                <span className="font-semibold text-green-600">Sécurisé (Seuil bas &lt; 3cm)</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3 border-b border-green-100">
                                                <span className="text-neutral-700">Consommation eau</span>
                                                <span className="font-semibold">~60L par douche</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3 border-b border-green-100">
                                                <span className="text-neutral-700">Accès PMR</span>
                                                <span className="font-semibold text-green-600">Plain-pied compatible</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-4">
                                                <span className="font-bold text-neutral-900">Autonomie senior</span>
                                                <span className="text-lg font-bold text-green-600">Maintien à domicile</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 text-white text-center">
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <div>
                                            <span className="text-teal-200">Facteur de risque :</span>
                                            <span className="text-3xl font-bold ml-2">Divisé par 10</span>
                                        </div>
                                        <div className="hidden sm:block w-px h-10 bg-white/30"></div>
                                        <div>
                                            <span className="text-teal-200">Installation rapide :</span>
                                            <span className="text-3xl font-bold ml-2">En 48h chrono</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-teal-200 mt-3">
                                        Nos parois de douche sont traitées antitraces et nos receveurs antidérapants de niveau PN24 pour une sécurité absolue.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
 
            {isHub && (
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                                Nos Solutions d&apos;Aménagement PMR &amp; Senior
                            </h2>
                            <p className="text-neutral-600 text-lg">
                                Des travaux d&apos;adaptation sur-mesure selon votre niveau d&apos;autonomie
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {[
                                {
                                    icon: Home,
                                    title: "Remplacement Baignoire",
                                    description: "Pour les particuliers. Retrait de votre baignoire classique et remplacement par un espace douche de plain-pied sécurisé.",
                                    features: ["Pose en 48 heures", "Habillage mural étanche", "Sans casser le carrelage"],
                                    color: "blue",
                                    href: "/guides/prix-remplacement-baignoire-douche-senior"
                                },
                                {
                                    icon: Building2,
                                    title: "Douche Italienne PMR",
                                    description: "Pour fauteuils et forte dépendance. Douche de plain-pied sans aucun seuil pour un accès sans encombre.",
                                    features: ["Seuil extra-plat < 2cm", "Siège relevable suspendu", "Norme Handibat"],
                                    color: "purple",
                                    highlight: true,
                                    href: "/guides/normes-accessibilite-douche-pmr"
                                },
                                {
                                    icon: Briefcase,
                                    title: "Rénovation PMR Complète",
                                    description: "Pour une salle de bain repensée. Adaptation intégrale : WC suspendu surélevé, barres d'appui, sol antidérapant.",
                                    features: ["Ergonomie globale", "Aides MaPrimeAdapt'", "TVA à taux 5.5%"],
                                    color: "emerald",
                                    href: "/guides/ma-prime-adapt-mode-d-emploi"
                                }
                            ].map((service, i) => (
                                <Link key={i} href={service.href} className="block group h-full">
                                    <div
                                        className={`
                                        relative h-full p-8 rounded-3xl border-2 transition-all duration-300
                                        ${service.highlight
                                                ? 'border-purple-500 bg-purple-50 shadow-xl shadow-purple-500/10 group-hover:scale-[1.02]'
                                                : 'border-neutral-200 bg-white hover:border-teal-500 hover:shadow-xl group-hover:scale-[1.02]'
                                            }
                                    `}
                                    >
                                        {service.highlight && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                                                ADAPTATION LA PLUS DEMANDÉE
                                            </div>
                                        )}
                                        <div className={`
                                        w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110
                                        ${service.color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
                                        ${service.color === 'purple' ? 'bg-purple-100 text-purple-600' : ''}
                                        ${service.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : ''}
                                    `}>
                                            <service.icon size={28} />
                                        </div>
                                        <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-teal-600 transition-colors">{service.title}</h3>
                                        <p className="text-neutral-600 mb-6">{service.description}</p>
                                        <ul className="space-y-2 mb-6">
                                            {service.features.map((feature, j) => (
                                                <li key={j} className="flex items-center gap-2 text-sm text-neutral-700">
                                                    <CheckCircle size={16} className="text-green-500" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="text-teal-600 font-bold inline-flex items-center mt-auto">
                                            Simuler le budget <ArrowRight size={16} className="ml-2" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
 
            <section className="py-20 bg-neutral-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Votre installation senior en <span className="text-teal-400">3 étapes</span>
                        </h2>
                        <p className="text-neutral-400 text-lg">
                            Un service de mise en relation simple, rapide et gratuit
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                step: "01",
                                title: "Décrivez vos besoins",
                                description: "Remplissez le formulaire en 1 minute pour préciser l'état actuel de votre salle de bain.",
                                icon: Calendar
                            },
                            {
                                step: "02",
                                title: "Comparez les offres",
                                description: "Recevez jusqu'à 3 devis d'artisans locaux agréés Handibat et éligibles MaPrimeAdapt'.",
                                icon: Shield
                            },
                            {
                                step: "03",
                                title: "Réalisez les travaux",
                                description: "Sélectionnez le prestataire de votre choix. Pose effectuée proprement en 48 heures maximum.",
                                icon: Zap
                            }
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="relative inline-block mb-6">
                                    <div className="w-20 h-20 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto">
                                        <item.icon size={32} />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-neutral-900 font-bold text-sm">
                                        {item.step}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-neutral-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <a
                            href="#simulateur"
                            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-1 transition-all"
                        >
                            <Zap size={24} />
                            Simuler mes subventions
                        </a>
                    </div>
                </div>
            </section>
 
            <RealizationsGrid />
 
            <section className="py-16 bg-white border-t border-neutral-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                                </span>
                                Maintien à domicile
                            </div>
                            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                                Une adaptation rapide en <span className="text-teal-500">48h</span>
                            </h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Parce que votre sécurité et votre confort au quotidien n&apos;attendent pas, nos plombiers locaux à <strong>{site.city}</strong> assurent une intervention soignée et rapide. Nous retirons votre ancienne baignoire et raccordons votre douche de plain-pied sans casser l&apos;intégralité de vos faïences.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-neutral-700">
                                    <CheckCircle size={20} className="text-green-500" />
                                    <span>Installation propre sans gros œuvre</span>
                                </li>
                                <li className="flex items-center gap-3 text-neutral-700">
                                    <CheckCircle size={20} className="text-green-500" />
                                    <span>Garantie décennale sur toute la plomberie et receveur</span>
                                </li>
                                <li className="flex items-center gap-3 text-neutral-700">
                                    <CheckCircle size={20} className="text-green-500" />
                                    <span>Traitement antidérapant PN24 de haute sécurité</span>
                                </li>
                            </ul>
                            <a href="#simulateur" className="text-teal-600 font-bold hover:underline flex items-center gap-2">
                                Simuler mes subventions <ArrowRight size={16} />
                            </a>
                        </div>
                        <div className="w-full md:w-1/3">
                            <div className="bg-neutral-900 text-white rounded-2xl p-8 text-center shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Shield size={120} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">MaPrimeAdapt&apos;</h3>
                                <div className="text-3xl font-bold text-yellow-400 mb-4">
                                    <span className="text-sm text-neutral-400 font-normal mr-1 italic">Jusqu&apos;à</span>
                                    70%<span className="text-sm text-neutral-400 font-normal"> d&apos;aides</span>
                                </div>
                                <p className="text-sm text-neutral-300 mb-6">Dossier administratif de subventions géré intégralement par nos experts pour votre confort.</p>
                                <a
                                    href="#simulateur"
                                    className="block w-full bg-white text-neutral-900 font-bold py-3 rounded-xl hover:bg-neutral-100 transition text-center"
                                >
                                    Faire le test d&apos;éligibilité
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
 
            {isHub && <TestimonialsSection />}
            <Reviews site={site} themeColor={themeColor} />
            <FAQ themeColor={themeColor} />
            <FAQSection city={site.city} />
 
            {!isHub && site.quartiers && site.quartiers.length > 0 && (
                <section className="py-16 bg-neutral-50 border-t border-neutral-200">
                    <div className="container mx-auto px-4">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                            Installation douche senior à {site.city} et environs
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {site.quartiers.map((quartier: string, i: number) => (
                                <Link
                                    key={i}
                                    href={`#simulateur`}
                                    className="inline-block bg-white px-4 py-2 rounded-full text-sm text-neutral-700 border border-neutral-200 hover:border-teal-500 hover:text-teal-600 hover:shadow-sm transition-colors cursor-pointer"
                                >
                                    Douche Senior {quartier}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
 
            <InternalMesh city={site.city} config={site} />
            <Footer config={site} />
            <MobileStickyCTA themeColor={themeColor} />
            <FloatingCTA label="Simuler mes aides" />
        </div>
    );
}
