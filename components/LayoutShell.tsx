"use client";

import { usePathname } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60]">
        <TopBar />
        <Navbar />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
