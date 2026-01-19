import Image from "next/image";
import InfiniteText from "./component/InfiniteText";
import HorizontalTracker from "./component/HorizontalTracker";
import MiniAbout from "./component/MiniAbout";

export default function Home() {
  return (
    /* We changed 'items-center justify-center' to 'flex-col' to stack the carousel below the main content */
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black bg-noise">
      {/* Header */}
      <header className="flex w-full items-center justify-between px-6 py-8 text-sm sm:px-16">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-black dark:text-white">INDIA Based</span>
          <span className="text-zinc-500 dark:text-zinc-400">Working globally</span>
        </div>

        <div className="hidden flex-col gap-1 sm:flex">
          <span className="font-medium text-black dark:text-white">Working at</span>
          <span className="text-zinc-500 dark:text-zinc-400">CITRIX</span>
        </div>

        <div className="hidden flex-col gap-1 sm:flex">
          <span className="font-medium text-black dark:text-white">Total Experience</span>
          <span className="text-zinc-500 dark:text-zinc-400">5+ Years</span>
        </div>

        <button className="rounded-full bg-black px-6 py-2.5 font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
          Get in touch
        </button>
      </header>
      {/* Horizontal Mouse Trail */}
      <div className="flex flex-1 items-center">
        <HorizontalTracker />
      </div>

      {/* Carousel at the bottom */}
      <footer className="w-full ">
        <InfiniteText />
      </footer>

      {/* <div>
        <MiniAbout />
      </div> */}

    </div>
  );
}