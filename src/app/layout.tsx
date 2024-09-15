import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProvider } from './context/AppContext';
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blitztypes | Practice your typing here",
  description: "A modern platform to practice your typing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <div className={`${inter.className} flex min-h-screen justify-between flex-col py-12 pt-12  max-w-[1320px] mx-auto px-8`}>
          <AppProvider>
            <Navigation className="pb-12"></Navigation>
            <main className="flex-grow flex flex-col justify-center">
              {children}
            </main>
            <Footer></Footer>
            <Toaster />
            <CookieBanner></CookieBanner>
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
