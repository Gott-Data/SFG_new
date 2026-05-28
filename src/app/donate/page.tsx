import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight, Globe, Building2, Sparkles } from "lucide-react";
import { formatCurrency, getProgressPercentage } from "@/lib/utils";
import { getAllProjects } from "@/lib/get-projects";

export const metadata = {
  title: "Donate | Statloba For Good",
  description: "Choose a project to support and make your donation today.",
};

export default async function DonatePage() {
  const allProjects = await getAllProjects();

  const generalFund = allProjects.find((p) => p.slug === "general-support-fund");
  const directProjects = allProjects.filter(
    (p) => p.category === "direct" && p.slug !== "general-support-fund"
  );
  const partnerProjects = allProjects.filter((p) => p.category === "partner");

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-forest-dark to-forest py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange/20 rounded-full mb-6">
            <Heart className="w-8 h-8 text-orange" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white font-[var(--font-heading)] mb-4">
            Make a Donation
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Choose a project below and make your contribution. Every dollar is
            tracked, transparent, and goes directly to impact.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* General Support Fund — Featured at Top */}
        {generalFund && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-orange/10 rounded-xl">
                <Sparkles className="w-5 h-5 text-orange" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-charcoal font-[var(--font-heading)]">
                  General Support Fund
                </h2>
                <p className="text-sm text-warm-gray">
                  Fuel our pro bono work and help us take on more projects worldwide
                </p>
              </div>
            </div>
            <Link
              href={`/projects/${generalFund.slug}`}
              className="group block bg-gradient-to-br from-forest-dark to-forest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="p-8 lg:p-10 flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 text-white">
                  <span className="inline-block px-3 py-1 bg-orange/20 text-orange-light rounded-full text-xs font-semibold mb-4">
                    Recommended
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold font-[var(--font-heading)] mb-3">
                    {generalFund.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-6 max-w-2xl">
                    Your donation directly powers SFG&apos;s ability to take on
                    more pro bono projects and provide sliding-scale services to
                    organizations around the world. This fund covers operational
                    costs, travel, platform development, and the work that makes
                    every partner project possible.
                  </p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white font-semibold">
                        {formatCurrency(generalFund.raisedAmount)} raised
                      </span>
                      <span className="text-white/60">
                        {formatCurrency(generalFund.goalAmount)} goal
                      </span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange to-orange-light rounded-full"
                        style={{
                          width: `${getProgressPercentage(generalFund.raisedAmount, generalFund.goalAmount)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-orange font-semibold group-hover:gap-3 transition-all">
                    Donate to General Fund
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* SFG Direct Projects */}
        {directProjects.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-forest/10 rounded-xl">
                <Building2 className="w-5 h-5 text-forest" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-charcoal font-[var(--font-heading)]">
                  SFG Direct Projects
                </h2>
                <p className="text-sm text-warm-gray">
                  Programs we design, manage, and operate directly
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {directProjects.map((project) => (
                <DonateProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Partner Projects */}
        {partnerProjects.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-navy/10 rounded-xl">
                <Globe className="w-5 h-5 text-navy" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-charcoal font-[var(--font-heading)]">
                  Partner Projects
                </h2>
                <p className="text-sm text-warm-gray">
                  Support initiatives run by our partners worldwide
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnerProjects.map((project) => (
                <DonateProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DonateProjectCard({
  project,
}: {
  project: {
    id: string;
    slug: string;
    title: string;
    subtitle?: string | null;
    country: string;
    category: string;
    partnerName?: string | null;
    partnerLogoUrl?: string | null;
    partnerSince?: string | null;
    imageUrl?: string | null;
    goalAmount: number;
    raisedAmount: number;
  };
}) {
  const progress = getProgressPercentage(project.raisedAmount, project.goalAmount);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-40 bg-gradient-to-br from-forest to-forest-light overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/20 text-5xl font-bold font-[var(--font-heading)]">
              {project.title.charAt(0)}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              project.category === "direct"
                ? "bg-forest text-white"
                : "bg-navy text-white"
            }`}
          >
            {project.category === "direct" ? "SFG Direct" : "Partner"}
          </span>
        </div>
        {project.partnerLogoUrl && (
          <div className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-lg overflow-hidden flex items-center justify-center p-1 shadow-sm">
            <Image
              src={project.partnerLogoUrl}
              alt={project.partnerName || "Partner"}
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-bold text-charcoal font-[var(--font-heading)] group-hover:text-forest transition-colors mb-1">
          {project.title}
        </h3>
        <p className="text-xs text-warm-gray mb-3">
          {project.country}
          {project.partnerSince && ` · Partner since ${project.partnerSince}`}
        </p>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-semibold text-forest">
              {formatCurrency(project.raisedAmount)}
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
        </div>

        <span className="inline-flex items-center gap-1 text-orange text-sm font-semibold group-hover:gap-2 transition-all">
          Donate Now
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
