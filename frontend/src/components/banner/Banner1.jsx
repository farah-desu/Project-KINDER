import React from 'react';
import Bannerimg from "../../assets/banner1.png";
import Bannerimg1 from "../../assets/banner2.png";
import { motion } from 'framer-motion';

// Variants for container
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Variants for texts
const textFadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

// Variants for images
const imageZoomIn = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};


const Banner1 = () => {
  return (
    <motion.div
      className="container grid grid-cols-1 md:grid-cols-2 items-center gap-20 py-20 bg-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* First Image */}
      <motion.div className="w-[450px] h-full" initial="hidden" whileInView={'visible'} variants={imageZoomIn} transition={{ type: 'spring', stiffness: 100 }}>
        <img src={Bannerimg} alt="Banner" />
      </motion.div>

      {/* First Text Block */}
      <motion.div className="space-y-6" initial="hidden" whileInView={'visible'} variants={containerVariants}>
        <motion.h1 className="text-orange-400 font-semibold text-xl" variants={textFadeUp}>
          CUSTOMIZE WITH YOUR SCHEDULE
        </motion.h1>
        <motion.p className="text-3xl font-bold" variants={textFadeUp}>
          Personalized Professional baby sitters on Your Schedule
        </motion.p>
        <motion.p className="text-gray-500" variants={textFadeUp}>
          Our scheduling system allows you to select based on your free time. Lorem ipsum demo text for template. Keep track of our students class and service schedules, and never miss your jobs oppurtunities. The best online baby sitting booking system with easy accessibility. Lorem ipsum is a placeholder text commonly used.
        </motion.p>
        <motion.div variants={textFadeUp}>
          <button className="primary-btn">Get Started</button>
        </motion.div>
      </motion.div>

      {/* Second Text Block */}
      <motion.div className="space-y-6"  initial="hidden" whileInView={'visible'} variants={containerVariants} >
        <motion.h1 className="text-orange-400 font-semibold text-xl" variants={textFadeUp}>
          CUSTOMIZE WITH YOUR SCHEDULE
        </motion.h1>
        <motion.p className="text-3xl font-bold" variants={textFadeUp}>
          Talented and Qualified baby sitters to Serve You for Help
        </motion.p>
        <motion.p className="text-gray-500" variants={textFadeUp}>
          Our scheduling system allows you to select based on your free time. Lorem ipsum demo text for template. Keep track of our students class and service schedules, and never miss your jobs oppurtunities. The best online baby sitting booking system with easy accessibility. Lorem ipsum is a placeholder text commonly used.
        </motion.p>
        <motion.div variants={textFadeUp}>
          <button className="primary-btn">Get Started</button>
        </motion.div>
      </motion.div>

      {/* Second Image */}
      <motion.div className="w-[450px] h-full" initial="hidden" whileInView={'visible'} variants={imageZoomIn} transition={{ type: 'spring', stiffness: 100 }}>
        <img src={Bannerimg1} alt="Banner" />
      </motion.div>
    </motion.div>
  );
};

export default Banner1;