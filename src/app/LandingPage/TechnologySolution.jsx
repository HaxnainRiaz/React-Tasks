import Link from "next/link";
import React from "react";


const Card = ({ img, title, viewAllbtn, heding, positionImage, left }) => {
  return (
    <div className='relative col-span-1 bg-[#171717] space-y-4 flex flex-col justify-between border border-[#ffffff2d] py-4 px-6 rounded-xl'>
      <div className={`space-y-2 ${positionImage? 'pt-12 md:pt-24' : ''} `}>
        {
          positionImage?
          <img className={`absolute top-0 ${left? 'right-0 md:left-0' : 'right-0'}`} src={positionImage} alt="" />
          :
          ''
        }
        {
          img ?
            <img src={img} className="h-[90px]" alt="" />
            :
            ''
        }
        {
          title ?
            <h2 className="text-2xl text-[white] max-w-[160px] font-medium">
              {title}
            </h2>
            :
            ''
        }
        {
          heding ?
            <p className="text-xs text-[#737373] line-clamp-5">
              {heding}
            </p>
            :
            ''
        }
      </div>
      {
        viewAllbtn ?
          <div className="flex justify-end">
            <Link href='/solutions'>
              <svg width="60" height="25" viewBox="0 0 73 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <foreignObject x="-49.658" y="-42.8594" width="142.682" height="114.02"></foreignObject><path data-figma-bg-blur-radius="50" d="M12.132 8.49L7.434 21H5.058L0.342 8.49H2.538L6.246 18.894L9.972 8.49H12.132ZM14.892 9.768C14.52 9.768 14.208 9.642 13.956 9.39C13.704 9.138 13.578 8.826 13.578 8.454C13.578 8.082 13.704 7.77 13.956 7.518C14.208 7.266 14.52 7.14 14.892 7.14C15.252 7.14 15.558 7.266 15.81 7.518C16.062 7.77 16.188 8.082 16.188 8.454C16.188 8.826 16.062 9.138 15.81 9.39C15.558 9.642 15.252 9.768 14.892 9.768ZM15.9 11.082V21H13.848V11.082H15.9ZM27.6841 15.798C27.6841 16.17 27.6601 16.506 27.6121 16.806H20.0341C20.0941 17.598 20.3881 18.234 20.9161 18.714C21.4441 19.194 22.0921 19.434 22.8601 19.434C23.9641 19.434 24.7441 18.972 25.2001 18.048H27.4141C27.1141 18.96 26.5681 19.71 25.7761 20.298C24.9961 20.874 24.0241 21.162 22.8601 21.162C21.9121 21.162 21.0601 20.952 20.3041 20.532C19.5601 20.1 18.9721 19.5 18.5401 18.732C18.1201 17.952 17.9101 17.052 17.9101 16.032C17.9101 15.012 18.1141 14.118 18.5221 13.35C18.9421 12.57 19.5241 11.97 20.2681 11.55C21.0241 11.13 21.8881 10.92 22.8601 10.92C23.7961 10.92 24.6301 11.124 25.3621 11.532C26.0941 11.94 26.6641 12.516 27.0721 13.26C27.4801 13.992 27.6841 14.838 27.6841 15.798ZM25.5421 15.15C25.5301 14.394 25.2601 13.788 24.7321 13.332C24.2041 12.876 23.5501 12.648 22.7701 12.648C22.0621 12.648 21.4561 12.876 20.9521 13.332C20.4481 13.776 20.1481 14.382 20.0521 15.15H25.5421ZM43.0235 11.082L39.9455 21H37.7855L35.7875 13.674L33.7895 21H31.6295L28.5335 11.082H30.6215L32.6915 19.056L34.7975 11.082H36.9395L38.9555 19.02L41.0075 11.082H43.0235Z" fill="#737373" />
                <path d="M66.3334 10.918L71.0557 15.5013M71.0557 15.5013H55.9446M71.0557 15.5013L66.3334 20.0846" stroke="#737373" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <defs>
                  <clipPath id="bgblur_0_6576_2649_clip_path" transform="translate(49.658 42.8594)"><path d="M12.132 8.49L7.434 21H5.058L0.342 8.49H2.538L6.246 18.894L9.972 8.49H12.132ZM14.892 9.768C14.52 9.768 14.208 9.642 13.956 9.39C13.704 9.138 13.578 8.826 13.578 8.454C13.578 8.082 13.704 7.77 13.956 7.518C14.208 7.266 14.52 7.14 14.892 7.14C15.252 7.14 15.558 7.266 15.81 7.518C16.062 7.77 16.188 8.082 16.188 8.454C16.188 8.826 16.062 9.138 15.81 9.39C15.558 9.642 15.252 9.768 14.892 9.768ZM15.9 11.082V21H13.848V11.082H15.9ZM27.6841 15.798C27.6841 16.17 27.6601 16.506 27.6121 16.806H20.0341C20.0941 17.598 20.3881 18.234 20.9161 18.714C21.4441 19.194 22.0921 19.434 22.8601 19.434C23.9641 19.434 24.7441 18.972 25.2001 18.048H27.4141C27.1141 18.96 26.5681 19.71 25.7761 20.298C24.9961 20.874 24.0241 21.162 22.8601 21.162C21.9121 21.162 21.0601 20.952 20.3041 20.532C19.5601 20.1 18.9721 19.5 18.5401 18.732C18.1201 17.952 17.9101 17.052 17.9101 16.032C17.9101 15.012 18.1141 14.118 18.5221 13.35C18.9421 12.57 19.5241 11.97 20.2681 11.55C21.0241 11.13 21.8881 10.92 22.8601 10.92C23.7961 10.92 24.6301 11.124 25.3621 11.532C26.0941 11.94 26.6641 12.516 27.0721 13.26C27.4801 13.992 27.6841 14.838 27.6841 15.798ZM25.5421 15.15C25.5301 14.394 25.2601 13.788 24.7321 13.332C24.2041 12.876 23.5501 12.648 22.7701 12.648C22.0621 12.648 21.4561 12.876 20.9521 13.332C20.4481 13.776 20.1481 14.382 20.0521 15.15H25.5421ZM43.0235 11.082L39.9455 21H37.7855L35.7875 13.674L33.7895 21H31.6295L28.5335 11.082H30.6215L32.6915 19.056L34.7975 11.082H36.9395L38.9555 19.02L41.0075 11.082H43.0235Z" />
                  </clipPath></defs>
              </svg>
            </Link>
          </div>
          :
          ''
      }
    </div>
  )
}




