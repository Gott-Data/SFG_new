"use client";

import { useState } from "react";
import { Heart, Loader2 } from "lucide-react";

const presetAmounts = [25, 50, 100, 250, 500, 1000];

interface DonationFormProps {
  projectId: string;
  projectTitle: string;
}

export default function DonationForm({ projectId, projectTitle }: DonationFormProps) {
  const [amount, setAmount] = useState<number | "">("");
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedAmount = typeof amount === "number" ? amount : Number(customAmount) || 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedAmount < 1) {
      setError("Please enter a donation amount of at least $1.");
      return;
    }
    if (!name.trim() || !email.trim()) {
      setError("Please provide your name and email.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedAmount,
          projectId,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          anonymous,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-3">
          Select Amount
        </label>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {presetAmounts.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                setAmount(preset);
                setCustomAmount("");
              }}
              className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                amount === preset
                  ? "bg-forest text-white shadow-md"
                  : "bg-cream text-charcoal hover:bg-cream-dark"
              }`}
            >
              ${preset}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray font-semibold">
            $
          </span>
          <input
            type="number"
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setAmount("");
            }}
            min="1"
            className="w-full pl-8 pr-4 py-3 rounded-xl border border-cream-dark focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all bg-white text-charcoal"
          />
        </div>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-cream-dark focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all bg-white"
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-cream-dark focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all bg-white"
        />
        <textarea
          placeholder="Leave a message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-cream-dark focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all bg-white resize-none"
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          className="w-4 h-4 rounded border-cream-dark text-forest focus:ring-forest"
        />
        <span className="text-sm text-warm-gray">Make my donation anonymous</span>
      </label>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || selectedAmount < 1}
        className="w-full flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark disabled:bg-warm-gray text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] disabled:hover:scale-100"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Heart className="w-5 h-5" />
            Donate {selectedAmount > 0 ? `$${selectedAmount}` : ""} to {projectTitle}
          </>
        )}
      </button>

      <p className="text-xs text-warm-gray text-center">
        Secure payment powered by Stripe. You&apos;ll receive a receipt via email.
      </p>
    </form>
  );
}
