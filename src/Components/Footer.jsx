'use client'

import React from 'react'
const ListItms = ({liItem}) => {
    return(
        <h1 className="text-[#FFFFFF] cursor-pointer">
            {liItem}
        </h1>
    )
}
const ListArray = [
    'Home',
    'Partners',
    'Features',
    'Solutions'
]
const Footer = () => {
    return (
        <>
            <div className='max-w-[800px] flex w-full mx-auto justify-between'>
                <div className='space-y-4'>
                <div
                    className="bor1 flex w-full p-[2px] rounded-lg"
                    style={{
                        background: "linear-gradient(to bottom right, #7C7C7F, #14141D, #1F1F27 80%, #7C7C7F)"
                    }}
                >
                    <div className='w-full bg-gradient-to-br from-[#34343A] to-[#0B0B13] p-8 flex rounded-lg items-center gap-4 justify-between'>
                        <div className='flex items-center gap-4'>
                            <span>
                                <img className="w-16 h-16" src="/images/image 11.svg" alt="" />
                            </span>
                            <h1 className="text-white text-[25px]">
                                App coming soon
                            </h1>
                        </div>
                        <div className='flex gap-4'>
                            <div className='rounded-full p-[1px]' style={{
                                background: "linear-gradient(to bottom right, #CFCFCF, #919191, #7F7F7F, #CFCFCF)"
                            }}>
                                <div className='bg-gradient-to-br from-[#1F1F27] to-[#15151D] p-4 rounded-full'>
                                    <span className=''>
                                        <svg className='w-12 h-12' viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17 14.6726C16.5359 15.7135 16.3123 16.1783 15.7145 17.0987C14.8807 18.3828 13.703 19.9828 12.2455 19.9965C10.951 20.0078 10.6184 19.1442 8.85974 19.1544C7.10224 19.1635 6.73591 20.0124 5.44025 19.9999C3.98278 19.9862 2.86692 18.5419 2.032 17.2567C-0.301978 13.6658 -0.545827 9.44994 0.893664 7.20791C1.91625 5.61587 3.53104 4.68406 5.04807 4.68406C6.59319 4.68406 7.56521 5.54087 8.84176 5.54087C10.0812 5.54087 10.8364 4.68179 12.6231 4.68179C13.9716 4.68179 15.4032 5.4261 16.4224 6.71018C13.0827 8.56131 13.6243 13.384 17 14.6726ZM11.2679 3.24771C11.9163 2.40453 12.4096 1.2159 12.2309 0C11.1701 0.0738631 9.93065 0.755677 9.20585 1.64544C8.5496 2.45226 8.00684 3.64884 8.21697 4.81247C9.37441 4.84769 10.5723 4.14884 11.2679 3.24771Z" fill="white" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className='flex rounded-full p-[1px]' style={{
                                background: "linear-gradient(to bottom right, #CFCFCF, #919191, #7F7F7F, #CFCFCF)"
                            }}>
                                <div className='bg-gradient-to-br from-[#1F1F27] to-[#15151D] p-4 rounded-full'>
                                    <span className=''>
                                        <svg className='w-12 h-12' viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.1202 0.508333L14.0372 6.79667L11.6972 9.14083L3.1202 0.508333ZM0.85845 0L10.8795 10L0.859282 20C0.349369 19.7742 0 19.2717 0 18.6875C0 18.6683 0 18.6492 0.000831831 18.6308V18.6333V1.3675C0 1.35167 0 1.3325 0 1.31333C0 0.729167 0.349369 0.226667 0.850132 0.00416667L0.859282 0.000833333L0.85845 0ZM17.4302 8.82833C17.7746 9.08417 17.995 9.49083 17.995 9.94833C17.995 9.96667 17.995 9.98417 17.9942 10.0025V10C17.9975 10.0358 18 10.0783 18 10.1208C18 10.5508 17.792 10.9325 17.471 11.1692L17.4676 11.1717L15.1277 12.4992L12.5939 10L15.1285 7.46083L17.4302 8.82833ZM3.1202 19.4917L11.698 10.8592L14.038 13.2033L3.1202 19.4917Z" fill="white" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <h1 className='text-16 text-white'>
                        © 2025 ASTRA. All rights reserved.
                    </h1>
                </div>
                </div>
                <div className='space-y-7'>
                    {
                        ListArray.map((itm, index) => (
                            <ListItms key = {index} liItem={itm} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Footer
