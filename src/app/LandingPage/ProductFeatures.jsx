'use client'
import React from 'react'
import BlurCard from '@/Components/BlurCard'
import { SlideUpOnScroll } from '@/Components/AnimationWrapper'

const ProductFeatures = () => {
  return (
    <div className="relative pt-20">
      <div
        className="max-w-[800px] bg-no-repeat w-full mx-auto flex flex-col items-center space-y-16 justify-center"
        style={{
          backgroundImage: "url(/Images/Glossy.png)",
          backgroundSize: "50%",
          backgroundPositionY: "60%",
          backgroundPositionX: "50%",
        }}
      >
        {/* Heading */}
        <SlideUpOnScroll directionMode="up">
          <h1 className="text-white text-4xl font-bold">Product Features</h1>
        </SlideUpOnScroll>

        {/* Features Grid */}
        <div className="flex flex-col gap-4">
          {/* Row 1 */}
          <SlideUpOnScroll className="flex gap-4" directionMode="up">
            <BlurCard
              text="All-in-one platform with KYC, Wallet, Exchange, Rewards, and Pay in one seamless flow."
              image="/Images/image 4493.png"
              heading="Unified Ecosystem"
              className="text-[16px] text-[#CCCCCC] flex-col-reverse max-h-[400px] h-full"
            />
            <BlurCard
              text="Global regulatory standards with decentralized identity — secure, trusted, and user-owned."
              heading="Secure & Compliant"
              image="/Images/7.png"
              className="text-[16px] text-[#CCCCCC] flex-col max-h-[400px] h-full"
            />
          </SlideUpOnScroll>

          {/* Row 2 */}
          <SlideUpOnScroll className="flex gap-4 text-[16px] text-[#CCCCCC]" directionMode="up">
            <BlurCard
              text="From startups to enterprises — easy APIs and native connections for effortless growth."
              heading="Seamless Integration"
              image="/Images/image 4532.png"
              className="text-[16px] text-[#CCCCCC] flex-col flex-1 max-h-[400px] h-full max-w-[620px] w-full"
            />
            <BlurCard
              text="Onboard with KYC, store in Wallet, trade, earn, and spend — all in one ecosystem."
              heading="Unified Financial Flow"
              image="/Images/image 4530.png"
              className="text-[16px] text-[#CCCCCC] flex-col flex-1 max-h-[400px] h-full "
            />
          </SlideUpOnScroll>
        </div>
      </div>

      {/* Background decoration */}
      <div>
        <img className="absolute left-0 top-0" src="/Images/Layer 17.png" alt="" />
      </div>
    </div>
  )
}

export default ProductFeatures
