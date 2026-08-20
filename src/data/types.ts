export type Category =
  | "Women's Runway"
  | "Men's Tailoring"
  | "Handbags & Shoes"
  | "Intimates & Lingerie"
  | "High Jewelry"
  | "Everyday Essentials";

export type AnimalPrintType =
  | "cheetah"
  | "leopard"
  | "python"
  | "zebra"
  | "jaguar"
  | "none";

export interface Product {
  id: string;
  title: string;
  category: Category;
  price: number;
  image: string;
  hoverImage: string;
  animalPrintType: AnimalPrintType;
  description: string;
  sizes: string[];
  details: string[];
  featured?: boolean;
  material: string;
}

export interface CartItem {
  key: string;
  productId: string;
  size: string;
  quantity: number;
}

export type FilterCategory = "All" | Category;

export interface Slide {
  id: number;
  kicker: string;
  title: string;
  copy: string;
  cta: string;
  image: string;
  print: AnimalPrintType;
}

export interface ConciergeFormState {
  email: string;
  status: "idle" | "submitting" | "success" | "error";
  message: string;
}