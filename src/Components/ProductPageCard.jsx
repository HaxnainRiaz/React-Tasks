import React from 'react'

const ProductCard = ({image, Para, Head2, className }) => {
    return (
        <div className="w-full mx-auto px-4 py-6 rounded-xl relative bg-gradient-to-r from-[#0E0E17] to-[#111119]">
            <span className={`${className} absolute left-[50%] -translate-x-[50%] -translate-y-[60%]`}>
                <img className='bg-amber-500 h-[250px] w-[250px] object-cover ' src={image} alt="" />
            </span>
            <p className="text-xl text-center text-white pt-20">
                {Para}
                <span
                    className="text-4xl p-2 bg-gradient-to-r from-[#FF842D] to-[#FF2D55] bg-clip-text text-transparent">
                    {Head2}
                </span>
            </p>
        </div>
    )
}

export default ProductCard
