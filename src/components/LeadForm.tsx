"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Home,
    User,
    UserCheck,
    Clock,
    Heart,
    Shield,
    Phone,
    Mail,
    User2,
    Calendar,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    Activity,
    AlertTriangle,
    Zap
} from "lucide-react";
import Link from "next/link";

declare global {
    interface Window {
        dataLayer: Record<string, unknown>[];
    }
}

interface LeadFormProps {
    city: string;
    domain: string;
    targetType?: 'SENIOR' | 'PMR' | 'MIXED';
    themeColor?: 'teal' | 'emerald' | 'amber' | 'purple';
    initialProjectType?: 'baignoire_douche' | 'douche_pmr' | 'renovation_sdb';
}

interface FormData {
    projectType: 'baignoire_douche' | 'douche_pmr' | 'renovation_sdb' | 'autre' | null;
    beneficiaryAge: 'plus_70' | '60_70' | 'moins_60' | null;
    ownerStatus: 'proprietaire' | 'locataire' | 'autre' | null;
    timeline: 'immediat' | 'trimestre' | 'reflexion' | null;
    name: string;
    email: string;
    phone: string;
    zipCode: string;
    stairliftInterest?: boolean;
    phoneConsent?: boolean;
}

const FRENCH_PHONE_REGEX = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
const ZIP_CODE_REGEX = /^\d{5}$/;

