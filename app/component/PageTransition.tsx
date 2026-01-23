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
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
            {children}
        </motion.div>
    );
}
