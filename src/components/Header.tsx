"use client";

import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandWordmark } from "@/components/Logo";
import { AnimalTexture } from "@/components/textures";
import { useStore } from "@/context/StoreProvider";
import { cn } from "@/lib/utils";
import type { FilterCategory } from "@/data/types";

interface NavLink {
  label: string;
  category: FilterCategory;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Collections", category: "All", href: "#collection" },
  { label: "Women", category: "Women's Runway", href: "#collection" },
  { label: "Men", category: "Men's Tailoring", href: "#collection" },
  { label: "High Jewelry", category: "High Jewelry", href: "#collection" },
  { label: "Intimates", category: "Intimates & Lingerie", href: "#collection" },
  { label: "Atelier", category: "All", href: "#atelier" },
];

export function Header() {
  const {
    cartCount,
    openCart,
    openMenu,
    openSearch,
    setActiveFilter,
  } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigateToCategory = (link: NavLink) => {
    setActiveFilter(link.category);
    document.getElementById(link.href.slice(1))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/90 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md"
          : "bg-black/70 backdrop-blur-md"
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-3 items-center gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 justify-self-start">
          <button
            type="button"
            aria-label="Open menu"
            onClick={openMenu}
            className="-ml-2 flex h-11 w-11 items-center justify-center rounded-sm text-cream transition-colors hover:text-champagne lg:hidden"
          >
            <Menu className="h-6 w-6" strokeWidth={1.25} aria-hidden="true" />
          </button>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => navigateToCategory(link)}
                    className="whitespace-nowrap px-1 py-2.5 text-[0.68rem] font-medium uppercase tracking-luxe text-cream/75 transition-colors hover:text-champagne"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <button
          type="button"
          onClick={() => navigateToCategory(NAV_LINKS[0])}
          className="justify-self-center"
        >
          <BrandWordmark markClassName="h-8 w-8 sm:h-9 sm:w-9" />
        </button>

        <div className="flex items-center justify-end gap-1 justify-self-end">
          <button
            type="button"
            aria-label="Search"
            onClick={openSearch}
            className="flex h-11 w-11 items-center justify-center rounded-sm text-cream/80 transition-colors hover:text-champagne"
          >
            <Search className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="VIP Client Login"
            className="ml-1 hidden items-center gap-2 border border-champagne/25 bg-transparent px-4 py-2 text-[0.65rem] font-medium uppercase tracking-luxe text-champagne transition-all hover:border-champagne/60 hover:bg-champagne/10 sm:flex"
          >
            <UserRound className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
            <span className="hidden md:inline">VIP Client</span>
          </button>
          <button
            type="button"
            aria-label={`Open shopping bag, ${cartCount} items`}
            onClick={openCart}
            className="relative ml-1 flex h-11 w-11 items-center justify-center rounded-sm text-cream/80 transition-colors hover:text-champagne"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden="true"
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border border-black/60 bg-champagne px-1 text-[0.6rem] font-semibold text-black"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimalTexture
        name="rosettes"
        className="text-champagne/10"
        opacity={0.055}
      />
    </header>
  );
}