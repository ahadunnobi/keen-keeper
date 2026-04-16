import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FriendsProvider } from "@/context/friends-context";
import AppToaster from "@/components/app-toaster";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KeenKeeper",
  description: "KeenKeeper productivity application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <FriendsProvider>
          <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
            <Navbar />
            <main className="flex-1 rounded-2xl border border-neutral-200/80 bg-white/90 p-4 shadow-sm backdrop-blur supports-backdrop-filter:bg-white/70 dark:border-neutral-800 dark:bg-neutral-900/85 sm:p-6">
              {children}
            </main>
            <Footer />
          </div>
          <AppToaster />
        </FriendsProvider>
      </body>
    </html>
  );
}
