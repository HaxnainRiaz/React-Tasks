'use client'
import React from 'react'

export const ProductCard = ({ image, Para, Head2, className }) => {
  return (
    <div className="w-full mx-auto px-4 py-10 rounded-xl relative bg-gradient-to-r from-[#0E0E17] to-[#111119]">
      <span className={`${className} absolute left-[50%] -translate-x-[40%] w-full -translate-y-[60%]`}>
        <img className="h-[250px] w-[250px]" src={image} alt="" />
      </span>
      <p className="text-xl text-center text-white pt-36">
        {Para}
        <span className="text-4xl p-2 bg-gradient-to-r from-[#FF842D] to-[#FF2D55] bg-clip-text text-transparent">
          {Head2}
        </span>
      </p>
    </div>
  )
}

export const ProductCard2 = ({ image1, Para, image, className1, className, head }) => {
  return (
    <div
      className="max-w-[300px] w-full mx-auto p-[1px] rounded-xl"
      style={{
        background:
          "linear-gradient(to bottom right, #FF2D55 0%, #FF842D 16.6%, #00000033 33.2%, #FFFFFF33 49.8%, #FF842D 66.4%, #FF2D55 83%, #FF2D55 100%",
      }}
    >
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#0E0E17] to-[#111119]">
        <span className={`${className} absolute left-[50%] -translate-x-[40%] w-full -translate-y-[60%]`}>
          <img className="h-[250px] w-[250px]" src={image} alt="" />
        </span>
        <h1 className="text-white text-2xl">{head}</h1>
        <p className="text-md text-center text-white pt-36">
          {Para}
          <span>
            <span className={`${className1} absolute left-[50%] -translate-x-[40%] w-full -translate-y-[60%]`}>
              <img src={image1} alt="" />
            </span>
          </span>
        </p>
      </div>
    </div>
  )
}
