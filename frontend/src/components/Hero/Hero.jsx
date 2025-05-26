import React from 'react'
import Heroimg from "../../assets/Hero.png"
import { GrPlay } from "react-icons/gr";
import { motion, spring } from 'framer-motion';
import { Slideright } from '../../utility/Animation';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <>
      <div className='container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative bg-white'>
        <div className='flex flex-col justify-center py-14 md:pr-16 xl:pr-40 md:py-0'>
          <div className='text-center md:text-left space-y-6'>
            <motion.p 
            // variants={Slideright(0.4)}
            initial={{opacity :0, x:-100}}
            animate={{opacity:1,x:0}}
            transition={ {duration:0.5,delay:1.4}}
            className='text-orange-600 uppercase font-semibold'>100% satifaction level</motion.p>
            <motion.h1 
            initial={{opacity :0, x:-100}}
            animate={{opacity:1,x:0}}
            transition={ {duration:0.5,delay:1.6}}
            className='text-5xl font-bold lg:text-6xl leading-tight'>Find Your Perfect <span className='text-primary'>Caretaker</span></motion.h1>
            <motion.p
            initial={{opacity :0, x:-100}}
            animate={{opacity:1,x:0}}
            transition={ {duration:0.5,delay:1.8}}
            className='text font-semibold'>We help you find perfect caretaker for 1-on-1 nourishment. It is completely private and caring for your needs</motion.p>
            <motion.div 
            initial={{opacity :0, x:-100}}
            animate={{opacity:1,x:0}}
            transition={ {duration:0.5,delay:2}}className='flex justify-start gap-8'>
            <Link to={'/Dashboard'}><button className='primary-btn'>Get started</button></Link>
            <button className='flex justify-end items-center gap-2 font-semibold'>
            <span className='w-10 h-10 bg-secondary/15 rounded-full flex justify-center items-center'>
            <GrPlay className='text-secondary'/>  
            </span>See How It Works
            </button>
            </motion.div>
            
          </div>
        </div>

        <div className='felx justify-center items-center py-12'>
          <motion.img 
          initial={{opacity:0, x:200}}
          animate={{opacity:1,x:0}}
          transition={{type:"spring", stiffness:100 ,delay:1.3}}
          src={Heroimg} 
          alt="" 
          className='w-[450px] md:w-[650px] xl:w[700px]' />
        </div>
      </div>
    </>
  )
}

export default Hero