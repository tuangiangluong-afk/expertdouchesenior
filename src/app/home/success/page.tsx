import { Metadata } from "next";
import { getSiteConfig } from "@/lib/sites-config";
import { CheckCircle, Phone, Wrench, FileText, Gift, ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import ViteUnDevisSpinner from "@/components/ViteUnDevisSpinner";

export async function generateMetadata(): Promise<Metadata> {
    const domain = "expertdouchesenior.com";
    const config = getSiteConfig(domain);

    return {
        title: `Demande reçue | ${config?.name || "Expert Douche Senior"}`,
        description: "Votre demande de simulation a été envoyée avec succès. Un conseiller vous contactera sous 24h.",
        robots: { index: false, follow: false },
    };
}

interface TimelineStep {
    icon: React.ReactNode;
    title: string;
    timing: string;
    description: string;
    active: boolean;
}

const timelineSteps: TimelineStep[] = [
    {
        icon: <Phone className="w-5 h-5" />,
        title: "Appel d'un conseiller",
        timing: "Sous 24h",
        description: "Nous validerons votre éligibilité aux aides de l'État (MaPrimeAdapt') et détaillerons votre projet.",
        active: true,
    },
    {
        icon: <Wrench className="w-5 h-5" />,
        title: "Visite technique",
        timing: "Évaluation à domicile",
        description: "Un artisan agréé Handibat étudiera la faisabilité technique pour un remplacement en 48h sans gros travaux.",
        active: false,
    },
    {
        icon: <FileText className="w-5 h-5" />,
        title: "Devis & Dossier d'aide",
        timing: "Reste à charge minimal",
        description: "Vous recevrez le devis d'installation sécurisée et nous monterons votre dossier de subvention ANAH.",
        active: false,
    },
];

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SuccessPage({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams;
    const devisId = resolvedSearchParams.devis_id as string | undefined;
    const devisHash = resolvedSearchParams.devis_hash as string | undefined;

    const domain = "expertdouchesenior.com";
    const config = getSiteConfig(domain);
    const siteName = config?.name || "Expert Douche Senior";

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 md:px-20">
                <Link href="/" className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-teal-600 rounded-lg flex items-center justify-center text-white">
                        <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                            <path d="M12 2L2 22H22L12 2Z" />
                        </svg>
                    </div>
                    <span className="text-lg font-bold text-slate-900">{siteName}</span>
                </Link>
                <Link
                    href="/contact"
                    className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
                >
                    Centre d&apos;aide
                </Link>
            </header>

            <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
                {/* Success Hero */}
                <div className="flex flex-col items-center justify-center text-center mb-12">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <CheckCircle className="w-12 h-12" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                        Simulation enregistrée !
                    </h1>
                    <p className="text-lg text-slate-600 max-w-xl">
                        Votre demande d&apos;aide à l&apos;adaptation a bien été prise en compte. Un conseiller Expert Douche Senior
                        examinera vos informations et vous contactera sous 24h.
                    </p>
                </div>

                {/* ViteUnDevis SMS Verification Spinner */}
                {devisId && devisHash && (
                    <div className="mb-12 max-w-2xl mx-auto">
                        <ViteUnDevisSpinner devisId={devisId} devisHash={devisHash} />
                    </div>
                )}

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left: Timeline */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-teal-600" />
                                Prochaines étapes
                            </h2>

                            <div className="space-y-0">
                                {timelineSteps.map((step, index) => (
                                    <div key={index} className="flex gap-4">
                                        {/* Timeline line and icon */}
                                        <div className="flex flex-col items-center">
                                            {index !== 0 && (
                                                <div className="w-0.5 h-4 bg-slate-200" />
                                            )}
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-full z-10 ${step.active
                                                ? "bg-teal-600 text-white shadow-md"
                                                : "bg-slate-100 text-slate-500 border border-slate-200"
                                                }`}>
                                                {step.icon}
                                            </div>
                                            {index !== timelineSteps.length - 1 && (
                                                <div className="w-0.5 bg-slate-200 h-full min-h-[40px]" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pb-8">
                                            <p className="text-slate-900 text-lg font-semibold">{step.title}</p>
                                            <p className={`text-sm font-medium mb-1 ${step.active ? "text-teal-600" : "text-slate-500"
                                                }`}>
                                                {step.timing}
                                            </p>
                                            <p className="text-slate-500 text-sm">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trust badges */}
                        <div className="mt-6 flex flex-wrap justify-center gap-8 opacity-60">
                            {["HANDIBAT", "SILVERBAT", "MAPRIMEADAPT"].map((badge) => (
                                <div key={badge} className="text-xs font-bold text-slate-500 tracking-widest">
                                    {badge}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Value adds */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* Grant Guide Card */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-1 shadow-lg text-white overflow-hidden relative">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-600/30 rounded-full blur-2xl" />
                            <div className="p-6 md:p-8 relative z-10">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-600/20 border border-teal-600/30 text-xs font-bold text-teal-400 mb-3">
                                    <Gift className="w-3 h-3" />
                                    Ressource gratuite
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold mb-2">
                                    Optimisez vos subventions
                                </h3>
                                <p className="text-slate-300 text-sm mb-6">
                                    Découvrez les critères et étapes clés de l&apos;aide <strong>MaPrimeAdapt&apos;</strong>
                                    de l&apos;ANAH pour financer jusqu&apos;à 70% de vos travaux d&apos;adaptation de salle de bain.
                                </p>
                                <Link
                                    href="/guides/ma-prime-adapt-mode-d-emploi"
                                    className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition-all w-full"
                                >
                                    <Download className="w-4 h-4" />
                                    Lire le guide
                                </Link>
                            </div>
                        </div>

                        {/* Referral Card */}
                        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-5 items-center">
                            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                                <Gift className="w-6 h-6" />
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h4 className="text-slate-900 font-bold mb-1">Recommander un proche</h4>
                                <p className="text-slate-500 text-sm mb-3">
                                    Vous connaissez un autre senior qui souhaite sécuriser sa salle de bain ? 
                                    Aidez-le à obtenir ses subventions rapidement.
                                </p>
                                <button className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 mx-auto sm:mx-0">
                                    Partager notre simulateur
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Return link */}
                <div className="mt-16 text-center">
                    <Link
                        href="/"
                        className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors"
                    >
                        ← Retour à l&apos;accueil
                    </Link>
                </div>
            </main>
        </div>
    );
}
