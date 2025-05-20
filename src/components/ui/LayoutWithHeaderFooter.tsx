"use client";
import React from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { useRouter } from "next/navigation";

export default function LayoutWithHeaderFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleNav = (s: string) => {
    if (s === "home") {
      router.push("/");
    } else {
      router.push(`/${s}`);
    }
  };
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="h-[60vh] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 animate-gradient-x"
          style={{ backgroundAttachment: "fixed" }}
        />
        <div
          className="h-[40vh] bg-gradient-to-tr from-pink-50 via-blue-50 to-purple-50 opacity-80"
          style={{ backgroundAttachment: "fixed" }}
        />
      </div>
      <Header onNav={handleNav} />
      <main className="flex-1 w-full">{children}</main>
      <Footer onNav={handleNav} />
    </div>
  );
}
