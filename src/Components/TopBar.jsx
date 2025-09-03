'use client'

import React from 'react'

const LiItem = ({ liItem }) => {
    return (
        <h1 className="text-[#FFFFFF] cursor-pointer">
            {liItem}
        </h1>
    )
}

const listArray = [
    'Home',
    'Products',
    'Features',
    'Solutions',
    'Partners',
    'Blog',
    'Contact',
]


const TopBar = () => {
    return (
        <>
            <section className="max-w-[1550px] mx-auto w-full fixed ">
                <div className="flex items-center justify-between border-b border-[#393534]">
                    <div className="flex items-center gap-3 py-4 px-12 border-r border-[#393534]">
                        <span className='w-8 h-8'>
                        <img src="/Images/1.png" alt="" />
                        </span>
                        <h1 className='text-white text-[25px]'>
                            Astra
                        </h1>
                    </div>
                    <div className="flex items-center gap-12 border-r border-[#393534] py-6  pr-16 ">
                        {
                            listArray.map((itm, index) => (
                                <LiItem key={index} liItem={itm} />
                            ))
                        }
                        <div className="flex gap-3 items-center">
                            <span className='w-8 h-8'>
                            <img src="/images/2.gif" alt="" />
                            </span>
                            <h1 className="text-[#FFFFFF] cursor-pointer whitespace-nowrap">
                                Crypto News
                            </h1>
                        </div>
                    </div>
                    <div className="flex gap-3 py-2 items-center px-6">
                        <div className="flex gap-4 px-4 py-2.5 cursor-pointer bg-[#1C1D22] backdrop-filter-blur items-center rounded-lg">
                            <h1 className="text-white">Loading...</h1>
                        </div>
                        <div>
                            <h1 className="px-6 py-2.5 cursor-pointer whitespace-nowrap bg-[#E0E0E0] rounded-lg">
                                Download Now
                            </h1>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TopBar
