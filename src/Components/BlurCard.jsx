import React from 'react'

const BlurCard = ({ image, text, className, heading }) => {
    return (
        <>
            <div className={` w-full bg-[#FFFFFF0D] space-y-8 p-6 backdrop-blur-2xl flex ${className} items-center justify-center`}>
                <img className='' src={image} alt="" />
                <div className='flex flex-col-reverse items-center gap-3'>
                <p className="text-center line-clamp-3">
                    {text}
                </p>
                <h1 className='text-white text-2xl font-bold' >
                    {heading}
                </h1>
                </div>
            </div>
        </>
    )
}

export default BlurCard