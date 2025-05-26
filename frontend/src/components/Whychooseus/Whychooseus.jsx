import React from "react";
import { GrYoga } from "react-icons/gr";
import { GiGymBag } from "react-icons/gi";
import { FaDumbbell } from "react-icons/fa";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, staggerChildren: 0.3 }, // Staggering effect
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const Whychooseus = () => {
  return (
    <div className="bg-white">
      <div className="text-center py-20">
        <h1 className="uppercase text-xl font-semibold text-orange-500">
          Why choose us
        </h1>
        <p className="text-3xl font-bold max-w-[500px] space-y-4 text-center p-4 mx-auto mb-5">
          Benefits of baby-sitting services with us
        </p>
      </div>

      <motion.div
        className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={containerVariants}
      >
        {[{ icon: <GrYoga />, color: "#0063ff" },
          { icon: <FaDumbbell />, color: "#33FF00" },
          { icon: <GiGymBag />, color: "#FF5733" },
          { icon: <GiGymBag />, color: "#a569bd" }].map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="space-y-4 p-6 rounded-xl shadow-[0_0_22px_rgba(0,0,0,0.15)]"
          >
            <div
              style={{ backgroundColor: item.color }}
              className="text-3xl text-white w-10 h-10 rounded-lg flex justify-center items-center"
            >
              {item.icon}
            </div>
            <p className="font-bold">care and love while hadling the kid</p>
            <p className="font-semibold">
              All of our experts have a mastery in hadling children.
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Whychooseus;


//motion div