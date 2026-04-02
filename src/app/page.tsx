import Link from "next/link";
import { ArrowRight, Heart, Shield, Eye } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import ImpactStats from "@/components/ImpactStats";
import { prisma } from "@/lib/db";

async function getFeaturedProjects() {
  try {
    return await prisma.project.findMany({
      where: { featured: true, status: "active" },
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-forest-dark via-forest to-forest-light overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-orange/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-navy/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-orange-light px-4 py-2 rounded-full text-sm font-semibold mb-8">
              <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
              Sport + Data = Good
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white font-[var(--font-heading)] leading-tight mb-6">
              Empowering
              <br />
              Communities
              <br />
              <span className="text-orange">For Good</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed mb-10">
              We use sport, technology, and community-driven solutions to build
              healthier, more connected, and digitally empowered futures for
              those who need it most.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-orange/30"
              >
                <Heart className="w-5 h-5" />
                Support a Project
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all border border-white/20"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-[var(--font-heading)] mb-6">
              Our Mission
            </h2>
            <p className="text-lg lg:text-xl text-warm-gray leading-relaxed mb-10">
              Statloba For Good empowers communities and purpose-driven
              organizations through sport, public health, and digital literacy.
              We support youth, women, and those who are under-resourced and
              under-represented through sustainable, data-driven initiatives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Be the Hero",
                  desc: "Your donation directly funds programs that change lives. Track every dollar and see your impact in real time.",
                },
                {
                  icon: Shield,
                  title: "Full Transparency",
                  desc: "We show you exactly where funds go. Every project, every expense — complete financial transparency.",
                },
                {
                  icon: Eye,
                  title: "See the Impact",
                  desc: "Follow your contribution from donation to outcome. Real stories, real data, real change.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-8 shadow-sm"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange/10 rounded-xl mb-4">
                    <item.icon className="w-6 h-6 text-orange" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-2 font-[var(--font-heading)]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-warm-gray leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <ImpactStats />

      {/* Featured Projects */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-[var(--font-heading)] mb-2">
                Featured Projects
              </h2>
              <p className="text-warm-gray">
                Support the initiatives making the biggest impact right now.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-forest hover:text-forest-dark font-semibold transition-colors"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl">
              <p className="text-warm-gray mb-4">Projects loading soon.</p>
              <Link
                href="/projects"
                className="text-orange font-semibold hover:underline"
              >
                Browse All Projects
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-forest-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-[var(--font-heading)] mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Every contribution, no matter the size, creates ripples of change.
            Join our community of donors who are building a better future
            through sport, data, and health.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
            >
              <Heart className="w-5 h-5" />
              Donate Now
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all border border-white/20"
            >
              Track Your Impact
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
