"use client";

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-8">Articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="p-8 rounded-3xl bg-zinc-900 border border-white/5 hover:border-white/20 transition-all cursor-pointer group">
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2 block">Security Research</span>
                        <h2 className="text-2xl font-bold group-hover:text-emerald-400 transition-colors">Vulnerability Analysis 0x0{i}</h2>
                        <p className="text-zinc-400 mt-4 line-clamp-2">Deep diving into the latest security protocols and identifying potential attack vectors in modern infrastructure.</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
