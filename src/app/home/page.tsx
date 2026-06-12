import { getHubConfig, SITES, SiteConfig } from "@/lib/sites-config";
import { NATIONAL_TARGETS } from "@/config/national-targets";
import { Zap, Award, ArrowRight, Building2, Home, Briefcase, CheckCircle, TrendingDown } from "lucide-react";
import LocalLinker from "@/components/blog/LocalLinker";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";
import { CityCards } from "@/components/CityCards";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { Footer } from "@/components/Footer";
import RealizationsGrid from "@/components/RealizationsGrid";
import LogoCloud from "@/components/LogoCloud";
import PricingTable from "@/components/PricingTable";
import InstallationSteps from "@/components/InstallationSteps";
import TestimonialsSection from "@/components/TestimonialsSection";
import FloatingCTA from "@/components/FloatingCTA";

export const metadata: Metadata = {
    title: "Remplacement Baignoire par Douche Senior | Devis Gratuit",
    description: "Recevez jusqu'à 3 devis gratuits d'installateurs de douches sécurisées et PMR. Éligible MaPrimeAdapt' (jusqu'à 70% d'aides de l'État). Pose en 48h.",
    keywords: ["douche senior", "remplacement baignoire douche senior", "devis douche senior", "douche pmr", "maprimeadapt salle de bain"],
};

