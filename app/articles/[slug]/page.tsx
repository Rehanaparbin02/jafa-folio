"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import localFont from 'next/font/local';
import { useLoader } from "../../context/LoaderContext";
import { getArticleBySlug, ARTICLES } from "../articles-data";

const gondens = localFont({ src: '../../fonts/Gondens-DEMO.otf' });

export default function ArticlePage() {
    const params = useParams();
    const router = useRouter();
    const { showLoader, isLoading } = useLoader();

    // Updated to use 'slug' as per the folder name
    const slug = params.slug as string;
    const article = getArticleBySlug(slug);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Get next article for footer
    const currentIndex = ARTICLES.findIndex(a => a.slug === slug);
    const nextArticle = ARTICLES[(currentIndex + 1) % ARTICLES.length];

    const handleNavigate = (href: string, text: string) => {
        showLoader(text);
        setTimeout(() => {
            router.push(href);
        }, 500);
    };

    if (!article) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
                    <p className="text-zinc-500 mb-8">Slug: {slug}</p>
                    <Link href="/articles" className="text-emerald-500 hover:underline">Back to Articles</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-[110]"
                style={{ scaleX }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-8 flex justify-between items-center pointer-events-none">
                <button
                    onClick={() => {
                        showLoader("RETURNING");
                        setTimeout(() => router.push("/articles"), 500);
                    }}
                    className="pointer-events-auto h-12 px-6 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back</span>
                </button>

                <div className="flex gap-3 pointer-events-auto">
                    <button className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                        <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={!isLoading ? { scale: 1, opacity: 0.6 } : { scale: 1.1, opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end max-w-5xl mx-auto px-6 leading-tight">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/20 mb-8 inline-block">
                            {article.category}
                        </span>
                        <h1 className={`${gondens.className} text-5xl md:text-8xl font-medium mb-8 leading-[1.3] md:leading-[2.2] uppercase tracking-[2px]`}>
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 text-zinc-400">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-emerald-500/60" />
                                <span className="text-sm uppercase tracking-wider font-medium">{article.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-emerald-500/60" />
                                <span className="text-sm uppercase tracking-wider font-medium">{article.readTime}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" />
                                <span className="text-sm uppercase tracking-wider font-medium">Jafar Sarif</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <main className="max-w-3xl mx-auto px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="prose prose-invert prose-emerald max-w-none"
                >
                    <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed mb-16 italic border-l-2 border-emerald-500/30 pl-8">
                        {article.description}
                    </p>

                    {article.content.map((block, idx) => {
                        if (block.type === "h2") {
                            return (
                                <h2 key={idx} className="text-3xl md:text-4xl font-semibold mt-20 mb-8 text-white">
                                    {block.text}
                                </h2>
                            );
                        }
                        if (block.type === "p") {
                            return (
                                <p key={idx} className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-8">
                                    {block.text}
                                </p>
                            );
                        }
                        if (block.type === "quote") {
                            return (
                                <blockquote key={idx} className="my-16 py-8 border-y border-white/10 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-12 h-1 bg-emerald-500/40" />
                                    <p className="text-3xl md:text-4xl font-medium text-emerald-50 leading-tight">
                                        "{block.text}"
                                    </p>
                                </blockquote>
                            );
                        }
                        if (block.type === "image") {
                            return (
                                <figure key={idx} className="my-16">
                                    <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10">
                                        <Image src={block.src!} alt={block.caption!} fill className="object-cover" />
                                    </div>
                                    <figcaption className="text-center text-sm text-zinc-500 mt-4 uppercase tracking-widest">{block.caption}</figcaption>
                                </figure>
                            );
                        }
                        return null;
                    })}
                </motion.div>

                {/* Footer / CTA */}
                <footer className="mt-32 pt-16 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                            <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">Next Article</h4>
                            <button
                                onClick={() => handleNavigate(`/articles/${nextArticle.slug}`, nextArticle.category.toUpperCase())}
                                className="text-2xl font-semibold hover:text-emerald-400 transition-colors"
                            >
                                {nextArticle.title}
                            </button>
                        </div>
                        <button className="px-8 py-4 rounded-full bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all transform hover:scale-105">
                            Subscribe to Newsletter
                        </button>
                    </div>
                </footer>
            </main>
        </div>
    );
}