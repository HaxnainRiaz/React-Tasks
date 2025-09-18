'use client'

import { useState } from 'react';
import HeroSection from "@/app/LandingPage/HeroSection";
import UseCases from '@/app/LandingPage/UseCases';
import ProductFeatures from '@/app/LandingPage/ProductFeatures';
// import Banner from '@/Components/Banner';
import TechnologySolution from '@/app/LandingPage/TechnologySolution';
import Solutions from '@/app/LandingPage/Solutions';
import ThreeDViewer from '@/app/LandingPage/ThreeDViewer';

export default function Home() {
  // const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <>
      {/* {bannerVisible && (
        <Banner onAnimationComplete={() => setBannerVisible(false)} />
      )} */}

      {/* Website content behind the banner */}
      <div className="relative z-0 ">
        <HeroSection />
      <ThreeDViewer/>
        <UseCases />
        <ProductFeatures />
        <TechnologySolution />
        <Solutions/>
      </div>
    </>
  );
}
