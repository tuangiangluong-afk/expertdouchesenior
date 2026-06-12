"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQSection({ city }: { city?: string }) {
    const cityText = city ? ` à ${city}` : "";
    const cityPlural = city ? ` à ${city} et ses alentours` : "";
    
    const faqs = [
        {
            question: `Qui a le droit d'installer une douche sécurisée senior${cityText} ?`,
            answer: `Bien que tout plombier puisse théoriquement poser une douche, il est recommandé de faire appel à un électricien-plombier certifié Handibat ou Silverbat. Ces labels attestent de leur maîtrise des exigences d'accessibilité (angles d'assises, hauteurs d'assise, pentes de receveurs) et sont requis pour déduire les subventions MaPrimeAdapt'${cityText}.`
        },
        {
            question: `Quel est le prix d'installation moyen d'une douche PMR${cityText} ?`,
            answer: `Le coût moyen constaté pour le remplacement clé en main de votre baignoire par une douche PMR${cityText} s'établit entre 3 800€ et 5 800€ TTC. Selon vos ressources et les subventions de l'ANAH, le reste à charge peut être inférieur à 1 500€.`
        },
        {
            question: `Quels sont les aménagements de salle de bain éligibles aux aides ?`,
            answer: `Sont éligibles au financement MaPrimeAdapt' l'installation d'un receveur de douche extra-plat de plain-pied, l'assise ergonomique relevable, le WC surélevé ou suspendu, les barres d'appui murales renforcées, l'adaptation du lavabo suspendu fixe, et les sols avec revêtement antidérapant de classe PN24.`
        },
        {
            question: "L'installation engendre-t-elle de gros travaux de maçonnerie ?",
            answer: "Non. Grâce à nos panneaux d'habillage muraux étanches sur-mesure installés sur les parois existantes, nous évitons la dépose fastidieuse du carrelage existant. Cela évite le bruit, la poussière excessive, et permet une réalisation en seulement 48h."
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-slate-900 mb-4">
                        Questions fréquentes
                    </h2>
                    <p className="text-slate-600">
                        Tout savoir sur l&apos;adaptation de votre salle de bain pour seniors.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <FAQItem question={faq.question} answer={faq.answer} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
            >
                <span className="font-bold text-slate-900 pr-8">{question}</span>
                {isOpen ? (
                    <Minus className="w-5 h-5 text-teal-600 shrink-0" />
                ) : (
                    <Plus className="w-5 h-5 text-slate-400 shrink-0" />
                )}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="p-6 pt-0 text-slate-600 border-t border-slate-100 mt-2">
                    {answer}
                </div>
            </div>
        </div>
    );
}
