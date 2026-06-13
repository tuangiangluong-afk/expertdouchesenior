import { getGuideBySlug, getAllGuides } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { ArrowLeft, Clock, Calendar, Zap, ArrowRight } from 'lucide-react';
import SimulatorWidget from '@/components/blog/SimulatorWidget';
import LocalLinkerComponent from '@/components/blog/LocalLinker';
import { createClient } from "@supabase/supabase-js";
import { marked } from 'marked';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export const revalidate = 60;

// ==========================================
// COMPOSANTS MDX CUSTOM (Pour vendre dans le texte)
// ==========================================
const components = {
    // Un encart bleu pour les conseils pro
    Callout: ({ children, title }: { children: React.ReactNode, title?: string }) => (
        <div className="my-6 p-5 rounded-2xl bg-blue-50 border-l-4 border-blue-600 text-blue-900 shadow-sm">
            {title && <h4 className="font-bold text-blue-950 mb-1 flex items-center gap-2">💡 {title}</h4>}
            <div className="text-sm leading-relaxed">{children}</div>
        </div>
    ),
    // Un bouton d'appel à l'action marquant
    CTAButton: ({ href, url, text }: { href?: string, url?: string, text: string }) => (
        <div className="my-8 text-center">
            <Link 
                href={href || url || '#'} 
                className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition"
            >
                {text}
                <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
    ),
    CtaButton: ({ href, url, text }: { href?: string, url?: string, text: string }) => (
        <div className="my-8 text-center">
            <Link 
                href={href || url || '#'} 
                className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition"
            >
                {text}
                <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
    ),
    // Widget de maillage local (pour le mettre au milieu du texte)
    LocalLinker: () => (
        <div className="my-8 not-prose">
            <LocalLinkerComponent />
        </div>
    )
};

