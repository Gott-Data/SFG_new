"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  DollarSign,
  TrendingUp,
  Calendar,
  ArrowRight,
  Loader2,
  PieChart,
} from "lucide-react";
import { formatCurrency, getProgressPercentage } from "@/lib/utils";

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  country: string;
  category: string;
  goalAmount: number;
  raisedAmount: number;
  expenses: Expense[];
}

interface Donation {
  id: string;
  amount: number;
  createdAt: string;
  message: string | null;
  project: Project;
}

interface DonorInfo {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [donor, setDonor] = useState<DonorInfo | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [searched, setSearched] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(
        `/api/donations?email=${encodeURIComponent(email.trim())}`
      );
      const data = await res.json();
      setDonor(data.donor);
      setDonations(data.donations || []);
    } catch {
      setDonor(null);
      setDonations([]);
    } finally {
      setLoading(false);
    }
  }

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);
  const projectsSupported = new Set(donations.map((d) => d.project.id)).size;

  // Group donations by project
  const projectMap = new Map<string, { project: Project; totalDonated: number; donations: Donation[] }>();
  donations.forEach((d) => {
    const existing = projectMap.get(d.project.id);
    if (existing) {
      existing.totalDonated += d.amount;
      existing.donations.push(d);
    } else {
      projectMap.set(d.project.id, {
        project: d.project,
        totalDonated: d.amount,
        donations: [d],
      });
    }
  });

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-forest-dark to-forest py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white font-[var(--font-heading)] mb-4">
            Donor Dashboard
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Track your donations, see where your money goes, and measure your
            impact. Full transparency, always.
          </p>

          {/* Email Lookup */}
          <form
            onSubmit={handleSearch}
            className="max-w-md mx-auto flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
              <input
                type="email"
                placeholder="Enter your email to find donations"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-charcoal outline-none focus:ring-2 focus:ring-orange"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-orange hover:bg-orange-dark disabled:bg-warm-gray text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Find"}
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-forest mx-auto" />
          </div>
        )}

        {!loading && searched && !donor && (
          <div className="text-center py-20 bg-white rounded-2xl">
            <Search className="w-12 h-12 text-warm-gray mx-auto mb-4" />
            <h3 className="text-xl font-bold text-charcoal mb-2">
              No Donations Found
            </h3>
            <p className="text-warm-gray mb-6">
              We couldn&apos;t find any donations associated with this email.
            </p>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-6 py-3 rounded-full font-semibold transition-all"
            >
              <Heart className="w-4 h-4" />
              Make Your First Donation
            </Link>
          </div>
        )}

        {!loading && donor && (
          <>
            {/* Welcome + Stats */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal font-[var(--font-heading)] mb-6">
                Welcome back, {donor.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-forest" />
                    </div>
                    <span className="text-sm text-warm-gray">Total Donated</span>
                  </div>
                  <div className="text-3xl font-bold text-forest">
                    {formatCurrency(totalDonated)}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange/10 rounded-xl flex items-center justify-center">
                      <Heart className="w-5 h-5 text-orange" />
                    </div>
                    <span className="text-sm text-warm-gray">Donations Made</span>
                  </div>
                  <div className="text-3xl font-bold text-charcoal">
                    {donations.length}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-navy/10 rounded-xl flex items-center justify-center">
                      <PieChart className="w-5 h-5 text-navy" />
                    </div>
                    <span className="text-sm text-warm-gray">Projects Supported</span>
                  </div>
                  <div className="text-3xl font-bold text-charcoal">
                    {projectsSupported}
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Breakdown */}
            <h3 className="text-xl font-bold text-charcoal font-[var(--font-heading)] mb-4">
              Your Impact by Project
            </h3>
            <div className="space-y-4">
              {Array.from(projectMap.values()).map(
                ({ project, totalDonated: projDonated, donations: projDonations }) => {
                  const progress = getProgressPercentage(
                    project.raisedAmount,
                    project.goalAmount
                  );
                  const totalExpenses = project.expenses.reduce(
                    (sum, e) => sum + e.amount,
                    0
                  );
                  const isExpanded = expandedProject === project.id;

                  return (
                    <div
                      key={project.id}
                      className="bg-white rounded-2xl shadow-sm overflow-hidden"
                    >
                      <div
                        className="p-6 cursor-pointer hover:bg-cream/50 transition-colors"
                        onClick={() =>
                          setExpandedProject(isExpanded ? null : project.id)
                        }
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                project.category === "direct"
                                  ? "bg-forest/10 text-forest"
                                  : "bg-navy/10 text-navy"
                              }`}
                            >
                              {project.category === "direct"
                                ? "SFG Direct"
                                : "Partner"}
                            </span>
                            <h4 className="text-lg font-bold text-charcoal mt-1 font-[var(--font-heading)]">
                              {project.title}
                            </h4>
                            <p className="text-sm text-warm-gray">
                              {project.country}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-warm-gray">
                              Your contribution
                            </div>
                            <div className="text-xl font-bold text-forest">
                              {formatCurrency(projDonated)}
                            </div>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-forest font-semibold">
                            {formatCurrency(project.raisedAmount)} raised
                          </span>
                          <span className="text-warm-gray">
                            {formatCurrency(project.goalAmount)} goal
                          </span>
                        </div>
                        <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-forest to-forest-light rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-warm-gray">
                            {progress}% funded
                          </span>
                          <span className="text-xs text-orange font-semibold">
                            {isExpanded
                              ? "Hide details"
                              : "View spending details"}
                          </span>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="border-t border-cream px-6 pb-6">
                          {/* Spending Summary */}
                          <div className="py-4">
                            <div className="flex items-center gap-2 mb-4">
                              <TrendingUp className="w-4 h-4 text-forest" />
                              <h5 className="font-bold text-sm text-charcoal">
                                Spending Transparency
                              </h5>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                              <div className="bg-cream rounded-xl p-3">
                                <div className="text-lg font-bold text-forest">
                                  {formatCurrency(project.raisedAmount)}
                                </div>
                                <div className="text-xs text-warm-gray">
                                  Total Raised
                                </div>
                              </div>
                              <div className="bg-cream rounded-xl p-3">
                                <div className="text-lg font-bold text-orange">
                                  {formatCurrency(totalExpenses)}
                                </div>
                                <div className="text-xs text-warm-gray">
                                  Total Spent
                                </div>
                              </div>
                              <div className="bg-cream rounded-xl p-3">
                                <div className="text-lg font-bold text-charcoal">
                                  {formatCurrency(
                                    project.raisedAmount - totalExpenses
                                  )}
                                </div>
                                <div className="text-xs text-warm-gray">
                                  Available
                                </div>
                              </div>
                            </div>

                            {/* Expense List */}
                            {project.expenses.length > 0 ? (
                              <div className="space-y-2">
                                {project.expenses.map((expense) => (
                                  <div
                                    key={expense.id}
                                    className="flex items-center justify-between py-2 border-b border-cream last:border-0 text-sm"
                                  >
                                    <div>
                                      <span className="text-charcoal font-medium">
                                        {expense.description}
                                      </span>
                                      <div className="flex items-center gap-2 text-xs text-warm-gray mt-0.5">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(
                                          expense.date
                                        ).toLocaleDateString()}
                                        <span className="px-1.5 py-0.5 bg-cream rounded text-xs capitalize">
                                          {expense.category}
                                        </span>
                                      </div>
                                    </div>
                                    <span className="font-semibold text-charcoal">
                                      {formatCurrency(expense.amount)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-warm-gray text-center py-4">
                                Expense reports will appear here as funds are
                                allocated.
                              </p>
                            )}
                          </div>

                          {/* Donation History */}
                          <div className="pt-4 border-t border-cream">
                            <h5 className="font-bold text-sm text-charcoal mb-3">
                              Your Donations to This Project
                            </h5>
                            <div className="space-y-2">
                              {projDonations.map((d) => (
                                <div
                                  key={d.id}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <div className="flex items-center gap-2 text-warm-gray">
                                    <Heart className="w-3 h-3 text-orange" />
                                    {new Date(
                                      d.createdAt
                                    ).toLocaleDateString()}
                                    {d.message && (
                                      <span className="text-xs italic">
                                        &quot;{d.message}&quot;
                                      </span>
                                    )}
                                  </div>
                                  <span className="font-semibold text-forest">
                                    {formatCurrency(d.amount)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center gap-1 text-sm text-orange font-semibold mt-4 hover:gap-2 transition-all"
                          >
                            View full project page
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </>
        )}

        {!searched && (
          <div className="text-center py-20 bg-white rounded-2xl">
            <Search className="w-12 h-12 text-warm-gray mx-auto mb-4" />
            <h3 className="text-xl font-bold text-charcoal mb-2 font-[var(--font-heading)]">
              Enter Your Email Above
            </h3>
            <p className="text-warm-gray max-w-md mx-auto">
              Look up your donation history and see exactly how your
              contributions are making an impact.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
