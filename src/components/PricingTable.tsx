"use client";

export default function PricingTable() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">
                    Quel prix pour une douche senior en 2026 ?
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full max-w-4xl mx-auto text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-100 text-slate-700">
                                <th className="p-4 border-b">Type d&apos;aménagement</th>
                                <th className="p-4 border-b">Matériel (Receveur, Parois, Siège)</th>
                                <th className="p-4 border-b">Installation (Pose &amp; Étanchéité)</th>
                                <th className="p-4 border-b">Reste à Charge Moyen*</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-600">
                            <tr className="border-b hover:bg-slate-50">
                                <td className="p-4 font-bold text-teal-900">Remplacement Baignoire par Douche</td>
                                <td className="p-4">1 800€ - 3 000€</td>
                                <td className="p-4">1 200€ - 2 000€</td>
                                <td className="p-4 font-bold text-green-600">Dès 1 100€ (Après aides)</td>
                            </tr>
                            <tr className="border-b hover:bg-slate-50">
                                <td className="p-4 font-bold text-teal-900">Douche Italienne PMR (Plain-pied)</td>
                                <td className="p-4">2 500€ - 4 000€</td>
                                <td className="p-4">1 800€ - 3 000€</td>
                                <td className="p-4 font-bold text-green-600">Dès 1 500€ (Après aides)</td>
                            </tr>
                            <tr className="border-b hover:bg-slate-50">
                                <td className="p-4 font-bold text-teal-900">Rénovation Complète Salle de Bain</td>
                                <td className="p-4">3 500€ - 6 500€</td>
                                <td className="p-4">2 500€ - 5 000€</td>
                                <td className="p-4 font-bold text-green-600">Dès 2 500€ (Après aides)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-center text-sm text-slate-500 mt-4 italic">
                    *Estimations moyennes 2026 incluant l&apos;aide MaPrimeAdapt&apos; (financement jusqu&apos;à 70% pour les revenus très modestes) et TVA 5.5%. Le prix dépend de l&apos;état de votre plomberie existante.
                </p>
            </div>
        </section>
    );
}
