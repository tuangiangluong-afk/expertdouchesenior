"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQProps {
    city?: string;
    type?: string;
    themeColor?: 'blue' | 'emerald' | 'amber' | 'purple' | 'teal';
}

export default function FAQ({ city, type, themeColor = 'teal' }: FAQProps) {
    const questions = [
        {
            q: "Combien coûte le remplacement d'une baignoire par une douche senior ?",
            a: "Le coût moyen d'un remplacement complet (dépose de la baignoire, fourniture et pose d'un espace douche sécurisé) se situe entre 3 500€ et 6 000€ TTC. Ce tarif varie selon les dimensions, le type de parois et l'intégration d'équipements comme un siège relevable ou des barres de maintien ergonomiques."
        },
        {
            q: "Qu'est-ce que l'aide de l'État MaPrimeAdapt' ?",
            a: "Lancée par l'ANAH, MaPrimeAdapt' est l'aide unique à l'adaptation du logement. Elle permet de financer jusqu'à 50% ou 70% du montant hors taxes des travaux d'adaptation (plafonné à 22 000€ HT) pour les seniors de 60 ans et plus en perte d'autonomie ou les personnes handicapées sous conditions de ressources."
        },
        {
            q: "Combien de temps durent les travaux de remplacement ?",
            a: "Nos plombiers-installateurs certifiés réalisent les travaux de dépose et de pose de la nouvelle douche sécurisée en seulement 48 heures. Il n'y a pas besoin de refaire l'intégralité du carrelage ou de la faïence grâce à l'utilisation de panneaux d'habillage étanches."
        },
        {
            q: "Quels sont les éléments indispensables pour sécuriser la douche ?",
            a: "Pour garantir une sécurité maximale et prévenir les chutes, la douche doit comporter : un receveur ultra-plat avec traitement antidérapant de classe PN24 (norme R11), un mitigeur thermostatique de sécurité anti-brûlure, un siège ergonomique suspendu ou repliable, et au moins une barre d'appui de maintien solidement ancrée."
        },
        {
            q: "Puis-je bénéficier de la TVA réduite à 5,5% ?",
            a: "Oui, les travaux visant à améliorer l'accessibilité pour les personnes âgées ou à mobilité réduite bénéficient directement d'une TVA à taux réduit de 5,5% au lieu de 20%, applicable sur la fourniture et la pose par un professionnel agréé."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const themeStyles = {
        blue: "bg-blue-100 text-blue-700",
        emerald: "bg-emerald-100 text-emerald-700",
        amber: "bg-amber-100 text-amber-800",
        purple: "bg-purple-100 text-purple-700",
        teal: "bg-teal-100 text-teal-700"
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": questions.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };
    const badgeClass = themeStyles[themeColor] || themeStyles.teal;

    return (
        <section className="py-20 bg-slate-50 border-t border-slate-200">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${badgeClass}`}>
                        Questions Fréquentes
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                        Des questions sur votre douche sécurisée ?
                    </h2>
                    <p className="text-xl text-slate-600 mt-4">
                        Nous avons réuni les réponses pour vous aider à préparer votre projet de maintien à domicile.
                    </p>
                </div>

                <div className="space-y-4">
                    {questions.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-bold text-lg text-slate-900 pr-8">{item.q}</span>
                                <ChevronDown
                                    className={`text-slate-400 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                                />
                            </button>

                            <div
                                className={`
                                    overflow-hidden transition-all duration-300 ease-in-out
                                    ${openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                                `}
                            >
                                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                                    {item.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
