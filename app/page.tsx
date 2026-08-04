import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MarketPrices from "@/components/MarketPrices";
import News from "@/components/News";
import Programs from "@/components/Programs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <MarketPrices />
      <News />
      <Programs />
      <Footer />
    </main>
  );
}
