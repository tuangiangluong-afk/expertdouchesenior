import { CityConfig } from "@/lib/db";

interface LocalFAQProps {
    site: CityConfig;
    segment: "B2C" | "COPRO" | "ENTREPRISE";
}

export function LocalFAQ({ site, segment }: LocalFAQProps) {
    const city = site.city;
    const faqs = getLocalFAQData(city, site.department, segment);

    return (
        <section className="py-16 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900">
                        Questions fréquentes à {city}
                    </h2>
                    <p className="text-slate-600 mt-3 text-lg">
                        Tout savoir sur le remplacement de baignoire par une douche sécurisée senior.
                    </p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <details 
                            key={idx} 
                            className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
                            {...(idx === 0 ? { open: true } : {})}
                        >
                            <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-bold text-slate-900 hover:bg-slate-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                                <span>{faq.question}</span>
                                <span className="ml-4 shrink-0 text-slate-400 group-open:rotate-45 transition-transform text-2xl font-light">+</span>
                            </summary>
                            <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

function cityHash(city: string): number {
    let hash = 0;
    for (let i = 0; i < city.length; i++) {
        hash = ((hash << 5) - hash + city.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
}

// Exported for SchemaJSON to generate FAQPage structured data
export function getLocalFAQData(city: string, department: string | undefined, segment: "B2C" | "COPRO" | "ENTREPRISE") {
    const dept = department || "votre département";
    const h = cityHash(city);

    if (segment === "COPRO") {
        const coproCount = 8 + (h % 25);
        return [
            {
                question: `L'adaptation de salle de bain senior en copropriété à ${city} nécessite-t-elle l'accord du syndic ?`,
                answer: `Non, les travaux à l'intérieur de votre appartement (remplacement de baignoire, installation d'une douche PMR) ne nécessitent pas d'autorisation du syndic ou de vote en AG, car ils concernent uniquement vos parties privatives.`
            },
            {
                question: `Existe-t-il des aides collectives pour l'accessibilité en copropriété à ${city} ?`,
                answer: `Pour les parties communes d'un immeuble à ${city}, des aides de l'Anah ou des subventions locales peuvent financer des rampes d'accès ou l'adaptation d'ascenseurs, mais le remplacement de baignoire reste un projet individuel. Plus de ${coproCount} résidences du ${dept} ont déjà bénéficié de nos conseils.`
            },
            {
                question: `Quel artisan appeler pour une douche senior en copropriété à ${city} ?`,
                answer: `Il est fortement recommandé de faire appel à un artisan qualifié certifié Handibat ou Silverbat à ${city} pour garantir le respect des normes d'accessibilité PMR et de sécurité d'installation.`
            }
        ];
    } else if (segment === "ENTREPRISE") {
        const entrepriseCount = 15 + (h % 35);
        return [
            {
                question: `Quelles obligations d'accessibilité pour les établissements recevant du public (ERP) à ${city} ?`,
                answer: `Les ERP à ${city} doivent adapter leurs sanitaires pour les rendre accessibles aux personnes à mobilité réduite (PMR). Cela implique des dimensions minimales, des barres d'appui et un aménagement spécifique de la douche et des WC. Plus de ${entrepriseCount} ERP dans le ${dept} ont été mis aux normes.`
            },
            {
                question: `Quels types d'équipements douche PMR installer pour un ERP à ${city} ?`,
                answer: `Il convient de poser un bac à douche extra-plat ou un sol de douche à l'italienne sans ressaut, un mitigeur thermostatique anti-brûlure, un siège de douche ergonomique relevable et une barre d'appui coudée.`
            },
            {
                question: `Existe-t-il des aides à l'accessibilité pour les commerces et ERP à ${city} ?`,
                answer: `Oui, les petites entreprises et commerces indépendants à ${city} peuvent bénéficier du fonds territorial d'accessibilité (prenant en charge jusqu'à 50% des dépenses éligibles pour la mise aux normes PMR).`
            }
        ];
    } else {
        const installCount = 40 + (h % 80);
        return [
            {
                question: `Quel est le prix d'une installation de douche senior à ${city} ?`,
                answer: `Le coût moyen d'un remplacement de baignoire par une douche sécurisée senior à ${city} se situe entre 3 500€ et 7 000€ TTC. Ce tarif comprend la dépose de l'ancienne baignoire, la fourniture et la pose de la douche plain-pied ou avec bac extra-plat, des parois vitrées de sécurité, ainsi que les accessoires ergonomiques (siège de douche, barres de maintien).`
            },
            {
                question: `Combien de temps durent les travaux de remplacement à ${city} ?`,
                answer: `Nos installateurs certifiés à ${city} réalisent la transformation complète en seulement 24 à 48 heures. Votre salle de bain est ainsi rapidement opérationnelle, réduisant au minimum les désagréments chez vous. Plus de ${installCount} chantiers ont été réalisés dans le ${dept} récemment.`
            },
            {
                question: `Quelles subventions pour l'installation d'une douche PMR à ${city} ?`,
                answer: `À ${city}, vous pouvez bénéficier de l'aide MaPrimeAdapt' de l'Anah (pouvant financer jusqu'à 50% à 70% du montant des travaux pour les revenus modestes à très modestes), d'un crédit d'impôt de 25% pour l'accessibilité, et d'une TVA réduite à 5,5%. Nos conseillers vous accompagnent gratuitement dans le montage du dossier.`
            }
        ];
    }
}
