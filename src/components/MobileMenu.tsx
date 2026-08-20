"use client";

import { useEffect } from "react";
import { Camera, Play, Share2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandWordmark } from "@/components/Logo";
import { AnimalTexture } from "@/components/textures";
import { useStore } from "@/context/StoreProvider";
import type { FilterCategory } from "@/data/types";

interface MenuLink {
  label: string;
  category: FilterCategory;
  href: string;
}

const MENU_LINKS: MenuLink[] = [
  { label: "Collections", category: "All", href: "#collection" },
  { label: "Women's Runway", category: "Women's Runway", href: "#collection" },
  { label: "Men's Tailoring", category: "Men's Tailoring", href: "#collection" },
  { label: "Handbags & Shoes", category: "Handbags & Shoes", href: "#collection" },
  { label: "Intimates & Lingerie", category: "Intimates & Lingerie", href: "#collection" },
  { label: "High Jewelry", category: "High Jewelry", href: "#collection" },
  { label: "Everyday Essentials", category: "Everyday Essentials", href: "#collection" },
  { label: "The Atelier", category: "All", href: "#atelier" },
  { label: "VIP Concierge", category: "All", href: "#concierge" },
];

export function MobileMenu() {
  const { menuOpen, closeMenu, setActiveFilter } = useStore();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  const go = (link: MenuLink) => {
    setActiveFilter(link.category);
    closeMenu();
    window.setTimeout(() => {
      document.getElementById(link.href.slice(1))?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 350);
  };

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="fixed inset-0 z-[70] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col border-r border-champagne/20 bg-obsidian px-6 py-6 shadow-panel sm:w-96"
          >
            <div className="mb-8 flex items-center justify-between">
              <BrandWordmark markClassName="h-8 w-8" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
                className="flex h-11 w-11 items-center justify-center text-cream/80 transition-colors hover:text-champagne"
              >
                <X className="h-6 w-6" strokeWidth={1.25} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {MENU_LINKS.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + index * 0.04, duration: 0.3 }}
                  >
                    <button
                      type="button"
                      onClick={() => go(link)}
                      className="group flex w-full items-center justify-between border-b border-cream/5 py-3.5 text-left"
                    >
                      <span className="font-serif text-2xl font-light tracking-wide text-cream transition-colors group-hover:text-champagne">
                        {link.label}
                      </span>
                      <span className="text-champagne/50 opacity-0 transition-opacity group-hover:opacity-100">
                        →
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto space-y-6">
              <div className="flex items-center gap-4 pt-6 text-cream/60">
                <a
                  href="https://instagram.com"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center transition-colors hover:text-champagne"
                >
                  <Camera className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
                </a>
                <a
                  href="https://tiktok.com"
                  aria-label="TikTok"
                  className="flex h-11 w-11 items-center justify-center transition-colors hover:text-champagne"
                >
                  <Play className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
                </a>
                <a
                  href="https://x.com"
                  aria-label="X (Twitter)"
                  className="flex h-11 w-11 items-center justify-center transition-colors hover:text-champagne"
                >
                  <Share2 className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
                </a>
              </div>
              <div className="border-t border-cream/10 pt-6 text-[0.6rem] uppercase tracking-luxe text-cream/40">
                Paris · New York · Tokyo · Dubai
              </div>
              <AnimalTexture name="rosettes" opacity={0.07} className="text-champagne" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}