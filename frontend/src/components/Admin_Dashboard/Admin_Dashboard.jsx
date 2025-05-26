import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import { MdQuiz } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsRecord2 } from "react-icons/bs";
import { SiCoursera } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { RiFeedbackLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import Admin_sidebar from './Admin_sidebar';


const Admin_Dashboard = () => {

    const navigate = useNavigate();
    return (
      <div className='w-screen  h-screen overflow-hidden' style={{ background: 'black' }}>
        <div className='absolute top-0 left-0 right-0 flex  justify-between items-center py-7 p-4 bg-black z-10'>
          <button onClick={() => navigate('/Admin_dashboard/Sitterapprove')} className='text-white font-bold flex items-center gap-2'>Approve a baby siiter <MdQuiz /></button>
          <button  onClick={()=>navigate('./Parentapprove')}className='text-white font-bold flex items-center gap-2'>Approve a parent <SiGoogleclassroom /></button>
          
        </div>
  
        <div className='w-full h-full flex justify-center items-center'>
        <iframe src='https://my.spline.design/robotfollowcursorforlandingpagemc-g9CaQA1DdoDxEixlkRrJYFNv/' frameborder='0' width='100%' height='100%'></iframe>
          <motion.div 
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className='text-4xl font-extrabold text-white absolute'
          >
            Welcome to Admin dashboard
          </motion.div>
        </div>
      </div>
    );
  };
  
  
  //<iframe src='https://my.spline.design/greetingrobot-Pvgs7b6nCSIeZjZlHiQznAPJ/' frameborder='0' width='100%' height='100%'></iframe>
  


export default Admin_Dashboard