import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { SectionDivider } from "@/components/SectionDivider";
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
        <SectionDivider label="The Savage Edit" print="zebra" />
        <ProductShowcase />
        <SectionDivider label="The Private Atelier" print="leopard" />
        <AtelierSection />
        <SectionDivider label="The Inner Circle" print="python" />
        <ConciergeSection />
      </main>
      <Footer />
      <SectionDivider label="Maison Savage" print="zebra" />

      <MobileMenu />
      <SearchOverlay />
      <QuickViewModal />
      <CartDrawer />
    </>
  );
}