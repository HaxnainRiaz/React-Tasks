'use client'
import React from 'react'

const CurveCard = ({title ,img}) => {
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen bg-[#222]">
                <div className="relative w-[302px] h-[402px]">
                    <div className="absolute top-0 left-0 w-[302px] h-[402px] bg-[#383838]" style={{
                        WebkitClipPath: "path('M20,0 H227 Q247,0 247,20 V35 Q252,52 277,50 H282 Q302,46 302,70 V382 Q302,402 282,402 H20 Q0,402 0,382 V20 Q0,0 20,0 Z')",
                        clipPath: "path('M20,0 H227 Q247,0 247,20 V35 Q252,52 277,50 H282 Q302,46 302,70 V382 Q302,402 282,402 H20 Q0,402 0,382 V20 Q0,0 20,0 Z')",
                    }}>
                        <div className="absolute top-[1px] left-[1px] w-[300px] h-[400px]" style={{
                            background: "linear-gradient(150deg, #4A261F, #181717, #03030C, #03030C)",
                            WebkitClipPath: "path('M20,0 H225 Q245,0 245,20 V35 Q250,52 275,50 H280 Q300,46 300,70 V380 Q300,400 280,400 H20 Q0,400 0,380 V20 Q0,0 20,0 Z')",
                            clipPath: "path('M20,0 H225 Q245,0 245,20 V35 Q250,52 275,50 H280 Q300,46 300,70 V380 Q300,400 280,400 H20 Q0,400 0,380 V20 Q0,0 20,0 Z')",
                        }}>
                            <div className=''>
                                <div className=' relative space-4-3 p-6 flex flex-col items-center justify-center'>
                                    <img className='w-[180px] h-[350px]' src={img} alt="" />
                                    <div className='w-full h-full absolute bg-gradient-to-b from-[#ffffff09] to-[#000000] '>
                                    </div>
                                    <h2 className='text-white p-6 text-center bottom-[5%] absolute text-2xl'>
                                        {title}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-[1%] right-[3%] flex items-center justify-center w-10 h-10 rounded-full border border-[#828282] bg-[#00000024]">
                        <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.2595 4.89031L20.363 6.45536M20.363 6.45536L4.89332 16.9168M20.363 6.45536L18.7979 14.5588" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurveCard
