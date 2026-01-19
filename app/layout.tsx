// app/layout.tsx
import { Anton_SC } from "next/font/google";
import "./globals.css";

const antonSC = Anton_SC({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={antonSC.variable}>
      <body>{children}</body>
    </html>
  );
}