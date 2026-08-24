"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { useStore } from "@/context/StoreProvider";
import { ProductCard } from "@/components/ProductCard";
import { AnimalTexture } from "@/components/textures";
import { cn } from "@/lib/utils";
import type { FilterCategory } from "@/data/types";

export function ProductShowcase() {
  const { activeFilter, setActiveFilter } = useStore();

  const visible = useMemo(
    () =>
      activeFilter === "All"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  const counts = useMemo(() => {
    const map = new Map<FilterCategory, number>();
    map.set("All", PRODUCTS.length);
    for (const category of CATEGORIES) {
      if (category === "All") continue;
      map.set(category, PRODUCTS.filter((p) => p.category === category).length);
    }
    return map;
  }, []);

  return (
    <section
      id="collection"
      className="relative scroll-mt-24 overflow-hidden bg-obsidian py-20 sm:py-28"
    >
      <AnimalTexture name="rosettes" className="text-champagne/20" opacity={0.04} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="mx-auto mb-4 flex items-center justify-center gap-3 font-label-sm uppercase tracking-luxe text-champagne">
            <span className="inline-block h-px w-10 bg-champagne/50" />
            The Current Collection
            <span className="inline-block h-px w-10 bg-champagne/50" />
          </p>
          <h2 className="font-display-xl text-display-xl font-light leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
            The <span className="gold-gradient-text italic">Savage</span> Edit
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body-md text-cream/60">
            Cut, painted, embossed and set entirely in-house. Every object is
            numbered, every hide traced to a single origin.
          </p>
        </motion.div>

        <div className="mt-12 flex justify-start overflow-x-auto no-scrollbar sm:justify-center">
          <div
            role="tablist"
            aria-label="Filter products by category"
            className="flex gap-2 sm:flex-wrap sm:justify-center"
          >
            {CATEGORIES.map((category) => {
              const active = activeFilter === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  className={cn(
                    "relative whitespace-nowrap border px-4 py-2.5 font-label-sm uppercase tracking-luxe transition-all duration-300",
                    active
                      ? "border-champagne bg-champagne/10 text-champagne"
                      : "border-cream/15 text-cream/60 hover:border-champagne/40 hover:text-champagne"
                  )}
                >
                  {category}
                  <span
                    className={cn(
                      "ml-2 text-[0.55rem]",
                      active ? "text-champagne/70" : "text-cream/30"
                    )}
                  >
                    {counts.get(category) ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.p
          key={`count-${activeFilter}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center font-serif italic text-cream/50"
        >
          {visible.length} {visible.length === 1 ? "object" : "objects"} — Winter
          &apos;26
        </motion.p>

        <motion.div layout className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}