"use client";

import { motion } from "framer-motion";
import localFont from 'next/font/local'

const gondens = localFont({ src: '../fonts/Gondens-DEMO.otf' })
import { useLoader } from "../context/LoaderContext";

const InfiniteText = () => {
    const text = "JAFAR'S DOMAIN";
    const { isLoading } = useLoader();

    if (isLoading) return null;

    return (
        <div className="absolute top-1/2 left-0 -translate-y-1/2 flex w-full overflow-hidden bg-transparent z-10 select-none pointer-events-none py-24">
            {/* The motion.div contains two sets of the same text. 
        As the first set moves out of view, the second follows, 
        creating the infinite loop illusion.
      */}
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    ease: "linear",
                    duration: 55, // Adjust speed here (higher = slower)
                    repeat: Infinity,
                }}
            >
                {/* Repeat the text multiple times to fill the screen */}
                {[...Array(6)].map((_, i) => (
                    <span
                        key={i}
                        className={`${gondens.className} text-8xl md:text-[12rem] px-12 tracking-wide uppercase leading-none`}
                        style={{
                            WebkitTextStroke: '8px #041a04b3',
                            color: 'transparent',
                        }}
                    >
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default InfiniteText;