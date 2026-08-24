"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Heart, Plus } from "lucide-react";
import { useStore } from "@/context/StoreProvider";
import type { Product } from "@/data/types";
import { formatCurrency, cn, printTextureClass } from "@/lib/utils";
import { printLabel } from "@/components/textures";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart, openQuickView, isWishlisted, toggleWishlist } = useStore();
  const wished = isWishlisted(product.id);
  const defaultSize = product.sizes.includes("One Size")
    ? "One Size"
    : product.sizes.includes("M")
      ? "M"
      : product.sizes[0];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: Math.min(index % 4, 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col border border-[#D4AF37]/30 bg-charcoal transition-colors duration-500 hover:border-champagne/60"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-obsidian">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.08] group-hover:opacity-0"
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.hoverImage}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <span className="absolute inset-x-3 bottom-3 inline-flex w-max max-w-[calc(100%-1.5rem)] border border-[#D4AF37]/40 bg-black/70 px-2.5 py-1.5 font-label-sm uppercase tracking-luxe text-champagne backdrop-blur-sm">
            {product.animalPrintType === "none"
              ? `Detail · ${product.category}`
              : `${printLabel(product.animalPrintType)} · Macro`}
          </span>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 opacity-[0.05]",
            printTextureClass(product.animalPrintType)
          )}
        />

        {product.featured && (
          <span className="absolute left-3 top-3 border border-champagne/40 bg-black/60 px-2.5 py-1 font-label-sm uppercase tracking-luxe text-champagne backdrop-blur-sm">
            Maison Icon
          </span>
        )}

        <button
          type="button"
          aria-label={wished ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
          aria-pressed={wished}
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 bg-black/50 text-cream/80 backdrop-blur-sm transition-all duration-300 hover:border-champagne/60 hover:text-champagne"
        >
          <Heart
            className={cn("h-4.5 w-4.5 transition-transform duration-300", wished && "scale-110")}
            strokeWidth={1.25}
            fill={wished ? "currentColor" : "none"}
            aria-hidden="true"
          />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => addToCart(product, defaultSize)}
            className="flex w-full items-center justify-center gap-2 border border-champagne bg-champagne/95 px-4 py-3 font-label-sm uppercase tracking-luxe text-black transition-colors hover:bg-champagne"
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            Add to Bag
          </button>
        </div>

        <button
          type="button"
          aria-label={`Quick view ${product.title}`}
          onClick={() => openQuickView(product)}
          className="absolute right-3 top-16 flex h-10 w-10 translate-x-3 items-center justify-center border border-cream/15 bg-black/50 text-cream/70 opacity-0 backdrop-blur-sm transition-all duration-500 ease-out hover:border-champagne/60 hover:text-champagne group-hover:translate-x-0 group-hover:opacity-100"
        >
          <Eye className="h-4.5 w-4.5" strokeWidth={1.25} aria-hidden="true" />
        </button>
      </div>

      <div className="relative flex flex-1 flex-col gap-1.5 p-4">
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 opacity-[0.06]",
            printTextureClass(product.animalPrintType)
          )}
        />
        <div className="relative flex flex-1 flex-col gap-1.5">
          <p className="font-label-sm uppercase tracking-luxe text-champagne/70">
            {product.category} · {printLabel(product.animalPrintType)}
          </p>
          <h3 className="font-display-xl text-headline-md font-light leading-snug text-cream transition-colors group-hover:text-champagne">
            {product.title}
          </h3>
          <p className="font-body-md text-cream/70">{formatCurrency(product.price)}</p>
        </div>
      </div>
    </motion.article>
  );
}