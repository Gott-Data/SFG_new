import Link from "next/link";
import {
  Heart,
  Target,
  Lightbulb,
  Users,
  Activity,
  BookOpen,
  Laptop,
  Globe,
  Handshake,
} from "lucide-react";

export const metadata = {
  title: "About Us | Statloba For Good",
  description:
    "Learn about our mission to empower communities through sport, data, and health.",
};

const services = [
  {
    icon: Activity,
    title: "Sports for Good",
    description:
      "We design and support sports programs that foster leadership, promote wellbeing, inclusion, and social change for youth and underserved communities.",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description:
      "We organize health fairs and workshops providing free medical screenings, wellness education, and mental health resources to communities.",
  },
  {
    icon: Laptop,
    title: "Digital Literacy & Tech Access",
    description:
      "We build tools and run programs that expand access to education — from e-learning platforms to Data & AI Skills Training and digital workshops.",
  },
  {
    icon: Users,
    title: "Community Events",
    description:
      "We organize community-based events that create access, build confidence, and promote wellbeing across neighborhoods.",
  },
  {
    icon: Handshake,
    title: "Organizational Consulting",
    description:
      "We provide hands-on support to mission-aligned organizations — from program management to custom consulting for operations and systems.",
  },
  {
    icon: Globe,
    title: "Global Partnerships",
    description:
      "We support growth-minded teams doing good globally, developing fundraising strategies and helping organizations scale what works.",
  },
];

const values = [
  {
    icon: Target,
    title: "Data-Driven Impact",
    description: "Every decision backed by data. Every dollar tracked and accounted for.",
  },
  {
    icon: Lightbulb,
    title: "Innovation for Good",
    description: "Using technology and sport as vehicles for sustainable community change.",
  },
  {
    icon: BookOpen,
    title: "Radical Transparency",
    description: "Open books, open reporting. Donors see exactly where their support goes.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "We co-create solutions with communities, not for them. Local voices lead.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="bg-gradient-to-br from-forest-dark to-forest py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white font-[var(--font-heading)] mb-4">
            About Statloba For Good
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Sport + Data + Health = Good. We empower communities through
            sustainable, data-driven initiatives.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
            <h2 className="text-2xl lg:text-3xl font-bold text-charcoal font-[var(--font-heading)] mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-warm-gray leading-relaxed">
              <p>
                Statloba For Good (SFG) was born from a simple belief: that
                sport, data, and community-driven solutions can transform lives.
                Based in Portland, Oregon, we work both locally in the U.S. and
                with partner organizations around the world.
              </p>
              <p>
                We use sport as a universal language to bring people together,
                technology to amplify impact, and data to ensure every dollar
                creates maximum change. Our work spans youth development,
                women&apos;s health, digital literacy, and community building.
              </p>
              <p>
                What makes us different? <strong>Radical transparency.</strong>{" "}
                Every donor can track their contribution, see exactly where
                funds are spent, and measure the impact of their generosity.
                We believe that when people can see the change they&apos;re
                making, they become lifelong champions for good.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-[var(--font-heading)] mb-3">
              Our Values
            </h2>
            <p className="text-warm-gray max-w-xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-cream rounded-2xl p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-forest/10 rounded-xl mb-4">
                  <value.icon className="w-6 h-6 text-forest" />
                </div>
                <h3 className="font-bold text-charcoal mb-2 font-[var(--font-heading)]">
                  {value.title}
                </h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services / What We Do */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-[var(--font-heading)] mb-3">
              What We Do
            </h2>
            <p className="text-warm-gray max-w-xl mx-auto">
              Data-driven pro bono and sliding scale support services to amplify
              Sport For Good initiatives locally and globally.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange/10 rounded-xl mb-4">
                  <service.icon className="w-6 h-6 text-orange" />
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-2 font-[var(--font-heading)]">
                  {service.title}
                </h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-[var(--font-heading)] mb-6">
            Join the Movement
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Whether you donate, volunteer, or partner with us, you become part
            of a community committed to creating lasting change.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
            >
              <Heart className="w-5 h-5" />
              Support Our Work
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all border border-white/20"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
