import React from 'react'

const Footer = () => {
    const d = new Date();
    let year = d.getFullYear();
  return (
    <div className='bg-zinc-800 lg:text-2xl md:text-4xl text-3xl lg:mt-8 lg:p-3 p-4 border-t-1 border-black text-white flex justify-center items-center lg:h-[50px]'> 
        <p className="">
        &copy; Visiontrek Communication {year}-{year + 1}
        </p>
    </div>
  )
}

export default Footer;