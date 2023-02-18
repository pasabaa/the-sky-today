import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Footer} from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

export const DailyImage = () => {

    const [data, setData] = useState([null])
    const [showData, setShowData] = useState(false);

    const boxAnimation = {
        initial: { y: "100%" },
        animate: { y: "0%" },
        exit: { y: "100%"},
        transition: { duration: 0.4, type: "tween"  }
      };

    const handleClick = () => {
        setShowData(!showData)
    }
 
    useEffect(()=> {

        const fetchData =  async () =>{
            try {

                const res = await axios.get('https://go-apod.herokuapp.com/apod');
                setData(res.data)
                
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();

    }, [])


  return (
    <div className='relative h-screen overflow-hidden'>
        <img className='relative object-cover w-full h-full scale-animation' src={data.url} alt={data?.title} />
        <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black backdrop-blur overflow-auto min-h-screen'>
        
                <div className='xl:w-4/12 lg:w-6/12 md:w-8/12 w-10/12 py-8 overflow-hidden'>
                    {!showData &&
                    <img className='object-cover rounded-lg w-full' src={data.url} alt={data?.title} />
                    }
                    <div className='mt-4 flex w-full gap-3 z-50'>
                        <a download={data?.title} href={data?.hdurl} className='text-sm text-white rounded-lg max-w-max'>Download</a>
                        <button onClick={handleClick} className='text-sm text-white rounded-lg max-w-max'>{showData ? 'Hidden details' : 'Show details'}</button>
                    </div>
                 <AnimatePresence>
                    
                        {showData &&
                        <motion.div {...boxAnimation} className='mt-6 text-white bg-white/10 p-3 rounded-lg backdrop-blur-sm'>
                            
                                <span className='text-lg'>{data?.copyright}</span>
                                <h1 className=' font-black text-2xl'>{data?.title}</h1>
                                <time className='text-sm'>{data?.date}</time>
                                <p className='text-sm leading-relaxed mt-4'>{data?.explanation}</p>
                                
                        
                        </motion.div>
                        }
                    
                    </AnimatePresence>
                    <Footer />
                </div>
                
            
        </div>

    </div>
  )
}
