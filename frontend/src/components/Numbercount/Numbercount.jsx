import React from 'react'
import CountUp from 'react-countup';
const Numbercount = () => {
  return (
    <div className='bg-secondary text-white py-12 '>
        <div className='container grid grid-cols-2 md:grid-cols-4 gap-8 '>
        <div className='flex flex-col justify-center items-center'>
            <p className='text text-3xl font-bold'>
                <CountUp 
                start={0}
                end={876}
                duration={3}
                enableScrollSpy={true}
                scrollSpyOnce={true}
                />
            </p>
            <p className='text font-semibold '>
                Expert caretakers
            </p>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <p className='text text-3xl font-bold'><CountUp 
                start={0}
                end={20000}
                suffix='+'
                separator=''
                duration={3}
                enableScrollSpy={true}
                scrollSpyOnce={true}
                /></p>
            <p className='text font-semibold '>
                Hours of Recorded stream to parents
            </p>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <p className='text text-3xl font-bold '><CountUp 
                start={0}
                end={298}
                duration={3}
                enableScrollSpy={true}
                scrollSpyOnce={true}
                /></p>
            <p className='text font-semibold '>
                Families beleiving in us
            </p>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <p className='text text-3xl font-bold'><CountUp 
                start={0}
                end={10000}
                suffix='+'
                separator=','
                duration={3}
                enableScrollSpy={true}
                scrollSpyOnce={true}
                /></p>
            <p className='text font-semibold '>
                Active job doing parents taking our help
            </p>
        </div>
        </div>
    </div>
  );
};

export default Numbercount