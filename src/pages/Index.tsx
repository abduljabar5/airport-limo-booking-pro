
import Hero from "@/components/Hero";
import PriceEstimator from "@/components/PriceEstimator";
import AboutUs from "@/components/AboutUs";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import Fleet from "@/components/Fleet";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <PriceEstimator />
      <AboutUs />
      <HowItWorks />
      <Services />
      <Fleet />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
