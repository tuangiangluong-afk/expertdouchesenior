import { CityConfig } from "@/lib/db";

export const NATIONAL_CONFIG: CityConfig = {
    slug: "home",
    domain: "expertdouchesenior.com",
    name: "Expert Douche Senior",
    city: "France",
    phoneNumber: "01 84 80 00 00",
    email: "contact@expertdouchesenior.com",
    heroImage: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2940&auto=format&fit=crop",
    description: "Le réseau n°1 d'installateurs de douches sécurisées et PMR en France. Devis gratuit, installation en 48h, certifié Handibat.",
    meta: {
        title: "Expert Douche Senior | Douche Sécurisée & PMR partout en France",
        description: "Installation de douches sécurisées et italiennes PMR pour seniors. Réseau d'installateurs agréés Handibat. Éligible MaPrimeAdapt' (jusqu'à 70% d'aides)."
    },
    features: [
        "Aides MaPrimeAdapt' déduites",
        "Devis Gratuit 24h",
        "Agréé Handibat & Silverbat",
        "Installation sans gros travaux en 48h"
    ],
    pricing: {
        base: "Sur Devis",
        description: "Testez votre éligibilité aux aides de l'État"
    },
    hospitals: [],
    stations: [],
    neighborhoods: [],
    points_of_interest: {
        hotels: [],
        nightlife: [],
        monuments: [],
        parking_difficulty: "N/A"
    }
};
