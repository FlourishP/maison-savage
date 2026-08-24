import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
    >
      <defs>
        <linearGradient id="ms-gold" x1="8" y1="8" x2="56" y2="56">
          <stop offset="0%" stopColor="#8a6d1f" />
          <stop offset="45%" stopColor="#d4af37" />
          <stop offset="55%" stopColor="#f5e6a8" />
          <stop offset="100%" stopColor="#8a6d1f" />
        </linearGradient>
      </defs>
      <g stroke="url(#ms-gold)" strokeWidth="1.1">
        <path d="M32 2 L51 11 L60 32 L51 53 L32 62 L13 53 L4 32 L13 11 Z" />
        <circle cx="32" cy="32" r="14" />
        <rect x="27" y="8" width="1.6" height="10" />
        <rect x="27" y="46" width="1.6" height="10" />
        <rect x="8" y="27" width="10" height="1.6" />
        <rect x="46" y="27" width="10" height="1.6" />
      </g>
      <g fill="url(#ms-gold)">
        <circle cx="32" cy="32" r="2.4" />
        <circle cx="40" cy="22" r="1.5" />
        <circle cx="43" cy="31" r="1.2" />
        <circle cx="40" cy="42" r="1.5" />
        <circle cx="24" cy="22" r="1.5" />
        <circle cx="21" cy="31" r="1.2" />
        <circle cx="24" cy="42" r="1.5" />
        <circle cx="32" cy="20" r="1.1" />
        <circle cx="32" cy="44" r="1.1" />
      </g>
      <g stroke="url(#ms-gold)" strokeWidth="0.6" opacity="0.85">
        <circle cx="32" cy="32" r="18.5" />
        <circle cx="32" cy="32" r="23" />
      </g>
    </svg>
  );
}

interface BrandWordmarkProps {
  className?: string;
  markClassName?: string;
}

export function BrandWordmark({ className, markClassName }: BrandWordmarkProps) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className={markClassName} />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl font-semibold tracking-titan text-cream uppercase sm:text-2xl">
          Maison Savage
        </span>
        <span className="mt-1 font-label-sm uppercase tracking-luxe text-champagne/80">
          The Savage Haute Couture
        </span>
      </span>
    </span>
  );
}