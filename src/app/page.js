'use client'

import { useState } from 'react';
import HeroSection from "@/app/LandingPage/HeroSection";
import UseCases from '@/app/LandingPage/UseCases';
import ProductFeatures from '@/app/LandingPage/ProductFeatures';
import TechnologySolutions from '@/app/LandingPage/TechnologySolutions';
import Banner from '@/Components/Banner';

export default function Home() {
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <>
      {bannerVisible && (
        <Banner onAnimationComplete={() => setBannerVisible(false)} />
      )}

      {/* Website content behind the banner */}
      <div className="relative z-0">
        <HeroSection />
        <UseCases />
        <ProductFeatures />
        <TechnologySolutions />
      </div>
    </>
  );
}
