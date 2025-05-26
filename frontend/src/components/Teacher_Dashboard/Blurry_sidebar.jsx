import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiGoogleclassroom } from "react-icons/si";
import { SiGooglemeet } from "react-icons/si";
import { FaCalendarAlt } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { MdQuestionMark } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
const Blurry_sidebar = ({ isOpen }) => {
const navigate = useNavigate();
  return (
    <div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 w-1/4 h-full z-40 bg-white/10 backdrop-blur-md shadow-lg border-r border-white/20"
          >
            <div className="text-xl font-semibold uppercase text-white py-10 flex flex-col gap-10 items-center">
              <button className='flex items-center gap-4' onClick={() => window.open('http://localhost:3000/', '_blank')}><SiGoogleclassroom className='text-xl'/> START TO STREAM</button>
              <button className='flex items-center gap-4' onClick={()=>navigate('/Teacher_dashboard/Postlink')}> <SiGooglemeet className='text-xl' />POST A LINK</button>
              <button className='flex items-center gap-4' onClick={()=>navigate('/Teacher_dashboard/Consultation')}><FaCalendarAlt className='text-xl'/>BOOKING REQUESTS</button>
              <button className='flex items-center gap-4' onClick={()=>navigate('/Teacher_dashboard/Updateinfo')}><FaMapMarkerAlt className='text-xl'/>update your information</button>
              <button className='flex items-center gap-4' onClick={()=>navigate('/Teacher_dashboard/Updatestat')}><GrStatusGood className='text-xl'/>update your status</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blurry_sidebar;
