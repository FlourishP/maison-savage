"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Heart, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { useStore } from "@/context/StoreProvider";
import { formatCurrency, cn } from "@/lib/utils";
import { printLabel } from "@/components/textures";

export function QuickViewModal() {
  const { quickView, closeQuickView, addToCart, toggleWishlist, isWishlisted } =
    useStore();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [lastProductId, setLastProductId] = useState<string | null>(null);

  if (quickView && quickView.id !== lastProductId) {
    setLastProductId(quickView.id);
    setActiveImage(0);
    setSelectedSize("");
  }

  useEffect(() => {
    if (quickView) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeQuickView();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [quickView, closeQuickView]);

  if (!quickView) return null;

  const images = [quickView.image, quickView.hoverImage];
  const print = printLabel(quickView.animalPrintType);
  const wished = isWishlisted(quickView.id);

  const handleAdd = () => {
    const size = selectedSize || quickView.sizes[0];
    addToCart(quickView, size, 1);
  };

  return (
    <AnimatePresence>
      {quickView && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view: ${quickView.title}`}
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeQuickView}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-hidden overflow-y-auto gold-etched-bright bg-obsidian md:grid-cols-2 md:overflow-hidden"
          >
            <button
              type="button"
              aria-label="Close quick view"
              onClick={closeQuickView}
              className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center border border-cream/15 bg-black/60 text-cream/80 backdrop-blur-sm transition-colors hover:border-champagne/60 hover:text-champagne"
            >
              <X className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
            </button>

            <div className="relative aspect-[3/4] bg-charcoal md:aspect-auto md:min-h-[560px]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[activeImage]}
                    alt={quickView.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 flex gap-3 bg-gradient-to-t from-black/80 to-transparent p-4">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={`View image ${i + 1}`}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "relative h-20 w-16 overflow-hidden border transition-colors",
                      i === activeImage
                        ? "border-champagne"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image src={src} alt="" fill sizes="80px" className="object-cover object-top" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.6rem] uppercase tracking-luxe text-champagne">
                    {quickView.category} · {print}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl font-light leading-snug text-cream sm:text-4xl">
                    {quickView.title}
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                  aria-pressed={wished}
                  onClick={() => toggleWishlist(quickView.id)}
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center border transition-all",
                    wished
                      ? "border-champagne bg-champagne/10 text-champagne"
                      : "border-cream/15 text-cream/60 hover:border-champagne/60 hover:text-champagne"
                  )}
                >
                  <Heart
                    className="h-5 w-5"
                    strokeWidth={1.25}
                    fill={wished ? "currentColor" : "none"}
                    aria-hidden="true"
                  />
                </button>
              </div>

              <p className="mt-4 font-serif text-2xl text-champagne">
                {formatCurrency(quickView.price)}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-cream/70">
                {quickView.description}
              </p>

              <p className="mt-4 border-l-2 border-champagne/40 pl-3 text-xs italic text-cream/60">
                {quickView.material}
              </p>

              <div className="mt-5">
                <p className="text-[0.6rem] font-medium uppercase tracking-luxe text-cream/50">
                  Select size
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {quickView.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={selectedSize === size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "min-w-12 border px-3 py-2.5 text-xs tracking-wider transition-all",
                        selectedSize === size
                          ? "border-champagne bg-champagne text-black"
                          : "border-cream/20 text-cream/70 hover:border-champagne/50 hover:text-champagne"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="mt-6 flex w-full items-center justify-center gap-3 border border-champagne bg-champagne px-6 py-4 text-[0.7rem] font-semibold uppercase tracking-luxe text-black transition-all duration-300 hover:bg-transparent hover:text-champagne"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                Add to Bag — {formatCurrency(quickView.price)}
              </button>

              <ul className="mt-6 grid grid-cols-1 gap-2 text-xs text-cream/60">
                {quickView.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2">
                    <span className="mt-1.5 h-px w-3 shrink-0 bg-champagne/50" />
                    {detail}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-2 border-t border-cream/10 pt-5 text-[0.65rem] uppercase tracking-luxe text-cream/40 sm:flex-row sm:gap-6">
                <span className="inline-flex items-center gap-2">
                  <Truck className="h-4 w-4 text-champagne/70" aria-hidden="true" />
                  Complimentary worldwide delivery
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-champagne/70" aria-hidden="true" />
                  Certificate of authenticity
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}