import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mentions Légales - Expert Douche Senior",
    description: "Mentions légales, éditeur, hébergement et politique de confidentialité du réseau Expert Douche Senior.",
};

export default function MentionsLegales() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-neutral-900">
            {/* Header */}
            <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/90 px-4 py-3 backdrop-blur-md text-white">
                <div className="container mx-auto flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-bold hover:text-teal-400 transition"
                    >
                        <ArrowLeft size={16} />
                        Retour Accueil
                    </Link>
                    <span className="text-sm font-bold">
                        Expert Douche Senior<span className="text-teal-500">.</span>
                    </span>
                </div>
            </nav>

            <main className="container mx-auto max-w-3xl px-4 py-12 lg:py-20">
                <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
                    Mentions Légales
                </h1>

                <div className="prose prose-neutral prose-lg max-w-none">
                    <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                        <h2 className="mb-4 text-2xl font-bold text-teal-900">1. Éditeur du Site</h2>
                        <p>
                            Le site <strong>Expert Douche Senior</strong> (expertdouchesenior.com) est édité par la société <strong>WELINK TECH</strong>.
                        </p>
                        <ul className="list-none space-y-2 pl-0">
                            <li><strong>Forme juridique :</strong> SASU</li>
                            <li><strong>Siège social :</strong> 6 RUE DES BATELIERS, 92110 CLICHY</li>
                            <li><strong>SIREN :</strong> 984 800 136</li>
                            <li><strong>SIRET :</strong> 984 800 136 00017</li>
                            <li><strong>Responsable de publication :</strong> Direction WELINK TECH</li>
                            <li><strong>Contact :</strong> <Link href="/contact" className="underline text-teal-600">Formulaire de contact</Link></li>
                        </ul>
                    </div>

                    <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                        <h2 className="mb-4 text-2xl font-bold text-teal-900">2. Service Proposé</h2>
                        <p>
                            Expert Douche Senior est une plateforme nationale de mise en relation entre les particuliers (notamment seniors et personnes à mobilité réduite) et des professionnels qualifiés RGE, Handibat ou Silverbat spécialisés dans l'adaptation de salles de bain et l'installation de douches sécurisées.
                        </p>
                    </div>

                    <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                        <h2 className="mb-4 text-2xl font-bold text-teal-900">3. Hébergement</h2>
                        <p>
                            Le Site est hébergé par la société <strong>Vercel Inc.</strong>
                        </p>
                        <ul className="list-none space-y-2 pl-0">
                            <li><strong>Adresse :</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, USA</li>
                            <li><strong>Cloud Provider :</strong> Infrastructure AWS / Vercel Edge Network</li>
                        </ul>
                    </div>

                    <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                        <h2 className="mb-4 text-2xl font-bold text-teal-900">4. Propriété Intellectuelle</h2>
                        <p>
                            L&apos;ensemble des contenus (textes, images, base de données, marque &quot;Expert Douche Senior&quot;) est protégé par le droit de la propriété intellectuelle. Toute reproduction non autorisée est interdite.
                        </p>
                    </div>

                    <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                        <h2 className="mb-4 text-2xl font-bold text-teal-900">5. Données Personnelles (RGPD)</h2>
                        <p>
                            Les données collectées (nom, téléphone, adresse d'installation, type de projet, âge) sont utilisées uniquement pour l'établissement de devis, la simulation des aides de l'État (MaPrimeAdapt') et la mise en relation avec nos partenaires installateurs certifiés.
                        </p>
                        <p>
                            Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Pour l&apos;exercer, contactez-nous via la page contact.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
