"use client";

import { Camera, Globe, Play, Share2 } from "lucide-react";
import { BrandWordmark } from "@/components/Logo";
import { AnimalTexture } from "@/components/textures";

const BOUTIQUES = ["Paris — Rue Saint-Honoré", "New York — Fifth Avenue", "Tokyo — Omotesandō", "Dubai — DIFC"];
const CARE = ["Contact Us", "Shipping & Delivery", "Returns & Exchanges", "Ring Resizing", "Client Services", "FAQ"];
const ATELIER = ["About the Maison", "Our Craft", "Sustainability", "Careers", "Press"];
const LEGAL = ["Privacy Policy", "Terms of Sale", "Cookies", "Accessibility", "Sitemap"];

const SOCIALS = [
  { label: "Instagram", Icon: Camera },
  { label: "Facebook", Icon: Globe },
  { label: "X (Twitter)", Icon: Share2 },
  { label: "YouTube", Icon: Play },
];

function LinkColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="mb-4 text-[0.65rem] font-semibold uppercase tracking-luxe text-champagne">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-sm text-cream/55 transition-colors hover:text-champagne"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-champagne/15 bg-charcoal">
      <AnimalTexture name="rosettes" className="text-champagne/30" opacity={0.06} />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-1">
            <BrandWordmark markClassName="h-9 w-9" className="-ml-1" />
            <p className="mt-5 max-w-[240px] text-xs leading-relaxed text-cream/45">
              The Savage Haute Couture. Fashioned in Paris since 1964, worn
              wherever the night refuses to end.
            </p>
            <div className="mt-6 space-y-1 text-[0.6rem] uppercase tracking-luxe text-cream/40">
              <p>Rue Saint-Honoré 390</p>
              <p>Paris, 75001 France</p>
            </div>
          </div>

          <LinkColumn title="Boutiques" links={BOUTIQUES} />
          <LinkColumn title="Client Care" links={CARE} />
          <LinkColumn title="Private Atelier" links={ATELIER} />
          <LinkColumn title="Legal" links={LEGAL} />

          <div>
            <h3 className="mb-4 text-[0.65rem] font-semibold uppercase tracking-luxe text-champagne">
              Socials
            </h3>
            <ul className="flex flex-col gap-3">
              {SOCIALS.map(({ label, Icon }) => (
                <li key={label}>
                  <a
                    href="#"
                    className="inline-flex items-center gap-3 text-sm text-cream/55 transition-colors hover:text-champagne"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-[0.6rem] uppercase tracking-luxe text-cream/35 sm:flex-row">
          <p>© {new Date().getFullYear()} Maison Savage. All rights reserved.</p>
          <p className="font-serif italic normal-case tracking-normal text-cream/40">
            The Savage Haute Couture
          </p>
        </div>
      </div>
    </footer>
  );
}