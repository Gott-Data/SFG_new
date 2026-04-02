"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Heart } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Donor Dashboard" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cream-dark">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg font-[var(--font-heading)]">S</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-forest font-bold text-lg font-[var(--font-heading)]">
                Statloba
              </span>
              <span className="text-orange font-bold text-lg font-[var(--font-heading)]">
                {" "}For Good
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-charcoal hover:text-forest transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105"
            >
              <Heart className="w-4 h-4" />
              Donate
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-charcoal"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden pb-6 pt-2 border-t border-cream-dark">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-charcoal hover:text-forest hover:bg-cream px-4 py-3 rounded-lg transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/donate"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white px-6 py-3 rounded-full font-semibold text-sm mt-3 mx-4"
              >
                <Heart className="w-4 h-4" />
                Donate Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
