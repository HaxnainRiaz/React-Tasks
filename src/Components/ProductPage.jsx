import React from 'react'
import ProductCard from './ProductPageCard'

const ProductPage = () => {
  return (
    <div className="max-w-[950px] mx-auto w-full flex gap-y-48 flex-col">
      <div className="w-full flex pt-28 justify-center ">
        <h1 className="text-[22px] text-white">
          rtyuiop
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {/* <ProductCard head1='Get Started with Astra' /> */}
        <ProductCard image='/Images/5.png' Para='Begin Your Trusted Digital Identity Experience with' Head2='Astra' />
      </div>
    </div >
  )
}

export default ProductPage
