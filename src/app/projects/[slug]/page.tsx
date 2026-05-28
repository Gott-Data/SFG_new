import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Users, Calendar, TrendingUp, Handshake, FileText } from "lucide-react";
import type { ClinicBudget, BudgetCategory } from "@/lib/projects-data";
import { formatCurrency, getProgressPercentage } from "@/lib/utils";
import DonationForm from "@/components/DonationForm";
import { getProjectBySlug } from "@/lib/get-projects";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const progress = getProgressPercentage(project.raisedAmount, project.goalAmount);
  const totalExpenses = project.expenses.reduce((sum: number, e: { amount: number }) => sum + e.amount, 0);

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-forest-dark to-forest py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                project.category === "direct"
                  ? "bg-forest-light text-white"
                  : "bg-navy text-white"
              }`}
            >
              {project.category === "direct" ? "SFG Direct" : "Partner Project"}
            </span>
            <div className="flex items-center gap-1 text-white/60 text-sm">
              <MapPin className="w-3 h-3" />
              {project.country}
            </div>
            {project.partnerName && (
              <div className="flex items-center gap-1 text-white/60 text-sm">
                <Users className="w-3 h-3" />
                {project.partnerName}
              </div>
            )}
            {project.partnerSince && (
              <div className="flex items-center gap-1 text-white/60 text-sm">
                <Handshake className="w-3 h-3" />
                Partners since {project.partnerSince}
              </div>
            )}
          </div>

          <div className="flex items-start gap-6">
            {project.partnerLogoUrl && (
              <div className="hidden md:flex flex-shrink-0 w-20 h-20 bg-white/10 rounded-xl overflow-hidden items-center justify-center p-2">
                <Image
                  src={project.partnerLogoUrl}
                  alt={`${project.partnerName} logo`}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl lg:text-5xl font-bold text-white font-[var(--font-heading)] mb-3">
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="text-white/70 text-lg">{project.subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Image */}
      {project.imageUrl && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg bg-forest/20">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Fundraising Progress */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-charcoal font-[var(--font-heading)] mb-6">
                Fundraising Progress
              </h2>
              <div className="mb-4">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <span className="text-3xl font-bold text-forest">
                      {formatCurrency(project.raisedAmount)}
                    </span>
                    <span className="text-warm-gray ml-2">
                      of {formatCurrency(project.goalAmount)} goal
                    </span>
                  </div>
                  <span className="text-lg font-bold text-forest">{progress}%</span>
                </div>
                <div className="w-full h-4 bg-cream rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-forest to-forest-light rounded-full transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center mt-6 pt-6 border-t border-cream">
                <div>
                  <div className="text-2xl font-bold text-charcoal">
                    {project.donations.length}
                  </div>
                  <div className="text-xs text-warm-gray">Donors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-charcoal">
                    {formatCurrency(totalExpenses)}
                  </div>
                  <div className="text-xs text-warm-gray">Spent</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-charcoal">
                    {formatCurrency(project.raisedAmount - totalExpenses)}
                  </div>
                  <div className="text-xs text-warm-gray">Available</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-charcoal font-[var(--font-heading)] mb-4">
                About This Project
              </h2>
              <div className="text-warm-gray leading-relaxed whitespace-pre-line">
                {project.description}
              </div>
            </div>

            {/* Clinic Budget */}
            {project.clinicBudget && (
              <ClinicBudgetSection budget={project.clinicBudget} />
            )}

            {/* Partner Logo (mobile) */}
            {project.partnerLogoUrl && (
              <div className="md:hidden bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-cream rounded-xl overflow-hidden flex items-center justify-center p-2">
                  <Image
                    src={project.partnerLogoUrl}
                    alt={`${project.partnerName} logo`}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm text-warm-gray">Partner Organization</p>
                  <p className="font-bold text-charcoal">{project.partnerName}</p>
                  {project.partnerSince && (
                    <p className="text-xs text-warm-gray">Since {project.partnerSince}</p>
                  )}
                </div>
              </div>
            )}

            {/* Spending Transparency */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-forest" />
                <h2 className="text-xl font-bold text-charcoal font-[var(--font-heading)]">
                  Spending Transparency
                </h2>
              </div>
              {project.expenses.length > 0 ? (
                <div className="space-y-3">
                  {project.expenses.map((expense: { id: string; description: string; date: Date; category: string; amount: number }) => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between py-3 border-b border-cream last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-charcoal">
                          {expense.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-warm-gray mt-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(expense.date).toLocaleDateString()}
                          <span className="px-2 py-0.5 bg-cream rounded-full text-xs capitalize">
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
                <p className="text-warm-gray text-sm text-center py-8">
                  Expense reports will appear here as funds are allocated and
                  spent. Full transparency, always.
                </p>
              )}
            </div>

            {/* Recent Donations */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-charcoal font-[var(--font-heading)] mb-6">
                Recent Supporters
              </h2>
              {project.donations.length > 0 ? (
                <div className="space-y-4">
                  {project.donations.map((donation: { id: string; anonymous: boolean; donor: { name: string }; message?: string | null; amount: number; createdAt: Date }) => (
                    <div
                      key={donation.id}
                      className="flex items-start justify-between py-3 border-b border-cream last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
                          <span className="text-forest font-bold text-sm">
                            {donation.anonymous
                              ? "?"
                              : donation.donor.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-charcoal">
                            {donation.anonymous
                              ? "Anonymous Donor"
                              : donation.donor.name}
                          </p>
                          {donation.message && (
                            <p className="text-xs text-warm-gray mt-0.5 italic">
                              &quot;{donation.message}&quot;
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-forest text-sm">
                          {formatCurrency(donation.amount)}
                        </span>
                        <p className="text-xs text-warm-gray">
                          {new Date(donation.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-warm-gray text-sm text-center py-8">
                  Be the first to support this project!
                </p>
              )}
            </div>
          </div>

          {/* Sidebar - Donation Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-charcoal font-[var(--font-heading)] mb-6">
                Make a Donation
              </h2>
              <DonationForm
                projectId={project.id}
                projectTitle={project.title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatNPR(amount: number) {
  return `NPR ${amount.toLocaleString("en-IN")}`;
}

function formatUSD(amount: number) {
  return `$${amount.toLocaleString()}`;
}

function ClinicBudgetSection({ budget }: { budget: ClinicBudget }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="w-5 h-5 text-forest" />
        <h2 className="text-xl font-bold text-charcoal font-[var(--font-heading)]">
          {budget.title}
        </h2>
      </div>
      <p className="text-sm text-warm-gray mb-6">
        Full budget transparency — every line item, every dollar.
      </p>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="bg-forest/5 rounded-xl p-4 text-center">
          <div className="text-lg font-bold text-forest">{formatUSD(budget.grandTotalUSD)}</div>
          <div className="text-xs text-warm-gray">Grand Total</div>
        </div>
        <div className="bg-orange/5 rounded-xl p-4 text-center">
          <div className="text-lg font-bold text-orange">{formatUSD(budget.sfgCoveredUSD)}</div>
          <div className="text-xs text-warm-gray">SFG Covered</div>
        </div>
        <div className="bg-navy/5 rounded-xl p-4 text-center">
          <div className="text-lg font-bold text-navy">{formatUSD(budget.grantAskUSD)}</div>
          <div className="text-xs text-warm-gray">Grant Ask</div>
        </div>
        <div className="bg-cream rounded-xl p-4 text-center">
          <div className="text-lg font-bold text-charcoal">{formatNPR(budget.grandTotalNPR)}</div>
          <div className="text-xs text-warm-gray">Total (NPR)</div>
        </div>
      </div>

      {/* Detailed Categories */}
      <div className="space-y-6">
        {budget.categories.map((cat: BudgetCategory) => (
          <BudgetCategoryBlock key={cat.key} category={cat} />
        ))}
      </div>

      {/* Totals */}
      <div className="mt-8 pt-6 border-t-2 border-forest/20 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-warm-gray">Direct programme costs</span>
          <span className="font-medium text-charcoal">
            {formatNPR(budget.directCostsNPR)} ({formatUSD(budget.directCostsUSD)})
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-warm-gray">Contingency (10%)</span>
          <span className="font-medium text-charcoal">
            {formatNPR(budget.contingencyNPR)} ({formatUSD(budget.contingencyUSD)})
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-warm-gray">Administrative overhead (8%)</span>
          <span className="font-medium text-charcoal">
            {formatNPR(budget.overheadNPR)} ({formatUSD(budget.overheadUSD)})
          </span>
        </div>
        <div className="flex justify-between text-sm font-bold pt-2 border-t border-cream">
          <span className="text-charcoal">Grand Total</span>
          <span className="text-forest">
            {formatNPR(budget.grandTotalNPR)} ({formatUSD(budget.grandTotalUSD)})
          </span>
        </div>
        <div className="flex justify-between text-sm text-warm-gray pt-1">
          <span>Minus: {budget.sfgCoveredLabel}</span>
          <span>−{formatNPR(budget.sfgCoveredNPR)} (−{formatUSD(budget.sfgCoveredUSD)})</span>
        </div>
        <div className="flex justify-between text-sm font-bold bg-orange/5 rounded-lg p-3 mt-2">
          <span className="text-charcoal">Total Grant Ask</span>
          <span className="text-orange">
            {formatNPR(budget.grantAskNPR)} ({formatUSD(budget.grantAskUSD)})
          </span>
        </div>
      </div>
    </div>
  );
}

function BudgetCategoryBlock({ category }: { category: BudgetCategory }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-charcoal">
          <span className="inline-flex items-center justify-center w-6 h-6 bg-forest text-white text-xs font-bold rounded-full mr-2">
            {category.key}
          </span>
          {category.label}
        </h3>
        <span className="text-sm font-semibold text-forest whitespace-nowrap ml-4">
          {formatUSD(category.subtotalUSD)}
        </span>
      </div>
      <div className="bg-cream/50 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-warm-gray border-b border-cream">
              <th className="text-left p-3 font-medium">Line Item</th>
              <th className="text-right p-3 font-medium hidden sm:table-cell">Units</th>
              <th className="text-right p-3 font-medium hidden sm:table-cell">Unit Cost</th>
              <th className="text-right p-3 font-medium">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {category.items.map((item, i) => (
              <tr
                key={i}
                className="border-b border-cream/70 last:border-0"
              >
                <td className="p-3">
                  <p className="font-medium text-charcoal">{item.name}</p>
                  <p className="text-xs text-warm-gray mt-0.5">{item.notes}</p>
                </td>
                <td className="p-3 text-right text-warm-gray hidden sm:table-cell">{item.units}</td>
                <td className="p-3 text-right text-warm-gray hidden sm:table-cell">
                  {formatNPR(item.unitCostNPR)}
                </td>
                <td className="p-3 text-right font-medium text-charcoal whitespace-nowrap">
                  {formatUSD(item.subtotalUSD)}
                  <span className="block text-xs text-warm-gray">{formatNPR(item.subtotalNPR)}</span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-forest/5">
              <td colSpan={3} className="p-3 text-sm font-semibold text-charcoal">
                Subtotal
              </td>
              <td className="p-3 text-right font-bold text-forest whitespace-nowrap">
                {formatUSD(category.subtotalUSD)}
                <span className="block text-xs font-normal text-warm-gray">
                  {formatNPR(category.subtotalNPR)}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
