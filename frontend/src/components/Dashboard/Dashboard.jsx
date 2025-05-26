import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdQuiz } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsRecord2 } from "react-icons/bs";
import { MdOutlineSubscriptions } from "react-icons/md";
import { RiFeedbackLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const name = localStorage.getItem('userName');
  const id = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [link, setLink] = useState('');

  // Fetch link on component mount
  useEffect(() => {
    const fetchLink = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/getlink', {name,id});
       if (response.status === 200) {
  console.log("Fetched link:", response.data.link);  // ✅ log it
  setLink(response.data.link);
}
      } catch (error) {
        console.error("Failed to fetch link:", error);
      }
    };

    fetchLink();
  }, [name, id]);

  return (
    <div className='w-screen h-screen overflow-hidden' style={{ background: 'black' }}>
      <div className='absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-black z-10'>
        <button onClick={() => navigate('/Dashboard/Findsitter')} className='text-purple-800 font-bold flex items-center gap-2'>Find a baby sitter <MdQuiz /></button>
        <button
  onClick={() => {
    if (link ) {
      window.open(link, '_blank');
    } else {

      alert(`No valid link available. Please wait or try again. Link: ${link}`);
    }
  }}
  className='text-purple-800 font-bold flex items-center gap-2'
>
  See your kid <SiGoogleclassroom />
</button>
        <button onClick={() => navigate('./Recording')} className='text-purple-800 font-bold flex items-center gap-2'>See your sitter's previous experience <BsRecord2 className='text-2xl' /></button>
        <button onClick={() => navigate('./Payment')} className='text-purple-800 font-bold flex items-center gap-2'>Renew Subscription <MdOutlineSubscriptions /></button>
        
      </div>

      <div className='w-full h-full flex justify-center items-center'>
        <iframe
          src='https://my.spline.design/greetingrobot-Pvgs7b6nCSIeZjZlHiQznAPJ/'
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
          Welcome to dashboard {name}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
