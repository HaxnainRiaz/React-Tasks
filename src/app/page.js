import Image from "next/image";
import HeroSection from "@/app/LandingPage/HeroSection";
import UseCases from '@/app/LandingPage/UseCases'
import ProductFeatures from '@/app/LandingPage/ProductFeatures'
import TechnologySolutions from '@/app/LandingPage/TechnologySolutions'
export default function Home() {
  return (
    <>
      <HeroSection/>
      <UseCases/>
      <ProductFeatures/>
      <TechnologySolutions/>
    </>
  );
}
