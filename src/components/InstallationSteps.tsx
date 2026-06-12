"use client";

import { ClipboardList, PiggyBank, ShieldAlert, CheckCircle } from "lucide-react";

export default function InstallationSteps() {
    const steps = [
        { 
            title: "1. Visite Technique", 
            desc: "Un technicien qualifié se déplace pour prendre les mesures et vérifier la faisabilité (évacuations, tuyauterie).",
            icon: ClipboardList
        },
        { 
            title: "2. Plan & Devis Aides", 
            desc: "Nous concevons les plans 3D de votre douche et calculons vos subventions MaPrimeAdapt' et crédit d'impôt.",
            icon: PiggyBank
        },
        { 
            title: "3. Pose en 48 heures", 
            desc: "Nos poseurs certifiés Handibat retirent votre ancienne baignoire et installent la douche sécurisée proprement.",
            icon: ShieldAlert
        },
        { 
            title: "4. Réception & Garanties", 
            desc: "Contrôle d'étanchéité rigoureux, explication des équipements et mise en place des garanties décennales.",
            icon: CheckCircle
        }
    ];

    return (
        <section className="py-16 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-3xl font-bold text-center mb-4 text-slate-900">Comment se passe l&apos;adaptation de votre douche ?</h2>
                <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">Une rénovation fluide et maîtrisée de A à Z par nos artisans certifiés Handibat.</p>
                <div className="grid md:grid-cols-4 gap-6">
                    {steps.map((s, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                            <div className="text-4xl font-black text-teal-100 mb-4 flex justify-between items-center">
                                <span>0{i + 1}</span>
                                <s.icon className="w-8 h-8 text-teal-600 opacity-60" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
