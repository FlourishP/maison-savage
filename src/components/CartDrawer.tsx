"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useStore } from "@/context/StoreProvider";
import { getProductById } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

const SHIPPING = 0;
const TAX_RATE = 0;

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
  } = useStore();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, closeCart]);

  const items = cart
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { item, product } : null;
    })
    .filter((x): x is { item: (typeof cart)[number]; product: NonNullable<ReturnType<typeof getProductById>> } => x !== null);

  const total = subtotal + SHIPPING + TAX_RATE * subtotal;

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping bag"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-champagne/20 bg-obsidian shadow-luxe"
          >
            <div className="flex items-center justify-between border-b border-cream/10 px-6 py-5">
              <h2 className="font-serif text-2xl font-light text-cream">
                Your Shopping Bag
                <span className="ml-2 text-sm text-cream/40">
                  ({items.reduce((n, x) => n + x.item.quantity, 0)})
                </span>
              </h2>
              <button
                type="button"
                aria-label="Close shopping bag"
                onClick={closeCart}
                className="flex h-11 w-11 items-center justify-center text-cream/70 transition-colors hover:text-champagne"
              >
                <X className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center border border-champagne/30 text-champagne">
                  <ShoppingBag className="h-7 w-7" strokeWidth={1.25} aria-hidden="true" />
                </span>
                <p className="font-serif text-xl font-light text-cream/80">
                  Your bag is empty
                </p>
                <p className="text-xs uppercase tracking-luxe text-cream/40">
                  The maison waits for no one
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-2 border border-champagne px-6 py-3 text-[0.65rem] font-semibold uppercase tracking-luxe text-champagne transition-all hover:bg-champagne hover:text-black"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-cream/5 overflow-y-auto px-6">
                  {items.map(({ item, product }) => (
                    <motion.li
                      key={item.key}
                      layout
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 24 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 py-5"
                    >
                      <div className="relative h-28 w-22 shrink-0 overflow-hidden bg-charcoal">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          sizes="112px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif text-base font-light leading-snug text-cream">
                            {product.title}
                          </h3>
                          <button
                            type="button"
                            aria-label={`Remove ${product.title} from bag`}
                            onClick={() => removeFromCart(item.key)}
                            className="flex h-9 w-9 shrink-0 items-center justify-center text-cream/40 transition-colors hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
                          </button>
                        </div>
                        <p className="mt-1 text-[0.6rem] uppercase tracking-luxe text-cream/40">
                          Size {item.size}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-cream/15">
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${product.title}`}
                              onClick={() => updateQuantity(item.key, item.quantity - 1)}
                              className="flex h-9 w-9 items-center justify-center text-cream/70 transition-colors hover:text-champagne"
                            >
                              <Minus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                            </button>
                            <span className="w-8 text-center text-sm text-cream" aria-live="polite">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase quantity of ${product.title}`}
                              onClick={() => updateQuantity(item.key, item.quantity + 1)}
                              className="flex h-9 w-9 items-center justify-center text-cream/70 transition-colors hover:text-champagne"
                            >
                              <Plus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                            </button>
                          </div>
                          <span className="font-serif text-base text-champagne">
                            {formatCurrency(product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                <div className="border-t border-cream/10 px-6 py-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-cream/60">
                      <span>Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-cream/40">
                      <span>Shipping</span>
                      <span>Complimentary</span>
                    </div>
                    <div className="flex justify-between border-t border-cream/10 pt-3 font-serif text-xl text-cream">
                      <span>Total</span>
                      <span className="text-champagne">{formatCurrency(total)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-5 flex w-full items-center justify-center gap-3 border border-champagne bg-champagne px-6 py-4 text-[0.7rem] font-semibold uppercase tracking-luxe text-black transition-all duration-300 hover:bg-transparent hover:text-champagne"
                  >
                    Proceed to Checkout
                  </button>
                  <p className="mt-4 text-center text-[0.6rem] uppercase tracking-luxe text-cream/40">
                    Duties and taxes calculated at checkout
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}