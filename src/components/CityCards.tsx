"use client";

import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { slugify } from "@/lib/slugify";
import { useEffect, useState } from "react";

interface CityCardProps {
    cities: {
        name: string;
        department: string;
        slug: string;
        domain?: string;
        available: boolean;
    }[];
}

export function CityCards({ cities }: CityCardProps) {
    const [isLocal, setIsLocal] = useState(false);

    useEffect(() => {
        setIsLocal(window.location.hostname.includes("localhost"));
    }, []);

    return (
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {cities.map((city, i) => {
                // Determine target link: Local Demo or Production Domain
                const targetLink = city.available
                    ? (city.domain
                        ? (isLocal ? `/demo/${city.domain}` : `https://${city.domain}/`)
                        : `/ville/${slugify(city.name)}`)
                    : "#";

                return (
                    <Link
                        key={i}
                        href={targetLink}
                        target={city.domain ? "_blank" : undefined}
                        rel={city.domain ? "noopener noreferrer" : undefined}
                        className={`
                            block relative bg-white rounded-2xl p-6 border-2 transition-all
                            ${city.available
                                ? 'border-slate-200 hover:border-teal-500 hover:shadow-xl cursor-pointer'
                                : 'border-slate-200 opacity-60 cursor-not-allowed'
                            }
                        `}
                        onClick={(e) => {
                            if (!city.available) {
                                e.preventDefault();
                                alert("Bientôt disponible dans cette ville !");
                            }
                        }}
                    >
                        {!city.available && (
                            <div className="absolute top-3 right-3 bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">
                                Bientôt
                            </div>
                        )}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                                <MapPin className="text-teal-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{city.name}</h3>
                                <p className="text-sm text-slate-500">Département {city.department}</p>
                            </div>
                        </div>
                        {city.available && (
                            <div className="mt-4 flex items-center text-teal-600 font-medium text-sm">
                                Voir les offres <ArrowRight size={16} className="ml-1" />
                            </div>
                        )}
                    </Link>
                );
            })}
        </div>
    );
}
