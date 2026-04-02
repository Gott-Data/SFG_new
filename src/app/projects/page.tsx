import { prisma } from "@/lib/db";
import ProjectCard from "@/components/ProjectCard";
import { Globe, Building2 } from "lucide-react";

async function getProjects() {
  try {
    return await prisma.project.findMany({
      where: { status: "active" },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Our Projects | Statloba For Good",
  description: "Explore our direct and partner projects making impact worldwide.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const directProjects = projects.filter((p) => p.category === "direct");
  const partnerProjects = projects.filter((p) => p.category === "partner");

  return (
    <div className="bg-cream min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-forest-dark to-forest py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white font-[var(--font-heading)] mb-4">
            Our Projects
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            From Portland to Nairobi, we run and support projects that use
            sport, data, and health to uplift communities.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Direct Projects */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
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

          {directProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {directProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center">
              <p className="text-warm-gray">Direct projects coming soon.</p>
            </div>
          )}
        </div>

        {/* Partner Projects */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-navy/10 rounded-xl">
              <Globe className="w-5 h-5 text-navy" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-charcoal font-[var(--font-heading)]">
                Partner Projects
              </h2>
              <p className="text-sm text-warm-gray">
                Initiatives run by our partners across different countries, supported by SFG
              </p>
            </div>
          </div>

          {partnerProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partnerProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center">
              <p className="text-warm-gray">Partner projects coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
