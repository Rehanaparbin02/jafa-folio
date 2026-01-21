"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface LoaderContextType {
    isLoading: boolean;
    loaderText: string;
    showLoader: (text: string) => void;
    hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true); // Start with loader on initial page load
    const [loaderText, setLoaderText] = useState("CONNECTING...");

    const showLoader = useCallback((text: string) => {
        setLoaderText(text);
        setIsLoading(true);
    }, []);

    const hideLoader = useCallback(() => {
        setIsLoading(false);
    }, []);

    return (
        <LoaderContext.Provider value={{ isLoading, loaderText, showLoader, hideLoader }}>
            {children}
        </LoaderContext.Provider>
    );
}

export function useLoader() {
    const context = useContext(LoaderContext);
    if (context === undefined) {
        throw new Error("useLoader must be used within a LoaderProvider");
    }
    return context;
}
