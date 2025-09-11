'use client'
import React from 'react'
import BlurCard from '@/Components/BlurCard'
const TechnologySolutions = () => {
    return (
        <>
            <div
                className="relative py-20 bg-no-repeat w-full bg-cover bg-center h-full"
                style={{
                    backgroundImage: "url(/Images/8.png)",
                }}
            >
                <div className="max-w-[1100px] bg-no-repeat w-full mx-auto flex flex-col items-center space-y-16 justify-center">
                    <h1 className="text-white text-4xl font-bold">Technology Solutions</h1>
                    <div className="flex items-center gap-4">
                        <div className='flex gap-4'>
                            <BlurCard text="All-in-one platform with KYC, Wallet, Exchange, Rewards, and Pay in one seamless flow." image="/Images/Vector.png" heading="Unified Ecosystem" className=" text-[16px] text-[#CCCCCC] flex-col py-12 " />
                        </div>
                        <div className=' text-[16px] text-[#CCCCCC] flex flex-col gap-4'>
                            <BlurCard text="Global regulatory standards with decentralized identity — secure, trusted, and user-owned." heading="Secure & Compliant" image="/Images/9.png" className=" text-[16px] text-[#CCCCCC] flex-col py-12" />
                            <BlurCard text="From startups to enterprises — easy APIs and native connections for effortless growth." heading="Seamless Integration" image="/Images/Vector (1).png" className=" text-[16px] text-[#CCCCCC] flex-col flex-1 py-12" />
                        </div>
                        <div className=' text-[16px] text-[#CCCCCC] flex gap-4'>
                            <BlurCard text="Onboard with KYC, store in Wallet, trade, earn, and spend — all in one ecosystem." heading="Unified Financial Flow" image="/Images/Group.png" className=" text-[16px] text-[#CCCCCC] flex-col flex-1 py-12 " />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TechnologySolutions
