export default function LogoCloud() {
    const BRANDS = [
        { name: "Kinedo" },
        { name: "Indépendance Royale" },
        { name: "Idhra" },
        { name: "Lapeyre" },
        { name: "Mobilae" }
    ];

    return (
        <section className="py-10 border-b border-slate-100 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                        Nos artisans installent les marques :
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {BRANDS.map((brand) => (
                            <div key={brand.name} className="group flex items-center gap-2 cursor-default">
                                <span className="font-bold text-xl tracking-tight text-slate-700 group-hover:text-teal-600 transition-colors">
                                    {brand.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
