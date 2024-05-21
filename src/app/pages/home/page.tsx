// @ts-nocheck
"use client"
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import './index.css'

const page = () => {
  const [courses , setCourses] =useState<object[]>([]);

  const fetchData = async() =>{
    const res = await axios.post('https://how-to-aboard.vercel.app/api/courses')
    setCourses(res.data.data)
    console.log(res.data.data)
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <>
    <div className='w-[100%] h-[90%]  p-[0%] m-[0%]  flex  lg:flex-wrap mobile-home-card justify-start lg:justify-center items-center overflow-y-scroll '>
        {courses.map((course)=>{
          return (
            <div className=' w-[90%]  lg:w-[20%] h-[60%] shadow-2xl rounded-2xl flex flex-col justify-center m-[2%]  lg:m-[1%] items-center cursor-pointer  '>
              <div className='w-[100%] h-[50%] flex justify-center items-center ' >
                <img className='w-[100%] h-[100%] ' src="https://firebasestorage.googleapis.com/v0/b/giga-chat-9416b.appspot.com/o/profilePics%2F1713803771785_google.png?alt=media&token=292e7b46-b323-4383-8c50-56a061d64d6c"  alt="" />
              </div>
              <div className='w-[100%] h-[50%]   flex flex-col p-[5%] ' >
                <div className='w-[100%] h-[25%] text-center flex justify-center items-center font-bold text-md lg:text-2xl ' > <p>{course?.course_name}</p> </div>
                <div className='w-[100%] h-[25%] text-center flex justify-center items-center text-sm lg:text-xl italic ' > - {course?.organization}</div>
                <div className='w-[100%] h-[25%] text-center flex justify-center items-center ' >Fees : {course?.enroll_fees}</div>
                <div className='w-[100%] h-[25%] text-center flex justify-center items-center ' > Released on {course?.release_date} </div>
                
              </div>
            </div>
          );
        })}
    </div>
    </>
  )
}

export default page
