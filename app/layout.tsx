import { Anton_SC, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import SmoothScrolling from "./component/SmoothScrolling";
import BottomNav from "./component/BottomNav";
import { LoaderProvider } from "./context/LoaderContext";
import Loader from "./component/Loader";
import CustomCursor from "./component/CustomCursor";
import PageTransition from "./component/PageTransition";

const antonSC = Anton_SC({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-anton",
});

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-jakarta",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${antonSC.variable} ${plusJakarta.variable}`}>
            <body>
                <LoaderProvider>
                    <Loader />
                    <CustomCursor />
                    <SmoothScrolling>
                        <PageTransition>
                            {children}
                        </PageTransition>
                        <BottomNav />
                    </SmoothScrolling>
                </LoaderProvider>
            </body>
        </html>
    );
}
