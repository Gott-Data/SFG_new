"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Heart, ArrowRight } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (sessionId) {
      setVerified(true);
    }
  }, [sessionId]);

  return (
    <div className="bg-cream min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="bg-white rounded-2xl p-10 shadow-sm">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-forest/10 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-forest" />
          </div>
          <h1 className="text-3xl font-bold text-charcoal font-[var(--font-heading)] mb-3">
            Thank You!
          </h1>
          <p className="text-warm-gray leading-relaxed mb-8">
            {verified
              ? "Your donation has been received. You'll receive a confirmation email shortly. Your generosity makes a real difference."
              : "Your donation is being processed. Thank you for your generosity!"}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-dark text-white px-6 py-3 rounded-full font-semibold transition-all"
            >
              Track Your Donation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 bg-cream hover:bg-cream-dark text-charcoal px-6 py-3 rounded-full font-semibold transition-all"
            >
              <Heart className="w-4 h-4" />
              Support More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DonationSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-cream min-h-screen flex items-center justify-center">
          <p className="text-warm-gray">Loading...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
