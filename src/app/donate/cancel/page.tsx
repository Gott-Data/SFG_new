import Link from "next/link";
import { XCircle, ArrowLeft, Heart } from "lucide-react";

export const metadata = {
  title: "Donation Cancelled | Statloba For Good",
};

export default function DonationCancelPage() {
  return (
    <div className="bg-cream min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="bg-white rounded-2xl p-10 shadow-sm">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange/10 rounded-full mb-6">
            <XCircle className="w-10 h-10 text-orange" />
          </div>
          <h1 className="text-3xl font-bold text-charcoal font-[var(--font-heading)] mb-3">
            Donation Cancelled
          </h1>
          <p className="text-warm-gray leading-relaxed mb-8">
            No worries — your payment was not processed. You can try again
            whenever you&apos;re ready, or explore other projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white px-6 py-3 rounded-full font-semibold transition-all"
            >
              <Heart className="w-4 h-4" />
              Try Again
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 bg-cream hover:bg-cream-dark text-charcoal px-6 py-3 rounded-full font-semibold transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
