'use client'
import React from 'react'
import { ProductCard, ProductCard2 } from '@/Components/ProductPageCard'

const ProductPage = () => {
  return (
    <div className="max-w-[950px] mx-auto w-full flex gap-y-48 flex-col">
      <div className="w-full flex pt-28 justify-center ">
        <h1 className="text-[22px] text-white">rtyuiop</h1>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <ProductCard
          image="/Images/5.png"
          Para="Begin Your Trusted Digital Identity Experience with"
          Head2="Astra"
        />
        <ProductCard2
          image="/Images/6.png"
          head="For Individuals"
          Para="Take control of your digital identity—verify once, store it securely, and reuse it across services with ease."
          image1="/Images/8.png"
        />
      </div>
    </div>
  )
}

export default ProductPage
