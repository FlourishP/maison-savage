"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById } from "@/data/products";
import type { CartItem, FilterCategory, Product } from "@/data/types";
import { bodyScrollLock } from "@/lib/utils";

interface StoreValue {
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  subtotal: number;
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  quickView: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  activeFilter: FilterCategory;
  setActiveFilter: (filter: FilterCategory) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const CART_KEY = "ms-cart";
const WISHLIST_KEY = "ms-wishlist";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

function loadWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(WISHLIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  useEffect(() => {
    const t = window.setTimeout(() => {
      setCart(loadCart());
      setWishlist(loadWishlist());
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    bodyScrollLock(cartOpen || menuOpen || searchOpen || quickView !== null);
    return () => bodyScrollLock(false);
  }, [cartOpen, menuOpen, searchOpen, quickView]);

  const addToCart = useCallback(
    (product: Product, size: string, quantity = 1) => {
      const key = `${product.id}::${size}`;
      setCart((prev) => {
        const existing = prev.find((item) => item.key === key);
        if (existing) {
          return prev.map((item) =>
            item.key === key
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { key, productId: product.id, size, quantity }];
      });
      setQuickView(null);
      setCartOpen(true);
      setMenuOpen(false);
      setSearchOpen(false);
    },
    []
  );

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((item) => item.key !== key)
        : prev.map((item) => (item.key === key ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const openCart = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuickView(null);
    setCartOpen(true);
  }, []);

  const closeCart = useCallback(() => setCartOpen(false), []);

  const openMenu = useCallback(() => {
    setCartOpen(false);
    setSearchOpen(false);
    setQuickView(null);
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const openSearch = useCallback(() => {
    setCartOpen(false);
    setMenuOpen(false);
    setQuickView(null);
    setSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const openQuickView = useCallback((product: Product) => {
    setCartOpen(false);
    setMenuOpen(false);
    setSearchOpen(false);
    setQuickView(product);
  }, []);

  const closeQuickView = useCallback(() => setQuickView(null), []);

  const { cartCount, subtotal } = useMemo(() => {
    let count = 0;
    let total = 0;
    for (const item of cart) {
      count += item.quantity;
      const product = getProductById(item.productId);
      if (product) total += product.price * item.quantity;
    }
    return { cartCount: count, subtotal: total };
  }, [cart]);

  const value = useMemo<StoreValue>(
    () => ({
      cart,
      wishlist,
      cartCount,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isWishlisted,
      toggleWishlist,
      cartOpen,
      openCart,
      closeCart,
      menuOpen,
      openMenu,
      closeMenu,
      searchOpen,
      openSearch,
      closeSearch,
      quickView,
      openQuickView,
      closeQuickView,
      activeFilter,
      setActiveFilter,
    }),
    [
      cart,
      wishlist,
      cartCount,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isWishlisted,
      toggleWishlist,
      cartOpen,
      openCart,
      closeCart,
      menuOpen,
      openMenu,
      closeMenu,
      searchOpen,
      openSearch,
      closeSearch,
      quickView,
      openQuickView,
      closeQuickView,
      activeFilter,
      setActiveFilter,
    ]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return ctx;
}