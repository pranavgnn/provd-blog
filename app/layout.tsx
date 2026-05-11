import type { Metadata } from "next";
import { Playfair_Display, Roboto } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PostHogInit } from "@/components/PostHogInit";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.provd.in"),
  title: "Provd Blog",
  description: "Read the latest updates from Provd.",
  icons: {
    apple: "/favicon.ico", // Using favicon as fallback for apple-touch-icon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <PostHogInit />
        <Header />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
