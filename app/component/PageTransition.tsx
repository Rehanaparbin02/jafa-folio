"use client";

import { useLoader } from "../context/LoaderContext";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const { isLoading } = useLoader();

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{
                opacity: isLoading ? 0 : 1,
                y: isLoading ? -50 : 0
            }}
            transition={{
                duration: isLoading ? 0 : 0.6,
                ease: [0.76, 0, 0.24, 1],
                delay: 0
            }}
        >
            {children}
        </motion.div>
    );
}
