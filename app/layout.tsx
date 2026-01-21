import { Anton_SC } from "next/font/google";
import "./globals.css";

import SmoothScrolling from "./component/SmoothScrolling";
import BottomNav from "./component/BottomNav";
import { LoaderProvider } from "./context/LoaderContext";
import Loader from "./component/Loader";
import PageTransition from "./component/PageTransition";

const antonSC = Anton_SC({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-anton",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={antonSC.variable}>
            <body>
                <LoaderProvider>
                    <Loader />
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
