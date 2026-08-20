export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function bodyScrollLock(locked: boolean): void {
  if (typeof document === "undefined") return;
  document.body.style.overflow = locked ? "hidden" : "";
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function printTextureClass(print: string): string {
  switch (print) {
    case "cheetah":
      return "print-texture print-cheetah";
    case "leopard":
      return "print-texture print-leopard";
    case "python":
      return "print-texture print-python";
    case "zebra":
      return "print-texture print-zebra";
    case "jaguar":
      return "print-texture print-jaguar";
    default:
      return "";
  }
}