export default function LeadForm({
    city,
    domain,
    targetType = 'MIXED',
    themeColor = 'teal',
    initialProjectType
}: LeadFormProps) {
    const router = useRouter();
    const INITIAL_FORM_DATA: FormData = {
        projectType: initialProjectType || null,
        beneficiaryAge: null,
        ownerStatus: null,
        timeline: null,
        name: "",
        email: "",
        phone: "",
        zipCode: "",
        phoneConsent: false,
        stairliftInterest: false
    };

    const [step, setStep] = useState(initialProjectType ? 2 : 1);
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    const totalSteps = 5;
    const progress = (step / totalSteps) * 100;

    // Lead scoring for PMR shower leads
    const getLeadScore = (): number => {
        let score = 0;
        if (formData.projectType === 'baignoire_douche') score += 20;
        if (formData.projectType === 'douche_pmr') score += 20;
        if (formData.projectType === 'renovation_sdb') score += 15;
        if (formData.beneficiaryAge === 'plus_70') score += 30;
        if (formData.beneficiaryAge === '60_70') score += 15;
        if (formData.ownerStatus === 'proprietaire') score += 25;
        if (formData.ownerStatus === 'locataire') score += 5;
        if (formData.timeline === 'immediat') score += 20;
        if (formData.timeline === 'trimestre') score += 10;
        return score;
    };

    const handleOptionSelect = (field: keyof FormData, value: string) => {
        if (step === 1 && field === 'projectType') {
            if (typeof window !== 'undefined' && window.dataLayer) {
                window.dataLayer.push({
                    event: 'form_start',
                    lead_category: value
                });
            }
        }
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (status === 'error') {
            setStatus('idle');
            setErrorMessage("");
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const canProceed = (): boolean => {
        switch (step) {
            case 1: return formData.projectType !== null;
            case 2: return formData.beneficiaryAge !== null;
            case 3: return formData.ownerStatus !== null;
            case 4: return formData.timeline !== null;
            case 5:
                return (
                    formData.name.trim() !== "" &&
                    formData.email.includes("@") &&
                    ZIP_CODE_REGEX.test(formData.zipCode.trim()) &&
                    formData.phone.trim() !== "" &&
                    FRENCH_PHONE_REGEX.test(formData.phone.replace(/\s/g, '') && formData.phoneConsent === true)
                );
            default: return false;
        }
    };

    const nextStep = () => {
        if (canProceed() && step < totalSteps) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step > 1) {
            if (step === 2 && initialProjectType) return;
            setStep(step - 1);
        }
    };

    const handleSubmit = async () => {
        if (!canProceed()) {
            setStatus('error');
            const errors = [];
            if (formData.name.trim() === "") errors.push("votre Nom");
            if (!ZIP_CODE_REGEX.test(formData.zipCode.trim())) errors.push("un Code Postal valide");
            if (!formData.email.includes("@")) errors.push("un Email valide");
            if (formData.phone.trim() === "" || !FRENCH_PHONE_REGEX.test(formData.phone.replace(/\s/g, '') && formData.phoneConsent === true)) errors.push("un Numéro de téléphone valide");
            
            setErrorMessage(`Veuillez renseigner : ${errors.join(', ')}.`);
            return;
        }

        setStatus('loading');

        try {
            let attribution = {};
            if (typeof window !== 'undefined') {
                const stored = sessionStorage.getItem('lead_attribution');
                if (stored) {
                    try { attribution = JSON.parse(stored); } catch (e) {}
                }
            }

            const payload = {
                ...formData,
                city,
                postalCode: formData.zipCode,
                domain,
                leadScore: getLeadScore(),
                niche: 'pmr',
                timestamp: new Date().toISOString(),
                phoneConsent: formData.phoneConsent,
                consentText: "J'accepte d'être contacté(e) par téléphone par ViteUnDevis.com et ses partenaires certifiés pour la qualification de ma demande de devis et la réalisation d'une étude technique.",
                consentDate: new Date().toISOString(),
                consentUrl: typeof window !== 'undefined' ? window.location.href : `https://${domain}`,
                attribution
            };

            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Erreur lors de l\'envoi');
            }

            const data = await res.json();

            if (typeof window !== 'undefined' && window.dataLayer) {
                window.dataLayer.push({
                    event: 'generate_lead',
                    lead_category: formData.projectType,
                    lead_city: city,
                    value: 60.00,
                    currency: 'EUR',
                    traffic_source: (attribution as any).source || 'direct',
                    landing_page: window.location.pathname
                });
            }

            if (data?.vud && data.vud.devis_id) {
                router.push(`/${domain}/success?devis_id=${data.vud.devis_id}&devis_hash=${data.vud.devis_hash || ''}`);
                return;
            }

            setStatus('success');
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message || 'Une erreur est survenue');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-3xl p-8 text-center">
                <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
                    <CheckCircle className="text-teal-600" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-teal-800 mb-3">
                    Demande d&apos;éligibilité envoyée !
                </h3>
                <p className="text-neutral-700 mb-6">
                    Un conseiller spécialisé **Handibat** vous contactera sous 24h pour valider votre éligibilité à **MaPrimeAdapt&apos;** et préparer vos devis pour votre projet à <strong>{city}</strong>.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-teal-700 font-medium">
                    <Shield size={16} />
                    <span>Réseau agréé Silver Économie & Handibat</span>
                </div>
            </div>
        );
    }

    const OptionButton = ({
        selected,
        onClick,
        icon: Icon,
        label,
        sublabel,
        highlight = false
    }: {
        selected: boolean;
        onClick: () => void;
        icon: React.ElementType;
        label: string;
        sublabel?: string;
        highlight?: boolean;
    }) => (
        <button
            onClick={onClick}
            className={`
                relative w-full p-5 rounded-2xl border-2 transition-all duration-200
                flex items-center gap-4 text-left
                ${selected
                    ? 'border-teal-500 bg-teal-50 shadow-lg'
                    : 'border-neutral-200 bg-white hover:bg-neutral-50'
                }
                ${highlight && !selected ? 'ring-2 ring-emerald-400 ring-offset-2' : ''}
            `}
        >
            <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                ${selected ? 'bg-white text-teal-600 shadow' : 'bg-neutral-100 text-neutral-600'}
            `}>
                <Icon size={24} />
            </div>
            <div>
                <div className={`font-bold ${selected ? 'text-neutral-900' : 'text-neutral-800'}`}>
                    {label}
                </div>
                {sublabel && (
                    <div className="text-sm text-neutral-500 mt-0.5">{sublabel}</div>
                )}
            </div>
            {selected && (
                <div className="absolute top-3 right-3">
                    <CheckCircle className="text-teal-600" size={20} />
                </div>
            )}
        </button>
    );

    return (
        <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden font-sans">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Activity size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Éligibilité MaPrimeAdapt&apos;</h3>
                        <p className="text-white/80 text-sm">Test gratuit & Devis Installateurs Agréés</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                    <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-500 ease-out rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-white/80">
                        <span>Étape {step}/{totalSteps}</span>
                        <span>{Math.round(progress)}% complété</span>
                    </div>
                </div>
            </div>

            {/* Form Body */}
            <div className="p-6">
                {/* Step 1: Project Type */}
                {step === 1 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-6">
                            Quel est votre projet d&apos;aménagement ?
                        </h4>
                        <div className="space-y-3">
                            <OptionButton
                                selected={formData.projectType === 'baignoire_douche'}
                                onClick={() => handleOptionSelect('projectType', 'baignoire_douche')}
                                icon={Heart}
                                label="Remplacer baignoire par douche sécurisée"
                                sublabel="Le plus demandé - Installation en 48h"
                                highlight={true}
                            />
                            <OptionButton
                                selected={formData.projectType === 'douche_pmr'}
                                onClick={() => handleOptionSelect('projectType', 'douche_pmr')}
                                icon={Shield}
                                label="Douche de plain-pied PMR"
                                sublabel="Accès fauteuil roulant, zéro marche"
                            />
                            <OptionButton
                                selected={formData.projectType === 'renovation_sdb'}
                                onClick={() => handleOptionSelect('projectType', 'renovation_sdb')}
                                icon={Home}
                                label="Rénovation complète salle de bain senior"
                                sublabel="Douche sécurisée + WC suspendu + lavabo"
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: Beneficiary Age */}
                {step === 2 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-6">
                            Âge du bénéficiaire des travaux ?
                        </h4>
                        <div className="space-y-3">
                            <OptionButton
                                selected={formData.beneficiaryAge === 'plus_70'}
                                onClick={() => handleOptionSelect('beneficiaryAge', 'plus_70')}
                                icon={UserCheck}
                                label="70 ans ou plus"
                                sublabel="Éligibilité prioritaire aux aides MaPrimeAdapt'"
                            />
                            <OptionButton
                                selected={formData.beneficiaryAge === '60_70'}
                                onClick={() => handleOptionSelect('beneficiaryAge', '60_70')}
                                icon={User}
                                label="Entre 60 et 69 ans"
                                sublabel="Aides soumises à conditions de perte d'autonomie"
                            />
                            <OptionButton
                                selected={formData.beneficiaryAge === 'moins_60'}
                                onClick={() => handleOptionSelect('beneficiaryAge', 'moins_60')}
                                icon={User}
                                label="Moins de 60 ans"
                                sublabel="Aides applicables en situation de handicap (PMR)"
                            />
                        </div>
                    </div>
                )}

                {/* Step 3: Owner Status */}
                {step === 3 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-6">
                            Statut d&apos;occupation du logement ?
                        </h4>
                        <div className="space-y-3">
                            <OptionButton
                                selected={formData.ownerStatus === 'proprietaire'}
                                onClick={() => handleOptionSelect('ownerStatus', 'proprietaire')}
                                icon={Home}
                                label="Propriétaire occupant"
                                sublabel="Éligible aux aides directes de l'ANAH"
                            />
                            <OptionButton
                                selected={formData.ownerStatus === 'locataire'}
                                onClick={() => handleOptionSelect('ownerStatus', 'locataire')}
                                icon={User}
                                label="Locataire"
                                sublabel="Nécessite l'accord du propriétaire"
                            />
                            <OptionButton
                                selected={formData.ownerStatus === 'autre'}
                                onClick={() => handleOptionSelect('ownerStatus', 'autre')}
                                icon={User}
                                label="Bailleur / Autre"
                                sublabel="Propriétaire non occupant, etc."
                            />
                        </div>
                    </div>
                )}

                {/* Step 4: Timeline */}
                {step === 4 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-6">
                            Quand souhaitez-vous réaliser les travaux ?
                        </h4>
                        <div className="space-y-3">
                            <OptionButton
                                selected={formData.timeline === 'immediat'}
                                onClick={() => handleOptionSelect('timeline', 'immediat')}
                                icon={Clock}
                                label="Urgent (Sortie d'hôpital / Perte d'autonomie)"
                                sublabel="Traitement prioritaire en 24h"
                            />
                            <OptionButton
                                selected={formData.timeline === 'trimestre'}
                                onClick={() => handleOptionSelect('timeline', 'trimestre')}
                                icon={Calendar}
                                label="Dans les 3 mois"
                                sublabel="Projet planifié"
                            />
                            <OptionButton
                                selected={formData.timeline === 'reflexion'}
                                onClick={() => handleOptionSelect('timeline', 'reflexion')}
                                icon={Clock}
                                label="Simple estimation / Renseignements"
                                sublabel="Étude de faisabilité et budget"
                            />
                        </div>
                    </div>
                )}

                {/* Step 5: Contact Info */}
                {step === 5 && (
                    <div className="space-y-5">
                        <h4 className="text-xl font-bold text-neutral-900 mb-6">
                            Où devons-nous envoyer vos résultats d&apos;éligibilité ?
                        </h4>

                        <div className="space-y-4">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                                    <User2 size={16} />
                                    Nom complet du bénéficiaire ou du contact
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="M. ou Mme Jean Dupont"
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                                        Code Postal des travaux
                                    </label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        placeholder="75000"
                                        maxLength={5}
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                                        <Mail size={16} />
                                        Adresse email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="jean.dupont@email.com"
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                                    <Phone size={16} />
                                    Numéro de téléphone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="06 12 34 56 78"
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition outline-none"
                                />
                                {formData.phone && !FRENCH_PHONE_REGEX.test(formData.phone.replace(/\s/g, '') && formData.phoneConsent === true) && (
                                    <p className="text-xs text-red-500 mt-1">
                                        Format invalide. Ex: 06 12 34 56 78
                                    </p>
                                )}
                            </div>

                            <div className="pt-2">
                                <label className="flex items-center gap-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-2xl p-4 cursor-pointer transition-all duration-200">
                                    <input
                                        type="checkbox"
                                        name="stairliftInterest"
                                        checked={formData.stairliftInterest || false}
                                        onChange={handleCheckboxChange}
                                        className="h-5 w-5 rounded border-neutral-300 text-teal-600 focus:ring-teal-500/20"
                                    />
                                    <div>
                                        <div className="text-sm font-bold text-neutral-800">
                                            Ma maison comporte des étages
                                        </div>
                                        <div className="text-xs text-neutral-500">
                                            Intéressé(e) par une étude Monte-Escalier subventionnée
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {status === 'error' && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                {errorMessage}
                            </div>
                        )}
                    </div>
                )}

                {/* Navigation */}
                <div className="flex gap-3 mt-8 items-start">
                    {step > 1 && !(step === 2 && initialProjectType) && (
                        <button
                            onClick={prevStep}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-50 transition"
                        >
                            <ArrowLeft size={18} />
                            Retour
                        </button>
                    )}

                    {step < totalSteps ? (
                        <button
                            onClick={nextStep}
                            disabled={!canProceed()}
                            className={`
                                    flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-lg transition
                                    ${canProceed()
                                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-500/20 hover:from-teal-700 hover:to-emerald-700'
                                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                                }
                                `}
                        >
                            Continuer
                            <ArrowRight size={20} />
                        </button>
                    ) : (
                        <div className="w-full">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={status === 'loading'}
                                className={`
                                        w-full py-4 px-6 rounded-xl text-lg font-bold text-white shadow-xl transition-all
                                        ${status === 'loading'
                                        ? 'bg-slate-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transform hover:-translate-y-1 shadow-teal-500/20'
                                    }
                                    `}
                            >
                                {status === 'loading' ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Calcul en cours...
                                    </span>
                                ) : (
                                    "Simuler mes aides et tarifs"
                                )}
                            </button>

                            <p className="text-xs text-slate-400 text-center mt-4 px-4 leading-relaxed">
                                En cliquant sur ce bouton, vous acceptez nos <Link href="/cgv" className="underline hover:text-teal-600">CGV</Link> et acceptez d&apos;être rappelé par un conseiller agréé Handibat pour votre projet. Vos données sont protégées.
                            </p>
                        </div>
                    )}
                </div>

                {/* Trust footer */}
                <div className="flex flex-wrap justify-center sm:justify-between gap-3 mt-6 pt-6 border-t border-neutral-100 text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wide">
                    <span className="flex items-center gap-1.5"><Shield size={12} className="text-green-500" /> Sécurisé RGPD</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div> Sans engagement</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1.5"><Zap size={12} className="text-amber-500" fill="currentColor" /> Handibat & Silverbat</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Étude 24h</span>
                </div>
            </div>
        </div>
    );
}
