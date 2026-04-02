import Link from "next/link";
import { Heart, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-orange rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <span className="text-white font-bold text-xl font-[var(--font-heading)]">
                  Statloba
                </span>
                <span className="text-orange font-bold text-xl font-[var(--font-heading)]">
                  {" "}For Good
                </span>
              </div>
            </div>
            <p className="text-white/70 max-w-md leading-relaxed mb-6">
              Sport + Data = Good. Empowering communities through sport, public
              health, and digital literacy. We believe everyone deserves access
              to opportunity.
            </p>
            <div className="flex flex-col gap-2 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Portland, Oregon
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                hello@statlobaforgood.com
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-orange">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: "/projects", label: "Our Projects" },
                { href: "/about", label: "About Us" },
                { href: "/dashboard", label: "Donor Dashboard" },
                { href: "/donate", label: "Donate" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Focus Areas */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-orange">
              Focus Areas
            </h4>
            <div className="flex flex-col gap-3 text-white/70 text-sm">
              <span>Sports for Good</span>
              <span>Health & Wellness</span>
              <span>Digital Literacy</span>
              <span>Education & Technology</span>
              <span>Community Events</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Statloba For Good. All rights reserved.
          </p>
          <p className="text-white/50 text-sm flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-orange" /> in Portland, OR
          </p>
        </div>
      </div>
    </footer>
  );
}
