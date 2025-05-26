import React, { useState } from 'react';
import { Navbar_menu } from '../../main_data/maindata';
import { GrPersonalComputer,GrMenu } from "react-icons/gr";
import {motion} from "framer-motion";
import Mobileview from './Mobileview';
import { Link } from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
const Navbar = () => {
    const [isOpen,setIsOpen] =useState(false)
  return (
    <>
    <nav> 
        <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration: 1, delay: 1}}
        className='container flex justify-between items-center py-6 bg-white'>
            <div className='text-2xl flex items-center gap-2 font-bold '>
                <GrPersonalComputer className='text-3xl text-secondary' />
                <p>KINDER</p>
            </div>
            <div className='hidden lg:block'>
                <ul className='flex items-center gap-12'>
                    {Navbar_menu.map((i)=>{
                        return(
                            <li key={i.id}>
                                <Link to={i.link} className='inline-block text-gray-600 text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-secondary transition-all duration-600 font-semibold'>{i.title}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className='hidden lg:block space-x-4'>
                <Link to={'/SignIn'}><button className='font-semibold'>Sign-in</button></Link>
                <button className='text-white bg-secondary font-semibold rounded-full px-6 py-2'>Register</button>
            </div>
            <div className='lg:hidden' onClick={()=>setIsOpen(!isOpen)}>
                <GrMenu className='text-3xl text-red-400'/>
            </div>
        </motion.div>
    </nav>
    <Mobileview isOpen={isOpen}/>
    
    </>
  );
};

export default Navbar