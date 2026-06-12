import Image from "next/image";

const projects = [
    { city: "Paris 16", desc: "Remplacement Baignoire", type: "Douche Kinedo", img: "/images/generated/senior-shower-realization-1.webp" },
    { city: "Neuilly-sur-Seine", desc: "Douche Italienne PMR", type: "Accès Plain-Pied", img: "/images/generated/senior-shower-realization-2.webp" },
    { city: "Boulogne-Billancourt", desc: "Remplacement Baignoire", type: "Douche Senior Securisée", img: "/images/generated/senior-shower-realization-3.webp" },
    { city: "Levallois-Perret", desc: "Rénovation PMR", type: "Douche Ergonomique Lapeyre", img: "/images/generated/senior-shower-realization-4.webp" },
];

export default function RealizationsGrid() {
    return (
        <section className="py-20 bg-neutral-900 text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                        Dernières installations en <span className="text-teal-400">Île-de-France</span>
                    </h2>
                    <p className="text-neutral-400">
                        Qualité artisanale, finitions soignées. Nos chantiers parlent pour nous.
                    </p>
                </div>

                {/* BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[600px]">
                    {projects.map((proj, i) => (
                        <div
                            key={i}
                            className={`relative group rounded-3xl overflow-hidden border border-white/10 ${i === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1"
                                }`}
                        >
                            <Image
                                src={proj.img}
                                alt={`${proj.desc} à ${proj.city}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="text-teal-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                                    {proj.city}
                                </div>
                                <div className="text-2xl font-bold mb-1">{proj.desc}</div>
                                <div className="text-sm text-neutral-300 font-medium">{proj.type}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
