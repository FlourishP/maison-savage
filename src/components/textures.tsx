"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export type TextureName = "rosettes" | "spots" | "scales" | "stripes";

const patternGeometry: Record<TextureName, { w: number; h: number }> = {
  rosettes: { w: 150, h: 150 },
  spots: { w: 130, h: 130 },
  scales: { w: 64, h: 56 },
  stripes: { w: 130, h: 130 },
};

interface AnimalTextureProps {
  name: TextureName;
  className?: string;
  opacity?: number;
}

export function AnimalTexture({ name, className, opacity }: AnimalTextureProps) {
  const rawId = useId();
  const id = `tex-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const { w, h } = patternGeometry[name];

  return (
    <svg
      aria-hidden="true"
      data-texture={name}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={opacity !== undefined ? { opacity } : undefined}
      preserveAspectRatio="none"
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id={id}
          width={w}
          height={h}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-12)"
        >
          {name === "rosettes" && (
            <g fill="none" stroke="currentColor" strokeWidth="0.9">
              <circle cx="75" cy="75" r="19" />
              <circle cx="75" cy="75" r="3" fill="currentColor" stroke="none" />
              <circle cx="75" cy="41" r="7.5" />
              <circle cx="109" cy="60" r="6" />
              <circle cx="107" cy="93" r="6.5" />
              <circle cx="75" cy="109" r="7.5" />
              <circle cx="43" cy="93" r="6.5" />
              <circle cx="41" cy="60" r="6" />
            </g>
          )}
          {name === "spots" && (
            <g fill="currentColor" stroke="none">
              <circle cx="34" cy="34" r="4.5" />
              <circle cx="47" cy="42" r="2.6" />
              <circle cx="26" cy="46" r="2.4" />
              <circle cx="96" cy="74" r="4.8" />
              <circle cx="108" cy="86" r="2.8" />
              <circle cx="88" cy="88" r="2.2" />
              <circle cx="48" cy="104" r="3.6" />
              <circle cx="60" cy="112" r="2.2" />
              <circle cx="74" cy="16" r="3.6" />
              <circle cx="84" cy="26" r="2" />
              <circle cx="116" cy="28" r="3" />
              <circle cx="14" cy="90" r="2.6" />
            </g>
          )}
          {name === "scales" && (
            <g fill="none" stroke="currentColor" strokeWidth="1.1">
              {[0, 32].map((ox) =>
                [0, 28].map((oy) => (
                  <path
                    key={`${ox}-${oy}`}
                    d={`M ${ox - 28} ${oy + 28} a 32 28 0 0 1 60 0`}
                  />
                ))
              )}
            </g>
          )}
          {name === "stripes" && (
            <g fill="none" stroke="currentColor" strokeWidth="5.5">
              <path d="M26 0 C 40 30, 14 60, 26 90 C 38 110, 22 120, 26 130" />
              <path d="M65 0 C 52 30, 78 60, 66 90 C 54 110, 72 122, 66 130" />
              <path d="M104 0 C 118 30, 92 60, 104 90 C 116 110, 100 120, 104 130" />
            </g>
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

const printNameMap: Record<TextureName, string> = {
  rosettes: "cheetah rosette",
  spots: "leopard spot",
  scales: "python scale",
  stripes: "zebra stripe",
};

export function textureFor(print: string): TextureName {
  switch (print) {
    case "cheetah":
      return "rosettes";
    case "leopard":
      return "spots";
    case "python":
      return "scales";
    case "zebra":
    case "jaguar":
      return "stripes";
    default:
      return "rosettes";
  }
}

export function printLabel(print: string): string {
  return printNameMap[textureFor(print)] ?? "animal motif";
}