"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, XCircle } from "lucide-react";
import { AnimalTexture, textureFor } from "@/components/textures";
import { isEmailValid, cn } from "@/lib/utils";
import type { ConciergeFormState } from "@/data/types";

const INITIAL: ConciergeFormState = {
  email: "",
  status: "idle",
  message: "",
};

export function ConciergeSection() {
  const [form, setForm] = useState<ConciergeFormState>(INITIAL);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.status === "submitting" || form.status === "success") return;
    const email = form.email.trim();
    if (!isEmailValid(email)) {
      setForm({
        ...form,
        status: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }
    setForm({ ...form, status: "submitting", message: "" });
    window.setTimeout(() => {
      setForm({
        email: "",
        status: "success",
        message:
          "Bienvenue. Your private concierge will contact you shortly.",
      });
    }, 1100);
  };

  return (
    <section
      id="concierge"
      className="relative scroll-mt-24 overflow-hidden bg-obsidian py-20 sm:py-28"
    >
      <AnimalTexture name="spots" className="text-champagne/20" opacity={0.05} />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative gold-etched-bright bg-obsidian-soft p-[1.5px]"
        >
          <AnimalTexture name="stripes" className="text-champagne/60 inset-0" opacity={0.06} />
          <div className="relative border border-champagne/20 bg-obsidian-soft px-8 py-12 text-center sm:px-14 sm:py-16">
            <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border border-champagne/40 text-champagne">
              <Mail className="h-6 w-6" strokeWidth={1.25} aria-hidden="true" />
            </span>
            <p className="mx-auto mb-3 flex items-center justify-center gap-3 text-[0.65rem] font-medium uppercase tracking-luxe text-champagne">
              <span className="inline-block h-px w-8 bg-champagne/50" />
              The Private Concierge
              <span className="inline-block h-px w-8 bg-champagne/50" />
            </p>
            <h2 className="font-serif text-3xl font-light leading-tight text-cream sm:text-4xl lg:text-5xl">
              Enter the Savage Inner Circle
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/60">
              Private appointments, first access to icons, and a concierge on
              call around the clock. Share a dress size and your nearest City of
              Light.
            </p>

            <form onSubmit={submit} className="mx-auto mt-8 max-w-md" noValidate>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="concierge-email">
                  Email address
                </label>
                <input
                  id="concierge-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, email: e.target.value, status: "idle", message: "" }));
                  }}
                  placeholder="your@email.com"
                  className={cn(
                    "min-w-0 flex-1 border bg-black/60 px-4 py-3.5 text-sm text-cream outline-none transition-colors placeholder:text-cream/30",
                    form.status === "error"
                      ? "border-red-400/70"
                      : "border-cream/25 focus:border-champagne"
                  )}
                />
                <button
                  type="submit"
                  disabled={form.status === "submitting"}
                  className="inline-flex items-center justify-center gap-2 border border-champagne bg-champagne px-7 py-3.5 text-[0.65rem] font-semibold uppercase tracking-luxe text-black transition-all duration-300 hover:bg-transparent hover:text-champagne disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {form.status === "submitting" ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              <div role="alert" aria-live="polite" className="mt-4 min-h-[1.5rem]">
                <AnimatePresence mode="wait">
                  {form.status === "error" && (
                    <motion.p
                      key="err"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2 text-xs text-red-300"
                    >
                      <XCircle className="h-4 w-4" aria-hidden="true" />
                      {form.message}
                    </motion.p>
                  )}
                  {form.status === "success" && (
                    <motion.p
                      key="ok"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2 text-xs text-champagne"
                    >
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      {form.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>

            <p className="mt-4 text-[0.6rem] uppercase tracking-luxe text-cream/35">
              By invitation · Zero spam · Unsubscribe anytime
            </p>
            <AnimalTexture name={textureFor("cheetah")} className="text-champagne/40" opacity={0.08} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}