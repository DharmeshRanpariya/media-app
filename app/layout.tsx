import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DisableInspect from "./components/DisableInspect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Media App",
  description: "A responsive video & photo platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <DisableInspect />
        <Header />

        <main className="flex-grow">{children}</main>

        <Footer />

        {/* Ad configuration */}
        <Script id="ad-options" strategy="afterInteractive">
          {`
            var atOptions = {
              key: '64dd8e3b1eb7f1402f3c31705ca08ab9',
              format: 'iframe',
              height: 250,
              width: 300,
              params: {}
            };
          `}
        </Script>

        {/* Ad script */}
        <Script
          src="https://www.highperformanceformat.com/64dd8e3b1eb7f1402f3c31705ca08ab9/invoke.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
