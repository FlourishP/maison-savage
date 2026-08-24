"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { HERO_SLIDES } from "@/data/products";
import { AnimalTexture, textureFor, printLabel } from "@/components/textures";
import { cn } from "@/lib/utils";

const SLIDE_DURATION = 6000;

export function HeroSlider() {
  const n = HERO_SLIDES.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const hoverRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (next: number, dir = 1) => {
      setDirection(dir);
      setIndex(((next % n) + n) % n);
      setProgressKey((k) => k + 1);
    },
    [n]
  );

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % n);
    setProgressKey((k) => k + 1);
  }, [n]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + n) % n);
    setProgressKey((k) => k + 1);
  }, [n]);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(next, SLIDE_DURATION);
    return () => window.clearInterval(t);
  }, [paused, index, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const slide = HERO_SLIDES[index];

  return (
    <section
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-obsidian"
      aria-roledescription="carousel"
      aria-label="Winter 26 collection highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      ref={hoverRef}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={slide.id === 1}
              sizes="100vw"
              className="object-cover object-center"
              style={{ filter: "brightness(0.82) contrast(1.05) saturate(0.9)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            <AnimalTexture
              name={textureFor(slide.print)}
              className="text-champagne/70"
              opacity={0.16}
            />
          </div>

          <div
            className={cn(
              "absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-20 sm:pb-24 lg:px-8"
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <p className="mb-4 flex items-center gap-3 font-label-sm uppercase tracking-luxe text-champagne">
                <span className="inline-block h-px w-10 bg-champagne/60" />
                {slide.kicker}
              </p>
              <h2 className="font-display-xl font-light leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
                {slide.title}
              </h2>
              <p className="mt-5 max-w-md font-body-lg text-cream/80 sm:text-base">
                {slide.copy}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  className="group relative inline-flex items-center gap-3 border border-champagne/70 px-8 py-3.5 font-label-sm uppercase tracking-luxe text-champagne transition-all duration-300 hover:border-champagne hover:bg-champagne hover:text-black"
                >
                  {slide.cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </button>
                <span className="font-label-sm uppercase tracking-luxe text-cream/50">
                  {printLabel(slide.print)} motif
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 right-6 z-10 flex items-center gap-4 sm:right-8">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={prev}
          className="flex h-12 w-12 items-center justify-center border border-cream/20 text-cream/70 transition-all hover:border-champagne/60 hover:text-champagne"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={next}
          className="flex h-12 w-12 items-center justify-center border border-cream/20 text-cream/70 transition-all hover:border-champagne/60 hover:text-champagne"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
          onClick={() => setPaused((p) => !p)}
          className="flex h-12 w-12 items-center justify-center border border-cream/20 text-cream/70 transition-all hover:border-champagne/60 hover:text-champagne"
        >
          {paused ? (
            <Play className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
          ) : (
            <Pause className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="absolute bottom-9 left-6 z-10 hidden flex-col items-start gap-2 font-manrope text-cream/70 sm:flex sm:left-8">
        <span className="text-display-xl font-light text-champagne">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-label-sm text-cream/40">
          / {String(n).padStart(2, "0")}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex gap-1.5 px-6 pb-1.5 sm:px-8">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            className="group pointer-events-auto relative h-6 w-full max-w-[120px] overflow-hidden"
          >
            <span className="pointer-events-none absolute inset-x-0 top-[calc(50%-1px)] h-[2px] bg-cream/15" />
            {i === index && (
              <motion.span
                key={progressKey}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: paused ? 1 : 0 }}
                transition={{
                  duration: paused ? 0.4 : SLIDE_DURATION / 1000,
                  ease: "linear",
                }}
                style={{ transformOrigin: "left" }}
                className="pointer-events-none absolute left-0 top-[calc(50%-1px)] h-[2px] w-full bg-champagne"
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}