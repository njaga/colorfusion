import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "ColorFusion - Design with Ease, Create with Precision",
  description: "Unleash your creativity with ColorFusion: vibrant palettes, unique patterns, and gradients. Join thousands of designers who draw daily inspiration from it.",
  openGraph: {
    title: "ColorFusion - Design with Ease, Create with Precision",
    description: "Unleash your creativity with ColorFusion: vibrant palettes, unique patterns, and gradients. Join thousands of designers who draw daily inspiration from it.",
    url: 'https://colorfusion.vercel.app',
    siteName: 'ColorFusion',
    images: [
      {
        url: 'https://colorfusion.vercel.app/opengraph-image',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ColorFusion - Design with Ease, Create with Precision",
    description: "Unleash your creativity with ColorFusion: vibrant palettes, unique patterns, and gradients. Join thousands of designers who draw daily inspiration from it.",
    images: ['https://colorfusion.vercel.app/opengraph-image'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen font-sans">
        <Navigation />
        <div className="flex flex-grow pt-16 w-full">
          <Sidebar showSidebar={!children.props.error} />
          <main className="flex-grow w-full overflow-x-hidden">
            {children}
          </main>
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
