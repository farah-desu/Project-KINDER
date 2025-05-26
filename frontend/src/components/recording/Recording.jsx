import React from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const Recording = () => {
    const [sitterid, setsitterid] = React.useState(0)
    const [expert, setExpert] = React.useState('')   
    const [data, setData] = React.useState([])
    const handleInput = (e) => {
        e.preventDefault();
        const data = {
            id: sitterid,
            names: expert
        }
        axios.post('http://localhost:3001/api/recording', data)
        .then((res)=>{
            setData(res.data)
        })
    }
  return (
    <div style={{ background: '#081b29' }} className='w-screen min-h-screen overflow-auto py-4 justify-center items-center flex flex-col gap-4'>

        <motion.div 
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='flex justify-center items-center font-bold text-5xl text-white '
        >Lets see who is taking care of your angel</motion.div>
        <form onSubmit={handleInput}>
        <div className='w-screen h-16 flex justify-center items-center gap-4 px-4 mt-4' >
            <motion.input 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}  
            transition={{ duration: 1, }}
            type="text" placeholder='Enter id' className='w-1/3 h-10 rounded-md border-2 border-gray-300 p-2'
            value={sitterid} onChange={(e)=>setsitterid(e.target.value)}
             />
            {/* <motion.input 
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}  
            transition={{ duration: 1}}
            type="text" placeholder='Enter name' className='w-1/3 h-10 rounded-md border-2 border-gray-300 p-2'
            value={topic} onChange={(e)=>setTopic(e.target.value)} /> */}
            <motion.input 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}  
            transition={{ duration: 1}}
            type="text" placeholder='Enter name' className='w-1/3 h-10 rounded-md border-2 border-gray-300 p-2'
            value={expert} onChange={(e)=>setExpert(e.target.value)} />
        </div>
        <div className=' rounded text-center font-bold py-6'><button className='hover:scale-105 hover:shadow-xl duration-300 ease-in-out cursor-pointer text-white' >SUBMIT</button></div>
        </form>
        {/* link card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 w-full">
  {data.map((i, index) => {
    // Extract YouTube video ID
    const match = i.link.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = match ? match[1] : null;
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : '';
    
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out`}
      >
        {videoId && (
          <img
            src={thumbnailUrl}
            alt="YouTube thumbnail"
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
        )}
        <h2 className="text-lg font-bold text-white mb-1">{i.name}</h2>
        {/* <p className="text-sm text-white mb-1"><span className="font-semibold">Expert:</span> {i.names}</p>
        <p className="text-sm text-white mb-3"><span className="font-semibold">Course:</span> {i.course}</p> */}
        <a 
          href={i.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Watch Now
        </a>
      </motion.div>
    );
  })}
</div>

    </div>
    
  )
}

export default Recording


