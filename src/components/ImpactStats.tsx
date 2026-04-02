"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Users, Heart, Trophy } from "lucide-react";

const stats = [
  { icon: Globe, value: 6, suffix: "+", label: "Countries Reached" },
  { icon: Users, value: 2000, suffix: "+", label: "Lives Impacted" },
  { icon: Heart, value: 15, suffix: "+", label: "Active Projects" },
  { icon: Trophy, value: 95, suffix: "%", label: "Funds to Programs" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-4xl lg:text-5xl font-bold text-forest font-[var(--font-heading)]">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export default function ImpactStats() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-[var(--font-heading)] mb-3">
            Our Impact in Numbers
          </h2>
          <p className="text-warm-gray max-w-2xl mx-auto">
            Every dollar, every hour, every effort — they add up to real change
            in communities around the world.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-cream rounded-2xl mb-4">
                <stat.icon className="w-7 h-7 text-orange" />
              </div>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <div className="text-sm text-warm-gray mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
