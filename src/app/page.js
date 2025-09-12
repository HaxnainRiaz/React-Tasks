import Image from "next/image";
import HeroSection from "@/app/LandingPage/HeroSection";
import UseCases from '@/app/LandingPage/UseCases'
import ProductFeatures from '@/app/LandingPage/ProductFeatures'
import TechnologySolutions from '@/app/LandingPage/TechnologySolutions'
import ChatWidget from '@/app/LandingPage/ChatBot'
export default function Home() {
  return (
    <>
      <HeroSection/>
      <UseCases/>
      <ProductFeatures/>
      <TechnologySolutions/>
      <ChatWidget/>
    </>
  );
}
