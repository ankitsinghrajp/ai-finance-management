import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import {  dark } from "@clerk/themes";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aura – Your smart AI finance companion",
  description: "Track spending, grow savings, and make smarter investments — all powered by intelligent insights tailored just for you.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
         appearance={{
        baseTheme: dark,
      }}
    >
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark:bg-black bg-[#edefef] relative`}>
         <ThemeProvider
            defaultTheme="dark"
          >
              {/* <div className="absolute dark:hidden inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div> */}

            {/* header */}
            <Header/>
            <main className="min-h-screen py-24">
            {children}
            </main>
            <Toaster richColors/>
        <footer className="border-t border-dotted border-gray-600  py-8">
              <div className="container mx-auto">
                     <p className="text-center dark:text-gray-500 text-gray-700 text-sm font-semibold">Developer - Ankit Singh Rajput</p>
                     <p className="text-center text-sm dark:text-gray-500 text-gray-700 font-medium">&copy; 2025 Ankit Singh Chouhan. All Rights Reserved.</p>
                     <Link className=" flex justify-center items-center w-full text-sm font-semibold text-blue-500 underline" href={'https://ankits-portfolio-omega.vercel.app'} target="_blank">
                     Developer&apos;s Portfolio</Link>
              </div>
        </footer>

        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
