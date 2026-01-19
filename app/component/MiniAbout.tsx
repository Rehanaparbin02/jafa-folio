export default function MiniAbout() {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tighter text-black dark:text-white sm:text-6xl">
                About Me
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-xl">
                I'm a passionate developer creating digital experiences that bridge the gap between
                aesthetics and functionality. With a keen eye for detail and a love for smooth animations,
                I build websites that leave a lasting impression.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-8 text-left sm:grid-cols-4">
                <div>
                    <h3 className="font-semibold text-black dark:text-white">Location</h3>
                    <p className="text-zinc-500">San Francisco, CA</p>
                </div>
                <div>
                    <h3 className="font-semibold text-black dark:text-white">Experience</h3>
                    <p className="text-zinc-500">5+ Years</p>
                </div>
                <div>
                    <h3 className="font-semibold text-black dark:text-white">Studio</h3>
                    <p className="text-zinc-500">Independent</p>
                </div>
                <div>
                    <h3 className="font-semibold text-black dark:text-white">Focus</h3>
                    <p className="text-zinc-500">Web & Mobile</p>
                </div>
            </div>
        </div>
    );
}
