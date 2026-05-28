import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Users, Calendar, TrendingUp, Handshake } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatCurrency, getProgressPercentage } from "@/lib/utils";
import DonationForm from "@/components/DonationForm";

async function getProject(slug: string) {
  try {
    return await prisma.project.findUnique({
      where: { slug },
      include: {
        donations: {
          where: { status: "completed" },
          orderBy: { createdAt: "desc" },
          take: 10,
          include: { donor: true },
        },
        expenses: {
          orderBy: { date: "desc" },
          take: 10,
        },
      },
    });
  } catch {
    return null;
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const progress = getProgressPercentage(project.raisedAmount, project.goalAmount);
  const totalExpenses = project.expenses.reduce((sum, e) => sum + e.amount, 0);

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
          <h1 className="text-3xl lg:text-5xl font-bold text-white font-[var(--font-heading)] mb-3">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-white/70 text-lg">{project.subtitle}</p>
          )}
        </div>
      </section>

      {/* Project Image */}
      {project.imageUrl && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
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
              <p className="text-warm-gray leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

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
                  {project.expenses.map((expense) => (
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
                          {expense.date.toLocaleDateString()}
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
                  {project.donations.map((donation) => (
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
                          {donation.createdAt.toLocaleDateString()}
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
