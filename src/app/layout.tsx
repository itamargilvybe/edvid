// layout.tsx: Root layout for the app. Sets up global fonts and wraps children with client providers.
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientRootProvider from "@/providers/ClientRootProvider";
import LayoutWithHeaderFooter from "@/components/ui/LayoutWithHeaderFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EdVid",
  description:
    "A collaborative platform for sharing, discovering, and discussing educational videos. Upload your own, comment, and learn together!",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientRootProvider>
          <LayoutWithHeaderFooter>{children}</LayoutWithHeaderFooter>
        </ClientRootProvider>
      </body>
    </html>
  );
}
