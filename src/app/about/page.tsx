import Link from "next/link";
import {
  Heart,
  Target,
  Globe,
  Users,
  Activity,
  Laptop,
  Sparkles,
  ArrowRight,
  Trophy,
  GraduationCap,
  Handshake,
  BarChart3,
} from "lucide-react";

export const metadata = {
  title: "About Us | Statloba For Good",
  description:
    "Learn about our mission to empower communities through sport, data, and health. Meet our team and discover our story.",
};

const focusAreas = [
  {
    icon: Heart,
    title: "Community Health Initiatives",
    description:
      "Co-creating health programs with communities — from free health fairs to wellness workshops — ensuring access, education, and inclusive engagement.",
  },
  {
    icon: Users,
    title: "Positive Youth Development",
    description:
      "Building confident, capable young leaders through sport-based programming, mentorship, and leadership development opportunities.",
  },
  {
    icon: Target,
    title: "Sustainable Communities & Organizations",
    description:
      "Empowering mission-aligned organizations with strategies, systems, and digital tools to scale impact and sustain meaningful change.",
  },
  {
    icon: Trophy,
    title: "Women & Girls in Sports",
    description:
      "Creating equitable access to sport and leadership for women and girls, fostering confidence, belonging, and opportunity through inclusive programming.",
  },
];

