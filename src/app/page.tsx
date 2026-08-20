import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { ProductShowcase } from "@/components/ProductShowcase";
import { AtelierSection } from "@/components/AtelierSection";
import { ConciergeSection } from "@/components/ConciergeSection";
import { Footer } from "@/components/Footer";
import { MobileMenu } from "@/components/MobileMenu";
import { SearchOverlay } from "@/components/SearchOverlay";
import { QuickViewModal } from "@/components/QuickViewModal";
import { CartDrawer } from "@/components/CartDrawer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSlider />
        <ProductShowcase />
        <AtelierSection />
        <ConciergeSection />
      </main>
      <Footer />

      <MobileMenu />
      <SearchOverlay />
      <QuickViewModal />
      <CartDrawer />
    </>
  );
}