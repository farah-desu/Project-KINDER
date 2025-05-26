import React, { useState } from 'react'
import { motion } from 'framer-motion';
const Banner = () => {
    const [isOpen,setIsOpen] = useState(true)
    return (
    isOpen && (<motion.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration: 1, delay:1.5}}
    className='bg-primary text-sm text-center font-semibold p-1 hidden lg:block relative'>Are you an University Student or School fella up for parenting?
    <a href='#' className='text-secondary ml-2'>Talk to us</a> 
    <div className='absolute top-1/2 right-10 cursor-pointer -translate-y-1/2' onClick={()=>setIsOpen(false)}>
        X    
    </div> 
    </motion.div>)
);
};

export default Banner