const pillars = [
  {
    emoji: "⚽",
    title: "Sport for Good",
    color: "bg-forest/10 text-forest",
    description:
      "We use sport as a powerful tool to build confidence, leadership, and belonging — creating safe, inclusive spaces where young people grow not just as athletes, but as changemakers.",
  },
  {
    emoji: "🌐",
    title: "Digital Equity",
    color: "bg-navy/10 text-navy",
    description:
      "We close the digital divide by making tech, data, and AI training accessible — especially in underserved and rural communities — so that no one is left behind in the digital age.",
  },
  {
    emoji: "❤️",
    title: "Community-Led Public Health",
    color: "bg-orange/10 text-orange",
    description:
      "We co-create programs with the communities we serve, focusing on real needs like health education, access to services, and inclusive engagement. From free play days to health fairs, we bring people together to learn, connect, and thrive.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="bg-gradient-to-br from-forest-dark to-forest py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-orange-light px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
            Eugene, Oregon, USA
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white font-[var(--font-heading)] mb-6">
            About Statloba For Good
          </h1>
          <p className="text-white/80 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            SFG is a registered non-profit leveraging decades of experience in
            Data &amp; AI-Driven organizational performance, Sport for Good
            programming, and Community Development to empower positive change.
          </p>
        </div>
      </section>

      {/* The Equation */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-warm-gray text-lg mb-6">
            For SFG, the equation is simple.
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
            {["Data", "+", "Sport", "+", "Health", "=", "Good"].map(
              (item, i) =>
                item === "+" || item === "=" ? (
                  <span
                    key={i}
                    className="text-2xl lg:text-4xl font-bold text-orange"
                  >
                    {item}
                  </span>
                ) : (
                  <span
                    key={i}
                    className={`text-2xl lg:text-4xl font-bold font-[var(--font-heading)] ${
                      item === "Good" ? "text-orange" : "text-forest"
                    }`}
                  >
                    {item}
                  </span>
                )
            )}
          </div>
          <p className="text-warm-gray mt-8 max-w-2xl mx-auto leading-relaxed">
            SFG strongly believes that combining the connecting power of Sport
            with a Data &amp; AI-Driven approach to expand Community Health &amp;
            Development will maximize impact, reach, and quality of targeted
            outcomes.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border-l-4 border-orange">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-orange/10 rounded-xl">
                <Sparkles className="w-6 h-6 text-orange" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-charcoal font-[var(--font-heading)]">
                Our Vision
              </h2>
            </div>
            <p className="text-warm-gray leading-relaxed text-lg mb-6">
              A world where every young person — regardless of geography,
              background, or access — can thrive through the power of sport,
              community, and inclusive technology.
            </p>
            <p className="text-warm-gray leading-relaxed">
              We envision communities where sport is more than play — it&apos;s a
              pathway to confidence, leadership, and belonging. Where data and AI
              are not tools of exclusion, but forces for equity. And where
              organizations working for good are empowered with the strategies,
              systems, and digital tools they need to scale impact and sustain
              meaningful change.
            </p>
            <p className="text-forest font-semibold mt-6">
              Through Sport &amp; Data For Good, we are building that future — one
              partnership, one program, and one young leader at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-[var(--font-heading)] mb-3">
              Core Pillars
            </h2>
            <p className="text-warm-gray max-w-xl mx-auto">
              The three foundations that guide every initiative we lead.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-cream rounded-2xl p-8 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-5xl mb-4">{pillar.emoji}</div>
                <h3 className="text-xl font-bold text-charcoal mb-3 font-[var(--font-heading)]">
                  {pillar.title}
                </h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-[var(--font-heading)] mb-3">
              Focus Areas
            </h2>
            <p className="text-warm-gray max-w-xl mx-auto">
              All through the lens of data &amp; sport for good.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className="bg-white rounded-2xl p-8 shadow-sm flex gap-5"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 bg-forest/10 rounded-xl">
                    <area.icon className="w-6 h-6 text-forest" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-charcoal mb-2 font-[var(--font-heading)]">
                    {area.title}
                  </h3>
                  <p className="text-sm text-warm-gray leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-[var(--font-heading)] mb-3">
              Our Story
            </h2>
          </div>
          <div className="space-y-6 text-warm-gray leading-relaxed">
            <p>
              Desh and Ian&apos;s friendship began in 2008 at Hendrix College in
              Arkansas — two students from different parts of the world,
              connected by a shared love of football and a deep desire to use
              their talents to make a difference.
            </p>
            <p>
              Over the years, that bond evolved into a shared mission: to support
              people, communities, and organizations using sport as a force for
              good. Both followed unique but parallel paths — Desh focusing on
              technology, systems, and inclusive digital solutions; Ian rooted in
              sport, development, and global youth engagement.
            </p>
            <p>
              Through two decades of lived experience, cross-continental
              collaboration, and grassroots learning, they&apos;ve come to
              believe that sport, when combined with data, leadership, and
              empathy, can be one of the most powerful tools for social
              transformation.
            </p>
            <p>
              That belief gave birth to <strong>Statloba For Good</strong> — a
              platform where their complementary strengths come together to help
              communities thrive and help like-minded organizations grow their
              impact.
            </p>
            <p>
              Today, SFG works with sports clubs and organizations, youth,
              coaches, educators and trainers, non-profits, networks and more
              around the world to bring free play, health access, digital
              inclusion, and leadership development into one inclusive movement.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-[var(--font-heading)] mb-3">
              Our Team
            </h2>
          </div>
          <div className="text-center mb-12">
            <p className="text-lg text-forest font-semibold font-[var(--font-heading)]">
              Bound by Sport.
            </p>
            <p className="text-lg text-forest font-semibold font-[var(--font-heading)]">
              Driven by Purpose.
            </p>
            <p className="text-lg text-forest font-semibold font-[var(--font-heading)]">
              United to Make a Difference.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Desh Deepak */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-br from-forest to-forest-light p-8 text-center">
                <div className="w-28 h-28 rounded-full bg-white/20 mx-auto flex items-center justify-center mb-4 border-4 border-white/30">
                  <span className="text-white text-4xl font-bold font-[var(--font-heading)]">
                    DD
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white font-[var(--font-heading)]">
                  Desh Deepak
                </h3>
                <p className="text-white/70 text-sm font-medium">
                  Co-Founder | Secretary
                </p>
              </div>
              <div className="p-6 lg:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Data & AI", "Systems Thinking", "Digital Equity", "Social Entrepreneurship"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-forest/5 text-forest text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
                <div className="space-y-3 text-sm text-warm-gray leading-relaxed">
                  <p>
                    Desh Deepak is a data scientist, systems thinker, and social
                    entrepreneur with over a decade of experience working at the
                    intersection of education, technology, and social impact. He
                    currently serves as CEO of Gott Data and Munin, where he
                    helps organizations harness the power of data, machine
                    learning, and digital tools for real-world transformation.
                  </p>
                  <p>
                    As AI and data systems grow more powerful, so do the
                    inequalities they can reinforce — especially in rural areas
                    and developing countries where access, literacy, and
                    opportunity are limited. That understanding has driven Desh to
                    create programs that bridge the digital divide, promote
                    equity, and ensure that the tools of the future are in the
                    hands of everyone, not just the privileged few.
                  </p>
                  <p>
                    At SFG, Desh brings a human-first approach to innovation,
                    helping communities and mission-aligned partners use data and
                    digital tools in ways that are accessible, ethical, and built
                    for sustainable impact.
                  </p>
                </div>
              </div>
            </div>

            {/* Ian Evans */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-br from-navy to-navy-light p-8 text-center">
                <div className="w-28 h-28 rounded-full bg-white/20 mx-auto flex items-center justify-center mb-4 border-4 border-white/30">
                  <span className="text-white text-4xl font-bold font-[var(--font-heading)]">
                    IE
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white font-[var(--font-heading)]">
                  Ian Evans
                </h3>
                <p className="text-white/70 text-sm font-medium">
                  Co-Founder | President
                </p>
              </div>
              <div className="p-6 lg:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Sport for Good", "Global Development", "Youth Leadership", "Sports Diplomacy"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-navy/5 text-navy text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
                <div className="space-y-3 text-sm text-warm-gray leading-relaxed">
                  <p>
                    Ian Evans is a global sports development leader and lifelong
                    advocate for the power of football to build connection,
                    confidence, and community. His journey spans from a playing
                    and coaching career in soccer to serving as an international
                    sports diplomat.
                  </p>
                  <p>
                    Ian captained the 2006 CIAC LL State Champion Simsbury High
                    School (CT) and Hendrix College (AR) soccer teams before
                    coaching and playing professionally for Friska Viljor FC in
                    Sweden. He earned his MA in International Development from
                    American University and has since worked with over 1,000
                    international youth athletes, coaches, and administrators
                    through sports diplomacy exchange programs.
                  </p>
                  <p>
                    Ian founded the Evans Soccer Academy (ESA) in 2024 and is
                    currently pursuing an MBA in Sports Business at the
                    University of Oregon (expected June 2027). At SFG, Ian leads
                    with heart, humility, and a global perspective — using sport
                    not just as a game, but as a gateway to opportunity and
                    lasting transformation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Bring */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-[var(--font-heading)] mb-3">
              What We Bring
            </h2>
            <p className="text-warm-gray max-w-xl mx-auto">
              Data-driven pro bono and sliding scale support services to amplify
              Sport For Good initiatives locally and globally.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Activity,
                title: "Sports for Good Programs",
                description:
                  "We design and support sports programs that foster leadership, promote wellbeing, inclusion, and social change for youth and underserved communities.",
              },
              {
                icon: Heart,
                title: "Health & Wellness",
                description:
                  "We organize health fairs and workshops providing free medical screenings, wellness education, and mental health resources.",
              },
              {
                icon: Laptop,
                title: "Digital Literacy & Tech Access",
                description:
                  "From e-learning platforms to Data & AI Skills Training, we build tools and run programs that expand access to education and close the digital divide.",
              },
              {
                icon: GraduationCap,
                title: "Community Events",
                description:
                  "Community-based events that create access, build confidence, and promote wellbeing — always free and always for the community.",
              },
              {
                icon: Handshake,
                title: "Organizational Consulting",
                description:
                  "Hands-on support for mission-aligned organizations — from program management to custom consulting for operations and systems.",
              },
              {
                icon: BarChart3,
                title: "Fundraising & Revenue Strategy",
                description:
                  "We help growth-minded teams develop fundraising strategies, implement processes with clear goals and measurable metrics, and scale what works.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-cream rounded-2xl p-8 hover:shadow-md transition-shadow"
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
            Whether you donate, volunteer, or partner with us — you become part
            of a community committed to creating lasting change through sport,
            data, and health.
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
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