const TechnologySolution = () => {

  return (
    <div className="w-full py-12 sm:py-20 px-4 sm:px-6 md:px-8 relative z-30">
      <div className="max-w-[1100px] mx-auto w-full space-y-10 md:space-y-12">
        <div className='space-y-3'>
          <div className='flex items-center justify-center'>
            <div className='rounded-full p-[1px] bg-gradient-to-r from-[#FFB37F] to-[#FF7B0D]'>
              <div className='bg-[#3E2514] px-3 py-1 rounded-full'>
                <p className="font-medium text-xs bg-gradient-to-r from-[#FF842D] to-[#FF2D55] bg-clip-text text-transparent">
                  Solutions
                </p>
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-white text-center !mt-6">
            Technology Solutions
          </h2>
          <p className='max-w-[600px] mx-auto text-center text-sm text-[#737373]'>Astra delivers scalable, secure, and compliant Web3 infrastructure with multi-chain, AI-driven, and advanced security solutions</p>
        </div>
        <div className="space-y-4 lg:space-y-8 relative">
          <div className="space-y-4 lg:space-y-0 lg:grid grid-cols-2 lg:grid-cols-4 gap-6 md:flex-row flex-col lg:h-[290px]">
            <Card title='Hello i am first div' img='/Images/lockimage.svg' viewAllbtn />
            <div className="col-span-2 rounded-xl bg-[radial-gradient(circle_at_center,#855156_30%,#7E4557_60%,#42202B)]">
              <h2 className="text-2xl md:text-4xl px-3 py-6 font-medium text-center text-white">
                Next-Gen Tech <br /> Solutions
              </h2>
            </div>
            <Card title='Multi-Chain Support' img='/images/multisport.png' heding='Supports Ethereum, Binance Smart Chain, Polygon, Solana, and other major networks to enable seamless and flexible asset management across ecosystems' />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 md:flex-row flex-col lg:h-[290px]">
          <div className="flex-1 w-full flex flex-col space-y-4 lg:space-y-6">
            <div className="py-8 md:py-0 border flex-[5] border-[#ffffff2d] bg-[#171717] text-center rounded-xl flex flex-col gap-6 justify-center items-center">
              <h2 className="text-2xl font-medium bg-gradient-to-r from-[#FF7477] via-[#FEA58E] to-[#FF7477] bg-clip-text text-transparent  ">
                Compliance
              </h2>
              <div className="p-[1px] rounded-md cursor-pointer" style={{
                background: "linear-gradient(182deg, #716E6E, #171717, #2B2A2A, #2B2A2A, #171717, #565555)",
              }}>
                <div className="rounded-md px-4 py-2.5 bg-[#1D1B1B]">
                  <p className="text-xs text-[#CECECE] font-medium">
                    AI-driven engine
                  </p>
                </div>
              </div>
            </div>
            <div className='py-8 md:py-0 flex-[3] bg-[#171717] flex justify-center items-center border border-[#ffffff2d] rounded-xl'>
              <div className="p-[1px] rounded-lg" style={{
                background: "linear-gradient(155deg , #FF2D55, #FF842D, #00000033, #FFFFFF33, #FF842D, #FF2D55) ",
              }}>
                <div className="bg-[#262626] rounded-lg ">
                  <Link href='/solutions' className="px-8 py-2 text-white block">
                    View All
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Card left positionImage='/images/Group 1321315024.png' title='Layer-2 Blockchain' img='/images/Group 1321315023.png' heding='Fast, low-cost, and scalable transactions for wallets, exchanges, and payments — with full security.' />
          <Card positionImage='/images/Group 1321315021.png' title='AI Compliance Engine' img='/images/Group 1321315023.png' heding='FaReal-time identity verification, fraud detection, and transaction monitoring with advanced AI.' />
          <div className='relative flex-1 space-y-3 bg-[#171717] flex flex-col justify-between border border-[#ffffff2d] p-6 rounded-xl'>
            <div className="space-y-3">
              <h2 className="text-lg font-medium text-white">
                End-to-End Encryption
              </h2>
              <p className="text-xs text-[#737373] line-clamp-4">
                Military-grade encryption and zero-trust policies secure every transaction, identity, and interaction
              </p>
            </div>
            <div className="flex items-center justify-end">
              <img className="h-[110px]" src="/images/Shield 3D asset FREE 6.png" alt="" />
            </div>
          </div>
        </div>
        <img className="absolute z-30 left-[49.65%] top-[47.6%] -translate-x-[50%] -translate-y-[50%] h-[340px] hidden lg:block" src="/images/Group 1321315108.png" alt="" />
        <img className="z-40 h-[230px] absolute left-[49.65%] top-[47.6%] -translate-x-[50%] -translate-y-[50%] hidden lg:block" src="/images/positionrounded.svg" alt="" />
      </div>
    </div>
  );
};
export default TechnologySolution;
