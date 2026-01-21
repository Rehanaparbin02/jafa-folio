"use client";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
            <div className="max-w-2xl w-full text-center">
                <h1 className="text-7xl font-black uppercase tracking-tighter mb-4">Let's Connect</h1>
                <p className="text-zinc-500 text-lg mb-12">I'm always open to discussing security research, collaborations, or new opportunities.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="mailto:jafar@itsjay.us" className="flex flex-col items-center p-8 rounded-[2rem] bg-zinc-900 border border-white/5 hover:bg-zinc-800 transition-all">
                        <span className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-2">Email</span>
                        <span className="text-xl font-bold">jafar@itsjay.us</span>
                    </a>
                    <div className="flex flex-col items-center p-8 rounded-[2rem] bg-zinc-900 border border-white/5">
                        <span className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-2">Location</span>
                        <span className="text-xl font-bold">Bengaluru, India</span>
                    </div>
                </div>

                <div className="mt-12 flex justify-center gap-6">
                    {["Twitter", "LinkedIn", "GitHub"].map(social => (
                        <span key={social} className="text-zinc-400 hover:text-white transition-colors cursor-pointer font-bold uppercase tracking-widest text-xs">{social}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
