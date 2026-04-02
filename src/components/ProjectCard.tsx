import Link from "next/link";
import { MapPin, Users, ArrowRight } from "lucide-react";
import { formatCurrency, getProgressPercentage } from "@/lib/utils";

interface ProjectCardProps {
  slug: string;
  title: string;
  subtitle?: string | null;
  description: string;
  category: string;
  country: string;
  partnerName?: string | null;
  goalAmount: number;
  raisedAmount: number;
  imageUrl?: string | null;
  featured?: boolean;
}

export default function ProjectCard({
  slug,
  title,
  subtitle,
  description,
  category,
  country,
  partnerName,
  goalAmount,
  raisedAmount,
  featured,
}: ProjectCardProps) {
  const progress = getProgressPercentage(raisedAmount, goalAmount);

  return (
    <Link
      href={`/projects/${slug}`}
      className={`group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
        featured ? "ring-2 ring-orange/20" : ""
      }`}
    >
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-forest to-forest-light overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/20 text-6xl font-bold font-[var(--font-heading)]">
            {title.charAt(0)}
          </div>
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              category === "direct"
                ? "bg-forest text-white"
                : "bg-navy text-white"
            }`}
          >
            {category === "direct" ? "SFG Direct" : "Partner Project"}
          </span>
          {featured && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange text-white">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-warm-gray text-xs mb-2">
          <MapPin className="w-3 h-3" />
          <span>{country}</span>
          {partnerName && (
            <>
              <span className="text-cream-dark">|</span>
              <Users className="w-3 h-3" />
              <span>{partnerName}</span>
            </>
          )}
        </div>

        <h3 className="text-lg font-bold text-charcoal mb-1 font-[var(--font-heading)] group-hover:text-forest transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-warm-gray mb-3">{subtitle}</p>
        )}
        <p className="text-sm text-warm-gray leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-semibold text-forest">
              {formatCurrency(raisedAmount)} raised
            </span>
            <span className="text-warm-gray">
              of {formatCurrency(goalAmount)}
            </span>
          </div>
          <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-forest to-forest-light rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-right mt-1">
            <span className="text-xs text-warm-gray">{progress}% funded</span>
          </div>
        </div>

        <div className="flex items-center text-orange text-sm font-semibold group-hover:gap-2 transition-all">
          <span>Support This Project</span>
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
