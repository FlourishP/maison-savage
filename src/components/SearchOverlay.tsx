"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useStore } from "@/context/StoreProvider";
import { formatCurrency } from "@/lib/utils";
import { printLabel } from "@/components/textures";

export function SearchOverlay() {
  const { searchOpen, closeSearch, openQuickView } = useStore();
  const [query, setQuery] = useState("");
  const [wasOpen, setWasOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (searchOpen && !wasOpen) {
    setWasOpen(true);
    setQuery("");
  }
  if (!searchOpen && wasOpen) {
    setWasOpen(false);
  }

  useEffect(() => {
    if (searchOpen) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 150);
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeSearch();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        window.clearTimeout(t);
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [searchOpen, closeSearch]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeSearch}
            aria-hidden="true"
          />
          <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-[12vh] w-[92%] max-w-2xl"
          >
            <div className="gold-etched bg-obsidian/95 p-6 backdrop-blur-md">
              <div className="flex items-center gap-4 border-b border-champagne/25 pb-4">
                <Search className="h-5 w-5 shrink-0 text-champagne" strokeWidth={1.25} aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the maison…"
                  aria-label="Search the maison"
                  className="w-full bg-transparent font-serif text-xl font-light text-cream outline-none placeholder:text-cream/30"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={closeSearch}
                  className="flex h-11 w-11 shrink-0 items-center justify-center text-cream/60 transition-colors hover:text-champagne"
                >
                  <X className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
                </button>
              </div>

              <div className="mt-4 min-h-[160px]">
                {query.trim() === "" ? (
                  <p className="py-10 text-center text-xs uppercase tracking-luxe text-cream/40">
                    Type to search collections, materials and objects
                  </p>
                ) : results.length === 0 ? (
                  <p className="py-10 text-center text-xs uppercase tracking-luxe text-cream/50">
                    No objects found for “{query.trim()}”
                  </p>
                ) : (
                  <ul className="divide-y divide-cream/5">
                    {results.map((product, i) => (
                      <motion.li
                        key={product.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            closeSearch();
                            openQuickView(product);
                          }}
                          className="group flex w-full items-center gap-4 py-3 text-left"
                        >
                          <div className="relative h-14 w-12 shrink-0 overflow-hidden bg-charcoal">
                            <Image
                              src={product.image}
                              alt=""
                              fill
                              sizes="64px"
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-serif text-base text-cream transition-colors group-hover:text-champagne">
                              {product.title}
                            </p>
                            <p className="mt-0.5 text-[0.6rem] uppercase tracking-luxe text-cream/40">
                              {product.category} · {printLabel(product.animalPrintType)}
                            </p>
                          </div>
                          <span className="shrink-0 text-sm text-champagne">
                            {formatCurrency(product.price)}
                          </span>
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}