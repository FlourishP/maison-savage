"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimalTexture } from "@/components/textures";

const CRAFT_IMAGES: { src: string; alt: string; label: string; sub: string }[] = [
  {
    src: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80",
    alt: "Python leather hand-burnished in the maison atelier",
    label: "The Leather Atelier",
    sub: "Python embossed by hand, burnished to a mirror gold.",
  },
  {
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
    alt: "Animal-motif jacquard silk being woven",
    label: "The Looms",
    sub: "Jacquard silk woven with animal motifs on 1920s looms.",
  },
];

const STATS = [
  { value: "40", label: "Master artisans in Paris" },
  { value: "9", label: "Weeks to finish one icon piece" },
  { value: "1964", label: "Year the maison was founded" },
  { value: "1", label: "Pair of hands per bespoke object" },
];

export function AtelierSection() {
  return (
    <section
      id="atelier"
      className="relative scroll-mt-24 overflow-hidden bg-obsidian-soft py-20 sm:py-28"
    >
      <AnimalTexture name="scales" className="text-champagne/20" opacity={0.04} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-4 flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-luxe text-champagne">
              <span className="inline-block h-px w-10 bg-champagne/50" />
              The Private Atelier
            </p>
            <h2 className="font-serif text-4xl font-light leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
              Craft, not{" "}
              <span className="gold-gradient-text italic">production</span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-cream/70 sm:text-base">
              Every Maison Savage object passes through forty pairs of hands and
              a single signature. Nothing leaves the atelier until the head
              artisan is satisfied — which is rarely on the first day.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-px bg-cream/10 sm:grid-cols-4 lg:grid-cols-2">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-obsidian-soft p-5">
                  <p className="font-serif text-4xl font-light text-champagne">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[0.6rem] uppercase tracking-luxe text-cream/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {CRAFT_IMAGES.map((img, i) => (
              <motion.figure
                key={img.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className={`group relative overflow-hidden border border-cream/10 ${
                  i === 1 ? "sm:mt-12" : ""
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <AnimalTexture name="rosettes" className="text-champagne/40" opacity={0.1} />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-serif text-xl font-light text-cream">
                      {img.label}
                    </p>
                    <p className="mt-1 text-xs text-cream/60">{img.sub}</p>
                  </figcaption>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}