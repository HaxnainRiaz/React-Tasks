'use client'

import React, { useState } from 'react'
import BlurCard from '@/Components/BlurCard'
import { SlideUpOnScroll } from '@/Components/AnimationWrapper'

export default function UseCases() {
  const [active, setActive] = useState('b2b')

  return (
    <div className="relative">
      <div
        className="max-w-[1200px] bg-no-repeat w-full mx-auto flex flex-col items-center space-y-16 justify-center"
        style={{
          backgroundImage: "url(/Images/4.png)",
          backgroundSize: "90%",
          backgroundPosition: "center 90%",
        }}
      >
        {/* Title */}
        <SlideUpOnScroll directionMode="up">
          <h1 className="text-white text-4xl font-bold mb-4">Use Cases</h1>
        </SlideUpOnScroll>

        {/* Toggle Buttons */}
        <SlideUpOnScroll directionMode="up" className="bg-[#ffffff25] rounded-full p-1">
          
            <div className="relative w-[320px] rounded-full overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full w-1/2 rounded-full transform transition-transform duration-300 ease-in-out
                  ${active === 'b2b' ? 'translate-x-0' : 'translate-x-full'}
                  bg-gradient-to-r from-[#FF842D] to-[#FF2D55]`}
              ></div>
              <div className="relative flex">
                <button
                  type="button"
                  onClick={() => setActive('b2b')}
                  className="relative z-10 flex-1 py-2 text-center text-white cursor-pointer"
                >
                  B2B
                </button>
                <button
                  type="button"
                  onClick={() => setActive('b2c')}
                  className="relative z-10 flex-1 py-2 text-center text-white cursor-pointer"
                >
                  B2C
                </button>
              </div>
            </div>
        </SlideUpOnScroll>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          <SlideUpOnScroll directionMode="up" className="flex gap-4 ">
            <BlurCard
              text="Mitigate fraud through verified digital identities."
              image="/Images/image 4522.png"
              className="flex-col text-white font-bold text-xl max-h-[500px] h-full"
            />
            <BlurCard
              text="Build trust with secure and transparent verification."
              image="/Images/image 4525.png"
              className="flex-col text-white font-bold text-xl max-h-[500px] h-full"
            />
            <BlurCard
              text="Simplify signups across financial, gaming, and service platforms with Astra KYC."
              image="/Images/Browser App V2 10.png"
              className="flex-col-reverse gap-y-8 text-white font-bold text-xl max-h-[500px] h-full"
            />
          </SlideUpOnScroll>

          <SlideUpOnScroll directionMode="up" className="flex gap-4">
            <BlurCard
              text="Support financial institutions, exchanges, and fintechs in meeting regulatory standards."
              image="/Images/3d-cash-money-Photoroom 1.png"
              className=" text-white font-bold text-xl max-h-[200px] h-full"
            />
            <BlurCard
              text="Automate compliance and reduce operational overhead."
              image="/Images/image 4527.png"
              className="text-white font-bold text-xl max-h-[200px] h-full"
            />
          </SlideUpOnScroll>
        </div>
      </div>

      {/* Background decorations */}
      <div>
        <img className="absolute left-0 top-0" src="/Images/5.png" alt="" />
        <img className="absolute right-0 top-[50%]" src="/Images/6.png" alt="" />
      </div>
    </div>
  )
}
