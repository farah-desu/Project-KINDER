import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCircleChevronDown } from "react-icons/fa6";
import videoBg from './../../assets/background.mp4';
import { toast, Toaster } from 'react-hot-toast';

const Postlink = () => {
  const name = localStorage.getItem('userName');
  const email = localStorage.getItem('userEmail');
  const id = localStorage.getItem('userId');

  // Form data states
  const [course, setCourse] = useState('');
  const [section, setSection] = useState('');
  const [parentid, setparentid] = useState(0);
  const [parentname, setparentname] = useState('');
  const [link, setLink] = useState('');

  // UI toggle states
  const sittername = localStorage.getItem('userName');
  const sitterid = localStorage.getItem('userId');
  const [joinShown, setJoinShown] = useState(false);
  const [PARENTINFO, setPARENTINFO] = useState(false);
  const [linkInputShown, setLinkInputShown] = useState(false);

  const [data, setData] = useState([]);


  // Submit form handler
  const handleLinkSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/meetlink', {
        sitterid, sittername,  link, parentid, parentname });
        
      if (res.status === 200) {
        toast.success('Link submitted successfully!');
        // Optionally reset form here
      }
    } catch (error) {
      console.error('Error submitting link:', error);
      toast.error('Failed to submit link. Please try again.');
    }
  };
  const clearlinks = async () => {
    try{
      const res = await axios.post('http://localhost:3000/api/clearlinks', { id, name, course, section });
      if (res.status === 200) {
        toast.success('Links cleared successfully!');
      }
    }
    catch (error) {
      console.error('Error clearing links:', error);
      toast.error('Failed to clear links. Please try again.');
    }}
  return (
    <div className="relative w-full min-h-screen grid grid-cols-1 md:grid-cols-2 justify-center items-center px-10 py-10 gap-10">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover -z-10">
        <source src={videoBg} type="video/mp4" />
      </video>

      {/* Left Panel */}
      <div className="grid grid-cols-1 gap-10">

        {/* Select Course */}
        {/* <ToggleSection title="Select your course" toggle={courseShown} setToggle={setCourseShown}>
          {[...new Set(data.map(i => i.course))].map((courseName, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              onClick={() => setCourse(courseName)}
              className="text-2xl uppercase font-semibold hover:text-yellow-400 transition"
            >
              {courseName}
            </motion.button>
          ))}
        </ToggleSection> */}

        {/* Select Section */}
        {/* <ToggleSection title="Select your section" toggle={sectionShown} setToggle={setSectionShown}>
          {[...new Set(data.map(i => i.section))].map((sectionName, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSection(sectionName)}
              className="text-2xl font-semibold hover:text-yellow-400 transition"
            >
              {sectionName}
            </motion.button>
          ))}
        </ToggleSection> */}

        {/* parentid Input */}
        <ToggleSection title="Identify parent id" toggle={joinShown} setToggle={setJoinShown}>
          <textarea
            value={parentid}
            onChange={(e) => setparentid(e.target.value)}
            className="w-full h-24 p-2 bg-slate-400/20 font-bold rounded-md"
            placeholder="Enter the parent id..."
          />
        </ToggleSection> 

        {/* Class Context Input */}
        <ToggleSection title="Identify parent name" toggle={PARENTINFO} setToggle={setPARENTINFO}>
          <textarea
            value={parentname}
            onChange={(e) => setparentname(e.target.value)}
            className="w-full h-24 p-2 bg-slate-400/20 font-bold rounded-md"
            placeholder="ENTER THE CHILDREN'S NAME..."
          />
        </ToggleSection>
      </div>

      {/* Right Panel (Link Input)} */}
      {PARENTINFO && joinShown && (
        <div className="h-1/2 flex flex-col justify-center items-center">
          <div className="bg-slate-400/20 p-8 rounded-xl shadow-lg backdrop-blur-md">
            <button
              className="flex items-center gap-2 text-3xl uppercase font-bold hover:text-gray-300 transition"
              onClick={() => setLinkInputShown(!linkInputShown)}
            >
              Paste the link
              <motion.div animate={{ rotate: linkInputShown ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <FaCircleChevronDown size={32} />
              </motion.div>
            </button>

            <AnimatePresence>
              {linkInputShown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 flex flex-col justify-start items-start gap-4"
                >
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full h-24 p-2 bg-slate-400/20 font-bold rounded-md"
                    placeholder="Paste meet/class link here..."
                  />
                  <button
                    className="text-2xl font-semibold bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
                    onClick={handleLinkSubmit}
                  >
                    Submit
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button className='text-white' onClick={()=>clearlinks()}>clear the links</button>
        </div>
      )}
    </div>
  );
};

// Helper component to avoid code duplication
const ToggleSection = ({ title, toggle, setToggle, children }) => (
  <div className="w-full bg-slate-400/20 p-8 rounded-xl shadow-lg backdrop-blur-md">
    <button
      className="flex items-center gap-2 text-3xl uppercase font-bold hover:text-gray-300 transition"
      onClick={() => setToggle(!toggle)}
    >
      {title}
      <motion.div animate={{ rotate: toggle ? 180 : 0 }} transition={{ duration: 0.3 }}>
        <FaCircleChevronDown size={32} />
      </motion.div>
    </button>
    <AnimatePresence>
      {toggle && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="mt-6 flex flex-col justify-start items-start gap-4"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default Postlink;