export async function generateStaticParams() {
    const guides = getAllGuides();
    // We only statically generate filesystem guides. DB posts are ISR.
    return guides.map((guide: any) => ({
        slug: guide.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    
    // Try static
    const guide = await getGuideBySlug(resolvedParams.slug);
    if (guide) {
        return {
            title: guide.meta.title,
            description: guide.meta.description,
        };
    }

    // Try DB
    if (!supabase) {
        return {};
    }
    const { data: post } = await supabase
        .from('blog_posts')
        .select('seo_title, title, seo_description, excerpt')
        .eq('slug', resolvedParams.slug)
        .eq('status', 'published')
        .contains('tags', ['pmr'])
        .single();
    
    if (post) {
         return {
            title: post.seo_title || post.title,
            description: post.seo_description || post.excerpt,
        };
    }

    return {};
}

import rehypeSlug from 'rehype-slug';

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    
    // 1. Try Static Guide
    let guide = await getGuideBySlug(resolvedParams.slug);
    let dbPost = null;

    // 2. Try Dynamic DB Post
    if (!guide && supabase) {
        const { data, error } = await supabase
            .from('blog_posts')
            .select(`
                *,
                category:blog_categories(name, slug),
                author:blog_authors(name, slug, image_url, role)
            `)
            .eq('slug', resolvedParams.slug)
            .eq('status', 'published')
            .contains('tags', ['pmr'])
            .single();
        
        if (data && !error) {
            dbPost = data;
            // Map DB post to Guide structure for the UI
            guide = {
                slug: data.slug,
                meta: {
                    title: data.title,
                    description: data.excerpt,
                    date: data.published_at,
                    readTime: data.read_time_minutes ? `${data.read_time_minutes} min` : '5 min',
                    image: data.featured_image_url,
                    category: data.category?.name
                },
                content: data.content // HTML content
            };
        }
    }

    if (!guide) return notFound();

    // Parse Headers for TOC
    let headings: string[] = [];
    let toc: any[] = [];

    if (dbPost) {
        // HTML Parsing for TOC
        const matches = guide.content.match(/<h2.*?>(.*?)<\/h2>/g);
        if (matches) {
            toc = matches.map((h: string) => {
                 const text = h.replace(/<[^>]+>/g, '');
                 const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                 return { text, id, level: 2 };
            });
            // Inject IDs into content
            toc.forEach((h: any) => {
                guide.content = guide.content.replace(`<h2>${h.text}</h2>`, `<h2 id="${h.id}">${h.text}</h2>`);
            });
        }
    } else {
        // MDX Parsing for TOC (Existing logic)
        headings = guide.content.match(/^#{1,3} .+/gm) || [];
        toc = headings.map((heading: string) => {
            const level = heading.match(/^#+/)?.[0].length || 1;
            const text = heading.replace(/^#+ /, '');
            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            return { text, id, level };
        });
    }

    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": guide.title,
        "description": guide.description,
        "image": guide.image ? [`https://expertdouchesenior.com${guide.image}`] : [`https://expertdouchesenior.com/images/og-image.png`],
        "datePublished": guide.date,
        "author": [{
            "@type": "Organization",
            "name": "Expert Douche Senior",
            "url": "https://expertdouchesenior.com"
        }],
        "publisher": {
            "@type": "Organization",
            "name": "Expert Douche Senior",
            "logo": {
                "@type": "ImageObject",
                "url": "https://expertdouchesenior.com/logo.png"
            }
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            {/* Nav */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <Header isHub={true} variant="default" themeColor="teal" />

            <main className="container mx-auto px-4 py-12 pt-40">
                {/* GRID LAYOUT : Contenu à gauche, Pub à droite */}
                <div className="grid lg:grid-cols-[1fr_350px] gap-12 max-w-7xl mx-auto">

                    {/* COLONNE GAUCHE : ARTICLE */}
                    <div>
                        {/* Header Article */}
                        <div className="mb-10">
                            <Link href="/guides" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-6 group">
                                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                                Retour aux guides
                            </Link>

                            {/* Meta Data */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                                <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                                    <Clock size={14} />
                                    {guide.meta.readTime || '5 min'}
                                </span>
                                <span className="text-slate-300">|</span>
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {new Date(guide.meta.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
                                {guide.meta.title}
                            </h1>

                            {/* Hero Image */}
                            {guide.meta.image && (
                                <div className="relative w-full h-64 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-lg">
                                    <Image
                                        src={guide.meta.image}
                                        alt={guide.meta.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            <p className="text-xl text-slate-600 leading-relaxed font-medium">
                                {guide.meta.description}
                            </p>
                        </div>

                        {/* Content Body */}
                        <article className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-headings:scroll-mt-32 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-2xl max-w-none">
                            {dbPost ? (
                                <div dangerouslySetInnerHTML={{ __html: marked.parse(guide.content) }} />
                            ) : (
                                <MDXRemote
                                    source={guide.content}
                                    components={components}
                                    options={{
                                        mdxOptions: {
                                            rehypePlugins: [rehypeSlug]
                                        }
                                    }}
                                />
                            )}
                        </article>

                        {/* Author Box (Améliorée) */}
                        <div className="mt-16 p-8 bg-slate-50 rounded-2xl border border-slate-200">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md">
                                    ED
                                </div>
                                <div>
                                    <div className="font-bold text-lg text-slate-900">Expert Douche Senior</div>
                                    <div className="text-sm text-slate-500">Pôle Technique & Réglementation</div>
                                </div>
                            </div>
                            <p className="text-slate-600 mb-4">
                                Nos guides sont rédigés par des experts en accessibilité et aménagement PMR pour vous aider à sécuriser votre logement. Les informations sur les aides (MaPrimeAdapt&apos;, Crédit d&apos;Impôt, TVA) sont vérifiées régulièrement auprès des organismes officiels.
                            </p>
                        </div>
                    </div>

                    {/* COLONNE DROITE : STICKY SIDEBAR (Le Cash) */}
                    <aside className="hidden lg:block relative">
                        <div className="sticky top-24 space-y-8">

                            {/* Widget de conversion */}
                            <SimulatorWidget />

                            {/* NOUVEAU : Local Linker (Le Maillage) */}
                            <LocalLinkerComponent />

                            {/* Dynamic Table of Contents */}
                            {toc.length > 0 && (
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                    <h4 className="font-bold text-sm text-slate-400 uppercase tracking-wider mb-4">Dans cet article</h4>
                                    <ul className="space-y-3 text-sm text-slate-600">
                                        {toc.map((item: any, i: number) => (
                                            <li key={i} className={`
                                                hover:text-blue-600 cursor-pointer transition-colors
                                                ${item.level > 2 ? 'pl-4 border-l border-slate-200' : ''}
                                            `}>
                                                <a href={`#${item.id}`} className="block w-full">
                                                    {item.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </main>

            {/* MOBILE STICKY CTA (Bottom Bar) */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur border-t border-slate-200 lg:hidden z-40">
                <a href="/#simulateur" className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg">
                    <Zap size={18} />
                    Comparer les devis gratuits
                </a>
            </div>
        </div>
    );
}
