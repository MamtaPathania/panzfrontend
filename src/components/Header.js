import React from 'react'
import Img from '../assets/toonflix.webp'
function Header() {
  return (
    <div className='flex justify-center items-center bg-black lg:h-[80px] h-[70px] '>
        <img src={Img} alt="toonflix" className='lg:h-[50px] lg:w-[190px] h-[35px] m-6 lg:m-0 text-center'/>
      
    </div>
  )
}

export default Header
