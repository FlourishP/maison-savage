import { cn, printTextureClass } from "@/lib/utils";

interface SectionDividerProps {
  label: string;
  print?: "cheetah" | "leopard" | "python" | "zebra" | "jaguar";
  className?: string;
}

export function SectionDivider({
  label,
  print = "zebra",
  className,
}: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden border-y border-[#D4AF37]/30 bg-obsidian",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-[0.09]",
          printTextureClass(print)
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-4 px-6 py-5 sm:py-6">
        <span className="signature-divider w-14 sm:w-20" />
        <span className="font-label-sm uppercase tracking-luxe text-champagne/80">
          {label}
        </span>
        <span className="signature-divider w-14 sm:w-20" />
      </div>
    </div>
  );
}