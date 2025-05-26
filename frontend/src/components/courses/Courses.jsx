import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBook } from "react-icons/fa";
import { motion } from 'framer-motion';


const Courses = () => {
  const [data, setData] = useState([]);
  const colours = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];

  // Container animation (controls stagger)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  // Individual course animation
  const itemVariants = {
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then((res) => {
        const courses = res.data;
        const coursesWithColour = courses.map((course, index) => ({
          ...course,
          colour: colours[index % colours.length],
        }));
        setData(coursesWithColour);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='container py-14 md:py-24 bg-white'>
      <div className='text-center py-20'>
        <div className='text-orange-500 font-bold text-xl'>Our Services</div>
        <div className='text-gray-500 font-bold text-3xl'>Find someone to help no matter what!</div>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-5"
      >
        {data.map((i, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="border rounded-lg border-secondary flex justify-center items-center py-4 px-5 gap-2 hover:scale-105 hover:shadow-xl duration-300 ease-in-out cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-full flex justify-center items-center ${i.colour}`}>
              <FaBook />
            </div>
            <p>{i.course_name}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Courses;
