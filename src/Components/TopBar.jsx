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
            <section className="max-w-[1550px] mx-auto w-full fixed z-60 ">
                <div className='flex items-center justify-between backdrop-blur-sm pt-2 px-12'>
                    <div>
                        <img src="/Images/image 11.png" alt="" />
                    </div>
                    <div className='flex gap-8 bg-[#ffffff25] px-8 py-4 rounded-full'>
                        <h1 className='text-[15px] text-white hover:underline underline-offset-3 cursor-pointer transition-all '>
                            Home
                        </h1>
                        <h1 className='text-[15px] flex items-center gap-1 text-white hover:underline underline-offset-3 cursor-pointer transition-all '>
                            Products
                            <span>
                                <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.00008 4.8012L0 0.960104L0.999843 0L4.5 3.36104L8.00016 0L9 0.960104L4.99992 4.8012C4.86732 4.92849 4.6875 5 4.5 5C4.3125 5 4.13268 4.92849 4.00008 4.8012Z" fill="white" />
                                </svg>
                            </span>
                        </h1>
                        <h1 className='text-[15px] text-white hover:underline underline-offset-3 cursor-pointer transition-all '>
                            Features
                        </h1>
                        <h1 className='text-[15px] text-white hover:underline underline-offset-3 cursor-pointer transition-all '>
                            Solutions
                        </h1>
                        <h1 className='text-[15px] text-white hover:underline underline-offset-3 cursor-pointer transition-all '>
                            Partners
                        </h1>
                        <h1 className='text-[15px] text-white hover:underline underline-offset-3 cursor-pointer transition-all '>
                            Blog
                        </h1>
                        <h1 className='text-[15px] text-white hover:underline underline-offset-3 cursor-pointer transition-all '>
                            Content
                        </h1>
                        <h1 className='text-[15px] flex gap-1 text-white hover:underline underline-offset-3 cursor-pointer transition-all '>
                            <span className=''>
                                <img className='w-6 h-6' src="/Images/2.gif" alt="" />
                            </span>
                            Crypto News
                        </h1>
                    </div>
                    <div>
                        <span>
                            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.22223 16C0.87593 16 0.585856 15.872 0.352004 15.616C0.118152 15.36 0.000819029 15.0435 4.21455e-06 14.6666C-0.0008106 14.2898 0.116523 13.9733 0.352004 13.7173C0.587486 13.4613 0.877559 13.3333 1.22223 13.3333H20.7778C21.1241 13.3333 21.4146 13.4613 21.6492 13.7173C21.8839 13.9733 22.0008 14.2898 22 14.6666C21.9992 15.0435 21.8818 15.3604 21.648 15.6173C21.4141 15.8742 21.1241 16.0018 20.7778 16H1.22223ZM1.22223 9.33332C0.87593 9.33332 0.585856 9.20532 0.352004 8.94932C0.118152 8.69332 0.000819029 8.37688 4.21455e-06 7.99999C-0.0008106 7.6231 0.116523 7.30666 0.352004 7.05066C0.587486 6.79466 0.877559 6.66666 1.22223 6.66666H20.7778C21.1241 6.66666 21.4146 6.79466 21.6492 7.05066C21.8839 7.30666 22.0008 7.6231 22 7.99999C21.9992 8.37688 21.8818 8.69377 21.648 8.95066C21.4141 9.20755 21.1241 9.3351 20.7778 9.33332H1.22223ZM1.22223 2.66666C0.87593 2.66666 0.585856 2.53866 0.352004 2.28266C0.118152 2.02666 0.000819029 1.71022 4.21455e-06 1.33333C-0.0008106 0.956443 0.116523 0.639999 0.352004 0.384C0.587486 0.128 0.877559 0 1.22223 0H20.7778C21.1241 0 21.4146 0.128 21.6492 0.384C21.8839 0.639999 22.0008 0.956443 22 1.33333C21.9992 1.71022 21.8818 2.02711 21.648 2.284C21.4141 2.54089 21.1241 2.66844 20.7778 2.66666H1.22223Z" fill="white" />
                            </svg>
                        </span>
                    </div>
                </div>
            </section>
        </>
    )
}
export default TopBar