export default function HomePage() {
    const hub = getHubConfig();

    const cities = NATIONAL_TARGETS.map(target => ({
        name: target.name,
        department: target.zip.substring(0, 2),
        slug: target.slug,
        available: true
    }));

    return (
        <div className="min-h-screen font-sans text-slate-900 bg-white">
            {/* NAVIGATION - Light Tech-Trust Style */}
            <Header isHub={true} variant="default" themeColor="teal" />

            {/* HERO */}
            <section className="relative pt-20 pb-12 lg:pt-24 lg:pb-32 overflow-hidden bg-slate-50">
                {/* Subtle background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/95 via-slate-50/90 to-slate-50" />
                    <Image
                        src={hub.heroImage}
                        alt="Remplacement baignoire par douche senior"
                        fill
                        priority
                        className="object-cover opacity-20"
                        sizes="100vw"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-20">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8">
                        {/* Left: Content & Form */}
                        <div className="lg:col-span-7 flex flex-col gap-8 text-center lg:text-left">
                            <div>
                                {/* Trust Badge */}
                                <div className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700 mb-6">
                                    <CheckCircle size={16} className="mr-2" />
                                    Réseau National Certifié Handibat
                                </div>

                                {/* H1 */}
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                                    Remplacer votre Baignoire par une <span className="text-teal-600">Douche Senior</span>. Obtenez vos devis.
                                </h1>

                                {/* Subtitle */}
                                <p className="text-xl text-slate-600 mb-4 max-w-xl mx-auto lg:mx-0">
                                    <strong className="text-slate-900">Recevez jusqu&apos;à 3 devis gratuits</strong> d&apos;artisans qualifiés RGE près de chez vous.
                                </p>
                            </div>

                            {/* LEAD FORM - Integrated Here */}
                            <div className="w-full max-w-xl mx-auto lg:mx-0 relative z-30 text-left">
                                <div id="simulateur" className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 overflow-hidden border border-slate-200">
                                    <div className="p-1 bg-gradient-to-r from-teal-600 to-teal-500"></div>
                                    <div className="p-6 md:p-8">
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-slate-900">Simuler mes subventions de l&apos;État</h3>
                                            <p className="text-sm text-slate-500">Réponse immédiate • Gratuit • Sans engagement</p>
                                        </div>
                                        <LeadForm
                                            city="France"
                                            domain="expertdouchesenior.com"
                                            targetType="MIXED"
                                            themeColor="teal"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Large Hero Image + Trust Badges */}
                        <div className="lg:col-span-5 hidden lg:block relative w-full">
                            <div className="relative h-[640px] w-full mb-8">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-100 bg-white p-2">
                                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                                        <Image
                                            src={hub.heroImage}
                                            alt="Douche senior sécurisée installée"
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority
                                        />
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                                        {/* Image Caption/Badge */}
                                        <div className="absolute bottom-8 left-8 right-8 z-20">
                                            <div className="bg-white/95 backdrop-blur rounded-xl p-5 shadow-xl border border-white/50 flex items-center gap-4 cursor-default">
                                                <div className="bg-green-100 p-3 rounded-full shrink-0">
                                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-lg text-slate-900">Installation Norme PMR</div>
                                                    <div className="text-sm font-medium text-slate-500">Garantie étanchéité &amp; anti-chute</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Elements */}
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

            {/* Logos */}
            <LogoCloud />

            {/* Comparison Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 text-sm font-bold mb-4">
                            <TrendingDown size={18} />
                            Prévention &amp; Sécurité
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Baignoire Classique vs Douche Sécurisée
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Rénovez votre espace d&apos;eau pour conserver votre autonomie à domicile et éliminer les risques.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200">
                            <div className="grid md:grid-cols-2">
                                {/* Baignoire Column */}
                                <div className="p-8 bg-red-50 border-b md:border-b-0 md:border-r border-red-100 rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                            <span className="text-2xl">🛁</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-red-900">Baignoire Classique</h3>
                                            <p className="text-sm text-red-600">Difficulté d&apos;accès</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-red-100">
                                            <span className="text-neutral-700">Risque de chute</span>
                                            <span className="font-semibold text-red-600">Élevé (Enjambement &gt; 50cm)</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-red-100">
                                            <span className="text-neutral-700">Sécurité anti-glisse</span>
                                            <span className="font-semibold text-red-600">Absente</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-4">
                                            <span className="font-bold text-neutral-900">Autonomie senior</span>
                                            <span className="text-lg font-bold text-red-600">Assistance requise</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Douche Column */}
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
                                            <p className="text-sm text-green-600">Accès plain-pied</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-green-100">
                                            <span className="text-neutral-700">Risque de chute</span>
                                            <span className="font-semibold text-green-600">Minimisé (Seuil bas &lt; 3cm)</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-green-100">
                                            <span className="text-neutral-700">Sécurité anti-glisse</span>
                                            <span className="font-semibold text-green-600">Receveur PN24 R11</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-4">
                                            <span className="font-bold text-neutral-900">Autonomie senior</span>
                                            <span className="text-lg font-bold text-green-600">Maintien à domicile</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Subsidies Section */}
            <section className="py-20 bg-teal-600 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Jusqu&apos;à <span className="text-yellow-400">70%</span> de financement public
                        </h2>
                        <p className="text-teal-100 text-lg">
                            Profitez des aides MaPrimeAdapt&apos; de l&apos;ANAH et fiscales en 2026
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            { label: "MaPrimeAdapt'", value: "Jusqu'à 70%", detail: "Subvention ANAH" },
                            { label: "Crédit d'Impôt", value: "25%", detail: "Dépenses d'adaptation" },
                            { label: "TVA Réduite", value: "5.5%", detail: "Applicable sur devis" },
                            { label: "Aide Action Logement", value: "Jusqu'à 5 000€", detail: "Selon éligibilité" },
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

            {/* Pricing Table & Installation Steps */}
            <PricingTable />
            <InstallationSteps />

            {/* Services Solutions */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Des aménagements adaptés à vos besoins
                        </h2>
                        <p className="text-slate-600 text-lg">
                            Remplacement de baignoire, douche PMR ou rénovation de salle de bain senior
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { icon: Home, title: "Remplacement Baignoire", desc: "Dépose propre et installation d'un receveur extra-plat avec parois vitrées en 48h.", href: "/guides/prix-remplacement-baignoire-douche-senior" },
                            { icon: Building2, title: "Douche Italienne PMR", desc: "Douche de plain-pied sans marche pour un accès en fauteuil roulant en toute autonomie.", href: "/guides/normes-accessibilite-douche-pmr" },
                            { icon: Briefcase, title: "Rénovation PMR Complète", desc: "Sol antidérapant, WC surélevé, lavabo ergonomique suspendu et barres murales.", href: "/guides/ma-prime-adapt-mode-d-emploi" },
                        ].map((service, i) => (
                            <Link key={i} href={service.href} className="block group">
                                <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-200 group-hover:shadow-xl group-hover:border-teal-500 transition-all h-full">
                                    <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <service.icon className="text-teal-600" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-teal-600 transition-colors">{service.title}</h3>
                                    <p className="text-slate-600 mb-4">{service.desc}</p>
                                    <div className="text-teal-600 font-bold inline-flex items-center opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 group-hover:translate-y-0 duration-300">
                                        En savoir plus <ArrowRight size={16} className="ml-2" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Realizations */}
            <RealizationsGrid />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* Cities Grid */}
            <section id="villes" className="py-20 bg-slate-50 scroll-mt-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Nos installateurs par ville
                        </h2>
                        <p className="text-slate-600 text-lg">
                            Trouvez un expert qualifié Handibat près de chez vous
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto mb-16">
                        <div className="bg-white p-2 rounded-3xl shadow-lg border border-slate-200">
                            <LocalLinker />
                        </div>
                    </div>

                    <div className="mb-16">
                        <CityCards cities={cities} />
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                        Sécurisez votre salle de bain dès aujourd&apos;hui
                    </h2>
                    <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                        Faites le test d&apos;éligibilité MaPrimeAdapt&apos; en 2 minutes et obtenez des devis gratuits.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#simulateur"
                            className="flex items-center justify-center gap-3 rounded-2xl bg-teal-600 px-8 py-4 text-lg font-bold text-white shadow-xl hover:bg-teal-700 transition"
                        >
                            <Zap size={24} />
                            Simuler mes subventions
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer config={hub} />

            {/* Mobile Sticky CTA */}
            <MobileStickyCTA themeColor="teal" />

            {/* Floating CTA */}
            <FloatingCTA label="Simuler mes aides" />
        </div>
    );
}
