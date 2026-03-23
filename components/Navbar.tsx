"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#despre", label: "Despre noi" },
  { href: "#servicii", label: "Servicii" },
  { href: "#proiecte", label: "Proiecte" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5">
            <Image
              src="/Logo_energreen.png"
              alt="EnerGreenBatery"
              width={160}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <span
              className={`text-lg font-bold tracking-tight transition-colors duration-200 ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              EnerGreenBatery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  scrolled
                    ? "text-gray-600 hover:text-primary"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <a
              href="#servicii"
              className="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors duration-200"
            >
              Vezi serviciile
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 relative z-50"
            aria-label="Meniu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-full transition-all duration-300 origin-center ${
                  mobileOpen
                    ? "bg-gray-800 rotate-45 translate-y-2"
                    : scrolled
                      ? "bg-gray-800"
                      : "bg-white"
                }`}
              />
              <span
                className={`block h-0.5 w-full transition-all duration-300 ${
                  mobileOpen
                    ? "opacity-0"
                    : scrolled
                      ? "bg-gray-800"
                      : "bg-white"
                }`}
              />
              <span
                className={`block h-0.5 w-full transition-all duration-300 origin-center ${
                  mobileOpen
                    ? "bg-gray-800 -rotate-45 -translate-y-2"
                    : scrolled
                      ? "bg-gray-800"
                      : "bg-white"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white rounded-2xl shadow-xl mt-2 p-6 absolute left-4 right-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-700 hover:text-primary font-medium transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#servicii"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors mt-2"
              >
                Vezi serviciile
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
