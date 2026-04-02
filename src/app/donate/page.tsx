import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatCurrency, getProgressPercentage } from "@/lib/utils";

export const metadata = {
  title: "Donate | Statloba For Good",
  description: "Choose a project to support and make your donation today.",
};

async function getActiveProjects() {
  try {
    return await prisma.project.findMany({
      where: { status: "active" },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export default async function DonatePage() {
  const projects = await getActiveProjects();

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
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => {
              const progress = getProgressPercentage(
                project.raisedAmount,
                project.goalAmount
              );
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
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
                      <h3 className="text-lg font-bold text-charcoal mt-2 font-[var(--font-heading)] group-hover:text-forest transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-warm-gray">{project.country}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-warm-gray group-hover:text-orange group-hover:translate-x-1 transition-all mt-2" />
                  </div>

                  <div className="mb-2">
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

                  <p className="text-sm text-orange font-semibold mt-3">
                    Donate to this project &rarr;
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl">
            <Heart className="w-12 h-12 text-warm-gray mx-auto mb-4" />
            <h3 className="text-xl font-bold text-charcoal mb-2">
              Projects Coming Soon
            </h3>
            <p className="text-warm-gray">
              Check back soon for projects you can support.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
