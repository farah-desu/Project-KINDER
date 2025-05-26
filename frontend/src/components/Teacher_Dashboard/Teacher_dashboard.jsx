import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import './Teacher_dashboard.css';
import Blurry_sidebar from './Blurry_sidebar';

const Teacher_dashboard = () => {
  const teacher_name=localStorage.getItem('userName');
  const teacher_email=localStorage.getItem('userEmail');
  const teacher_id=localStorage.getItem('userId');
  const [isOpen, setIsOpen] = useState(false);

  const sidebaropener = () => {
    setIsOpen(prev => !prev); // toggle the sidebar
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className='w-screen h-screen overflow-hidden relative' style={{ background: 'black' }}>
      {/* Top Bar */}
      <div className='absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-black z-30'>
        <button onClick={sidebaropener}>
          <VscLayoutSidebarLeft className='text-white text-3xl' />
        </button>
      </div>

      {/* 3D Background */}
      <div className='w-full h-full flex justify-center items-center'>
        <iframe
          src='https://my.spline.design/particlenebula-rWy58n5JfPxlST2LHaWZGVN4/'
          frameBorder='0'
          width='100%'
          height='100%'
        ></iframe>

        <motion.div 
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className='text-4xl font-extrabold text-white absolute'
        >
          Welcome to dashboard {teacher_name}
        </motion.div>
      </div>

      {/* Blur Sidebar */}
      <Blurry_sidebar isOpen={isOpen} />

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-20"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};

export default Teacher_dashboard;
