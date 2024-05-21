// @ts-nocheck
'use client'
import React, { useState, useEffect, ChangeEvent } from 'react'
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ExplicitIcon from '@mui/icons-material/Explicit';
import SchoolIcon from '@mui/icons-material/School';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import axios from 'axios';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import './index.css'
import TuneIcon from '@mui/icons-material/Tune';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const page = () => {

  const [rangeValue, setRangeValue] = useState<number>(80);
  const [courses, setCourses] = useState<object[]>([]);
  const [noOfItemsClicked, setNoOfItemsClicked] = useState<boolean>(false)
  const [courseTypeClicked, setCourseTypeClicked] = useState<boolean>(false)
  const [teachingLanguageClicked, setTeachingLanguageClicked] = useState<boolean>(false)
  const [beginingSemesterClicked, setBeginingSemesterClicked] = useState<boolean>(false)
  const [durationClicked, setDurationClicked] = useState<boolean>(false)

  const [universityName, setUniversityName] = useState<string>('')
  const [courseName, setCourseName] = useState<string>('')
  const [germanyRanking, setGermanyRanking] = useState<number | undefined>()
  const [courseType, setCourseType] = useState<string>('')
  const [teachingLanguage, setTeachingLanguage] = useState<string>('')
  const [beginingSemester, setBeginingSemester] = useState<string>('')
  const [duration, setDuration] = useState<string>('')


  const [backupCourses, setBackupCourses] = useState<object[]>([{}])
  const fetchData = async () => {
    try {
      const res = await axios.post('https://how-to-aboard.vercel.app/api/universities')
      console.log(res.data.data)
      setCourses(res.data.data)
      setBackupCourses(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    fetchData()
    if (window.innerWidth <= 768) {
      setIsMobile(true)
    }
  }, [])


  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRangeValue(event?.target?.value);
    console.log(event?.target?.value)
  };



  const applyFilters = () => {
    let filteredCourses = [...backupCourses];

    if (universityName) {
      filteredCourses = filteredCourses.map(course => ({
        ...course,
        score: course.university.toLowerCase().includes(universityName.toLowerCase()) ? 1 : 0
      }));
    }

    if (courseName) {
      filteredCourses = filteredCourses.map(course => ({
        ...course,
        score: (course.score || 0) + (course.course.name.toLowerCase().includes(courseName.toLowerCase()) ? 1 : 0)
      }));
    }

    if (germanyRanking) {
      filteredCourses = filteredCourses.map(course => ({
        ...course,
        score: (course.score || 0) + (course.germany_ranking === germanyRanking ? 1 : 0)
      }));
    }

    if (courseType) {
      filteredCourses = filteredCourses.map(course => ({
        ...course,
        score: (course.score || 0) + (course.course.degree === courseType ? 1 : 0)
      }));
    }

    if (teachingLanguage) {
      filteredCourses = filteredCourses.map(course => ({
        ...course,
        score: (course.score || 0) + (course.course.teaching_language === teachingLanguage ? 1 : 0)
      }));
    }

    if (beginingSemester) {
      filteredCourses = filteredCourses.map(course => ({
        ...course,
        score: (course.score || 0) + (course.course.beginning_semester === beginingSemester ? 1 : 0)
      }));
    }

    if (duration) {
      filteredCourses = filteredCourses.map(course => ({
        ...course,
        score: (course.score || 0) + (course.course.duration === duration ? 1 : 0)
      }));
    }

    if (rangeValue) {
      filteredCourses = filteredCourses.map(course => ({
        ...course,
        score: (course.score || 0) + (course?.course?.tuition_fee <= rangeValue ? 1 : 0)
      }))
    }

    filteredCourses = filteredCourses.sort((a, b) => (b.score || 0) - (a.score || 0));
    setCourses(filteredCourses);
  };

  const handleItemCount = (item: number) => {
    setCourses(backupCourses.slice(0, item))
  }

  const handleResetFilters = () => {
    setUniversityName('')
    setCourseName('')
    setGermanyRanking(undefined)
    setCourseType('')
    setTeachingLanguage('')
    setBeginingSemester('')
    setDuration('')
    setRangeValue(80)
    applyFilters()
  }

  useEffect(() => {
    applyFilters();
  }, [universityName, courseName, germanyRanking, courseType, teachingLanguage, beginingSemester, duration, rangeValue]);

  const [isMobileFilters, setIsMobileFilters] = useState<boolean>(false)

  return (
    <>
      {!isMobile ? <>
        <div className='w-[100%] h-[90%] flex justify-center items-center  '>
          <div className='w-[30%] h-[100%]  flex justify-center items-center ' >
            <div className='w-[90%] h-[95%] py-[1%] flex flex-col justify-center items-center shadow-2xl rounded-2xl ' >
              <div className='w-[80%] h-[10%]  flex justify-start shadow-lg pl-[5%] items-center text-2xl rounded-lg cursor-pointer ' onClick={handleResetFilters} >
                <AutorenewIcon sx={{ width: "10%", height: "60%", color: "black" }} />
                <p className='ml-[10%]' >--Reset filters--</p>
              </div>
              <div className='w-[80%] h-[10%] flex flex-col justify-center items-center  ' >
                <div className='w-[100%] h-[100%]  flex justify-start shadow-lg pl-[5%] items-center text-2xl rounded-lg cursor-pointer mt-[1%]' onClick={() => setNoOfItemsClicked(!noOfItemsClicked)} >
                  {noOfItemsClicked ? <ArrowDropDownIcon sx={{ width: "10%", height: "60%", color: "black" }} /> : <ArrowDropUpIcon sx={{ width: "10%", height: "60%", color: "black" }} />}
                  <p className='ml-[10%]'>--No of items--</p>
                </div>
                {noOfItemsClicked &&
                  <div className='absolute w-[21%] mt-[9%] h-[10%]  flex flex-col justify-center items-center text-white rounded-lg noOfItemsDiv ' >
                    <p className='w-[100%] h-[25%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { handleItemCount(10); setNoOfItemsClicked(false) }}>10</p>
                    <p className='w-[100%] h-[25%] text-center bg-[#7e7ee5] flex justify-center items-center  cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { handleItemCount(20); setNoOfItemsClicked(false) }} >20</p>
                    <p className='w-[100%] h-[25%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { handleItemCount(50); setNoOfItemsClicked(false) }}>50</p>
                    <p className='w-[100%] h-[25%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { handleItemCount(100); setNoOfItemsClicked(false) }}>100</p>
                  </div>
                }

              </div>

              <div className='w-[80%] h-[30%] flex flex-col justify-center items-center text-2xl rounded-lg cursor-pointer mt-[1%] text-center'>
                <input type="text" placeholder='University Name' className='text-center shadow-lg w-[100%] h-[33%] outline-none border-gray-200 rounded-lg my-[1%]' value={universityName} onChange={(e: ChangeEvent<HTMLInputElement>) => setUniversityName(e.target.value)} />
                <input type="text" placeholder='Course Name' className='text-center shadow-lg  w-[100%] h-[33%] outline-none border-gray-200 rounded-lg my-[1%]' value={courseName} onChange={(e: ChangeEvent<HTMLInputElement>) => setCourseName(e.target.value)} />
                <input type="number" placeholder='Germany Ranking' className='text-center shadow-lg  w-[100%] h-[33%] outline-none border-gray-200 rounded-lg my-[1%]' value={germanyRanking} onChange={(e: ChangeEvent<HTMLInputElement>) => setGermanyRanking(parseInt(e.target.value))} />
              </div>

              <div className='w-[80%] h-[40%]  flex flex-col justify-center items-center' >
                <div className='w-[100%] h-[25%] flex flex-col justify-center items-center  my-[1%] cursor-pointer ' >
                  <div className='w-[100%] h-[100%] shadow-lg  flex justify-start pl-[5%] items-center  text-2xl rounded-lg  ' onClick={() => setCourseTypeClicked(!courseTypeClicked)} >
                    <AutoStoriesIcon sx={{ width: "10%", height: "60%", color: "black" }} />
                    <p className='ml-[10%]'>--Course Type--</p>
                  </div>
                  {courseTypeClicked &&
                    <div className='absolute w-[21%] mt-[13%] h-[20%] flex flex-col justify-center items-center text-white rounded-lg noOfItemsDiv ' >
                      <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setCourseType('Bachelors'); setCourseTypeClicked(false) }}>Bachelors</p>
                      <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] cursor-pointer hover:bg-white flex justify-center items-center hover:text-[#7e7ee5]' onClick={() => { setCourseType('Church Exam'); setCourseTypeClicked(false) }}>Church Exam</p>
                      <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setCourseType('Diploma'); setCourseTypeClicked(false) }}>Diploma</p>
                      <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setCourseType('Degree'); setCourseTypeClicked(false) }}>Degree</p>
                      <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setCourseType('LA'); setCourseTypeClicked(false) }}>LA</p>
                      <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setCourseType('Masters'); setCourseTypeClicked(false) }}>Masters</p>
                      <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setCourseType('Other'); setCourseTypeClicked(false) }}>Other</p>
                      <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setCourseType('Phd/ Doctorate'); setCourseTypeClicked(false) }}>Phd/ Doctorate</p>
                      <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setCourseType('State Exam'); setCourseTypeClicked(false) }}>State Exam</p>
                    </div>
                  }

                </div>
                <div className='w-[100%] h-[25%] flex flex-col justify-center items-center my-[1%] cursor-pointer ' >
                  <div className='w-[100%] h-[100%] shadow-lg  flex justify-start pl-[5%] items-center  text-2xl rounded-lg ' onClick={() => setTeachingLanguageClicked(!teachingLanguageClicked)} >
                    <ExplicitIcon sx={{ width: "10%", height: "60%", color: "black" }} />
                    <p className='ml-[10%]'>--Teaching Language--</p>
                  </div>
                  {teachingLanguageClicked &&
                    <div className='absolute w-[21%] mt-[9%] h-[10%] flex flex-col justify-center items-center text-white rounded-lg noOfItemsDiv ' >
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { setTeachingLanguage('Arabic'); setTeachingLanguageClicked(false) }} >Arabic</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center  cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { setTeachingLanguage('Chinese'); setTeachingLanguageClicked(false) }}>Chinese</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { setTeachingLanguage('Danish'); setTeachingLanguageClicked(false) }}>Danish</p>
                    </div>
                  }
                </div>
                <div className='w-[100%] h-[25%] flex flex-col justify-center items-center my-[1%] cursor-pointer ' >
                  <div className='w-[100%] h-[100%] flex shadow-lg  justify-start pl-[5%] items-center  text-2xl rounded-lg cursor-pointer ' onClick={() => setBeginingSemesterClicked(!beginingSemesterClicked)} >
                    <SchoolIcon sx={{ width: "10%", height: "60%", color: "black" }} />
                    <p className='ml-[10%]'>--Begining Semester--</p>
                  </div>
                  {beginingSemesterClicked &&
                    <div className='absolute w-[21%] mt-[9%] h-[10%] flex flex-col justify-center items-center text-white rounded-lg noOfItemsDiv ' >
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { setBeginingSemester('All Quaters'); setBeginingSemesterClicked(false) }} >All Quaters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center  cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { setBeginingSemester('All Trimesters'); setBeginingSemesterClicked(false) }} >ALl Trimesters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { setBeginingSemester('Any Time'); setBeginingSemesterClicked(false) }}  >Any Time</p>
                    </div>
                  }
                </div>
                <div className='w-[100%] h-[25%] flex flex-col justify-center items-center my-[1%] cursor-pointer ' >
                  {durationClicked &&
                    <div className='absolute w-[21%] mb-[38%] overflow-scroll h-[75%] flex flex-col justify-center items-center text-white rounded-lg noOfItemsDiv1 ' >
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('1 Semesters'); setDurationClicked(false) }}>1 Semesters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('1 months'); setDurationClicked(false) }}>1 months</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('10 Semesters'); setDurationClicked(false) }}>10 Semesters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('10 Trimesters'); setDurationClicked(false) }}>10 Trimesters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('10 months'); setDurationClicked(false) }}>10 months</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('11 Semesters'); setDurationClicked(false) }}>11 Semesters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('11 Trimesters'); setDurationClicked(false) }}>11 Trimesters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('12 Semesters'); setDurationClicked(false) }}>12 Semesters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('12 Trimesters'); setDurationClicked(false) }}>12 Trimesters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('12 months'); setDurationClicked(false) }}>12 months</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('12 semesters'); setDurationClicked(false) }}>12 semesters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('13 Semesters'); setDurationClicked(false) }}>13 Semesters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('13 Trimesters'); setDurationClicked(false) }}>13 Trimesters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('13 months'); setDurationClicked(false) }}>13 months</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('14 Semesters'); setDurationClicked(false) }}>14 Semesters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('14 Trimesters'); setDurationClicked(false) }}>14 Trimesters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('15 months'); setDurationClicked(false) }}>15 months</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('16 months'); setDurationClicked(false) }}>16 months</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('17 months'); setDurationClicked(false) }}>17 months</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('18 Months'); setDurationClicked(false) }}>18 Months</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('18 months'); setDurationClicked(false) }}>18 months</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('All Quarters'); setDurationClicked(false) }}>All Quarters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('2 Quarters'); setDurationClicked(false) }}>2 Quarters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('2 Semesters'); setDurationClicked(false) }}>2 Semesters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('2 months'); setDurationClicked(false) }}>2 months</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('2 semesters'); setDurationClicked(false) }}>2 semesters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('20 Semesters'); setDurationClicked(false) }}>20 Semesters</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('20 months'); setDurationClicked(false) }}>20 months</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('21 months'); setDurationClicked(false) }}>21 months</p>
                      <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('24 Months'); setDurationClicked(false) }}>24 Months</p>

                    </div>
                  }
                  <div className='w-[100%] h-[100%]  shadow-lg flex justify-start pl-[5%] items-center  text-2xl rounded-lg ' onClick={() => setDurationClicked(!durationClicked)} >
                    <TimelapseIcon sx={{ width: "10%", height: "60%", color: "black" }} />
                    <p className='ml-[10%]'>--Duration--</p>
                  </div>
                </div>

              </div>
              <div className='w-[80%] h-[10%] shadow-lg  flex flex-col justify-center items-center text-2xl ' >
                <p>Tution Fees - € {rangeValue} </p>
                <input
                  id="default-range"
                  type="range"
                  value={rangeValue}
                  onChange={handleRangeChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>

            </div>
          </div>
          <div className='w-[70%] h-[100%]  flex justify-center items-center overflow-y-scroll flex-wrap '>
            {courses.length > 0 && courses.map((course, index) => {
              return (
                <>
                  <div key={index} className='w-[40%] h-[50%] m-[5%]  flex justify-center items-center  rounded-xl bg-gray-100 overflow-hidden ' >
                    <div className='w-[33%] h-[100%] flex flex-col justify-center items-center ' >
                      <img src={course?.course?.image_url} alt="" className='w-[80%] h-[20%] rounded-lg' />
                      <p className='w-[80%] h-[20%] text-xs '>{course?.university}</p>
                      <p className='w-[80%] h-[10%] text-xs '>World ranking : {course?.world_ranking}</p>
                      <p className='w-[80%] h-[10%] text-xs'>Germany ranking : {course?.germany_ranking}</p>
                      <p className='w-[80%] h-[10%] text-xs'> {course?.city}</p>
                      <p className='w-[80%] h-[10%] text-xs'>state : {course?.state}</p>
                    </div>
                    <div className='w-[33%] h-[100%] flex flex-col justify-start items-center' >
                      <p className='w-[100%] h-[30%] text-xl font-bold  flex justify-start items-center ' >{course?.course?.name?.length > 50 ? course?.course?.name.slice(0, 30) + '...' : course?.course?.name}</p>
                      <p className='w-[100%] h-[20%] text-xs  flex justify-start items-center  ' >Degree : {course?.course?.degree}</p>
                      <p className='w-[100%] h-[20%] text-xs  flex justify-start items-center ' >Stream : {course?.course?.stream.length > 30 ? course?.course?.stream.slice(0, 30) + '...' : course?.course?.stream}</p>
                      <p className='w-[100%] h-[10%] text-xs  '> Beginning Semester : {course?.course?.beginning_semester}</p>
                      <p className='w-[100%] h-[10%] text-xs  '> Teach Language : {course?.course?.teaching_language}</p>
                      <p className='w-[100%] h-[10%] text-xs  '> German Grade Requirement  : {course?.course?.german_grade_requirement}</p>
                    </div>
                    <div className='w-[33%] h-[100%] flex flex-col justify-start items-center ' >
                      <p className='w-[90%] h-[20%]  flex justify-start items-center text-xs ' >Tution Fee : {course?.course?.tuition_fee}</p>
                      <p className='w-[90%] h-[20%]  flex justify-start items-center text-xs ' >Application Deadline : {course?.course?.beginning_semester} {JSON.stringify(course?.course?.application_deadline)?.length > 20 ? JSON.stringify(course?.course?.application_deadline).slice(0, 20) + '...' : JSON.stringify(course?.course?.application_deadline)}</p>
                      <div className='w-[90%] h-[15%] flex text-center justify-center my-[2%] items-center rounded-lg hover:bg-[white] hover:text-[#7e7ee5] hover:hover:border-[#7e7ee5] bg-[#7e7ee5] text-white cursor-pointer ' >Course Website</div>
                      <div className='w-[90%] h-[15%] flex text-center justify-center my-[2%] items-center rounded-lg bg-white text-[#7e7ee5] border-[#7e7ee5] hover:bg-[#7e7ee5] hover:text-white cursor-pointer ' >Submit Application</div>
                      <p className='w-[90%] h-[20%]  flex justify-start items-center text-xs ' >Last Updated : {course?.course?.last_updated}</p>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </> : <>
        {/* <div className='w-[100%] h-[100%] flex flex-col justify-start items-center  overflow-y-scroll ' > */}

        {!isMobileFilters ?
          <>
            {courses.length > 0 && courses.map((course, index) => {
              return (
                <>
                  <div key={index} className='mobile-course-card shadow-lg ' >
                    <div className=' mobile-course-container' >
                      <img src={course?.course?.image_url} alt="" className='w-[80%] h-[20%] rounded-lg  ' />
                      <p className='w-[80%]  h-[20%] '>{course?.university}</p>
                      <p className='w-[80%]  h-[10%]'>World ranking : {course?.world_ranking}</p>
                      <p className='w-[80%]  h-[10%]'>Germany ranking : {course?.germany_ranking}</p>
                      <p className='w-[80%]  h-[10%] '> {course?.city}</p>
                      <p className='w-[80%]  h-[10%] '>state : {course?.state}</p>
                    </div>
                    <div className='w-[33%] h-[100%] flex flex-col justify-start items-center' >
                      <p className='w-[100%] h-[15%]  font-bold text-sm  flex justify-start items-center ' >{course?.course?.name?.length > 30 ? course?.course?.name.slice(0, 20) + '...' : course?.course?.name}</p>
                      <p className='w-[100%] h-[10%]  flex justify-start items-center  ' >Degree : {course?.course?.degree}</p>
                      <p className='w-[100%] h-[30%]  flex justify-start items-center ' >Stream : {course?.course?.stream.length > 30 ? course?.course?.stream.slice(0, 30) + '...' : course?.course?.stream}</p>
                      <p className='w-[100%] h-[20%]  '> Beginning Semester : {course?.course?.beginning_semester}</p>
                      <p className='w-[100%] h-[10%]  '> Teach Language : {course?.course?.teaching_language}</p>
                      <p className='w-[100%] h-[25%]  '> German Grade Requirement  : {course?.course?.german_grade_requirement}</p>
                    </div>
                    <div className='w-[33%] h-[100%] flex flex-col justify-start items-center ' >
                      <p className='w-[90%] h-[20%]  flex justify-start items-center  ' >Tution Fee : {course?.course?.tuition_fee}</p>
                      <p className='w-[90%] h-[20%]  flex justify-start items-center ' >Application Deadline : {course?.course?.beginning_semester} {JSON.stringify(course?.course?.application_deadline)?.length > 20 ? JSON.stringify(course?.course?.application_deadline).slice(0, 20) + '...' : JSON.stringify(course?.course?.application_deadline)}</p>
                      <div className='w-[90%] h-[15%] flex justify-center my-[2%] items-center rounded-sm text-center hover:bg-[white] hover:text-[#7e7ee5] hover:hover:border-[#7e7ee5] bg-[#7e7ee5] text-white cursor-pointer ' >Course Website</div>
                      <div className='w-[90%] h-[15%] flex justify-center my-[2%] items-center rounded-sm text-center bg-white text-[#7e7ee5] border-[#7e7ee5] hover:bg-[#7e7ee5] hover:text-white cursor-pointer ' >Submit Application</div>
                      <p className='w-[90%] h-[20%]  flex justify-start items-center  ' >Last Updated : {course?.course?.last_updated}</p>
                    </div>
                  </div>
                </>
              )
            })}
            <div className='applyFilterButton' onClick={() => setIsMobileFilters(true)} >
              <TuneIcon className='filterIcon' />
            </div>
          </>
          :
          <>
            <div className='getBackBtn' >
              <ArrowBackIcon className='getBackIcon' onClick={()=>setIsMobileFilters(false)} />
            </div>
            <div className='applyFiltersContainer' >
              <div className='w-[100%] h-[100%] py-[1%] flex flex-col justify-center items-center rounded-2xl ' >
                <div className='w-[80%] h-[10%]  flex justify-start pl-[5%] items-center shadow-lg text-sm rounded-lg cursor-pointer ' onClick={handleResetFilters} >
                  <AutorenewIcon sx={{ width: "10%", height: "60%", color: "black" }} />
                  <p className='ml-[10%]' >--Reset filters--</p>
                </div>
                <div className='w-[80%] h-[10%] flex flex-col justify-center items-center  ' >
                  <div className='w-[100%] h-[100%]  flex justify-start  pl-[5%] items-center shadow-lg text-sm rounded-lg cursor-pointer mt-[1%]' onClick={() => setNoOfItemsClicked(!noOfItemsClicked)} >
                    {noOfItemsClicked ? <ArrowDropDownIcon sx={{ width: "10%", height: "60%", color: "black" }} /> : <ArrowDropUpIcon sx={{ width: "10%", height: "60%", color: "black" }} />}
                    <p className='ml-[10%]'>--No of items--</p>
                  </div>
                  {noOfItemsClicked &&
                    <div className='absolute w-[80%] mt-[50%] h-[20%]  flex flex-col justify-center items-center text-white rounded-lg noOfItemsDiv ' >
                      <p className='w-[100%] h-[25%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { handleItemCount(10); setNoOfItemsClicked(false) }}>10</p>
                      <p className='w-[100%] h-[25%] text-center bg-[#7e7ee5] flex justify-center items-center  cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { handleItemCount(20); setNoOfItemsClicked(false) }} >20</p>
                      <p className='w-[100%] h-[25%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { handleItemCount(50); setNoOfItemsClicked(false) }}>50</p>
                      <p className='w-[100%] h-[25%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { handleItemCount(100); setNoOfItemsClicked(false) }}>100</p>
                    </div>
                  }

                </div>

                <div className='w-[80%] h-[30%] flex flex-col justify-center items-center text-sm rounded-lg cursor-pointer mt-[1%] text-center'>
                  <input type="text" placeholder='University Name' className=' shadow-lg text-center w-[100%] h-[33%] outline-none border-gray-200 rounded-lg my-[1%]' value={universityName} onChange={(e: ChangeEvent<HTMLInputElement>) => setUniversityName(e.target.value)} />
                  <input type="text" placeholder='Course Name' className='text-center shadow-lg w-[100%] h-[33%] outline-none border-gray-200 rounded-lg my-[1%]' value={courseName} onChange={(e: ChangeEvent<HTMLInputElement>) => setCourseName(e.target.value)} />
                  <input type="number" placeholder='Germany Ranking' className='text-center shadow-lg w-[100%] h-[33%] outline-none border-gray-200 rounded-lg my-[1%]' value={germanyRanking} onChange={(e: ChangeEvent<HTMLInputElement>) => setGermanyRanking(parseInt(e.target.value))} />
                </div>

                <div className='w-[80%] h-[40%]  flex flex-col justify-center items-center' >
                  <div className='w-[100%] h-[25%] flex flex-col justify-center items-center  my-[1%] cursor-pointer ' >
                    <div className='w-[100%] h-[100%] flex justify-start shadow-lg pl-[5%] items-center  text-sm rounded-lg  ' onClick={() => setCourseTypeClicked(!courseTypeClicked)} >
                      <AutoStoriesIcon sx={{ width: "10%", height: "60%", color: "black" }} />
                      <p className='ml-[10%]'>--Course Type--</p>
                    </div>
                    {courseTypeClicked &&
                      <div className='absolute w-[80%] mt-[65%] h-[30%] flex flex-col justify-center items-center text-white rounded-lg noOfItemsDiv ' >
                        <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setCourseType('Bachelors'); setCourseTypeClicked(false) }}>Bachelors</p>
                        <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] cursor-pointer hover:bg-white flex justify-center items-center hover:text-[#7e7ee5]' onClick={() => { setCourseType('Church Exam'); setCourseTypeClicked(false) }}>Church Exam</p>
                        <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setCourseType('Diploma'); setCourseTypeClicked(false) }}>Diploma</p>
                        <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setCourseType('Degree'); setCourseTypeClicked(false) }}>Degree</p>
                        <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setCourseType('LA'); setCourseTypeClicked(false) }}>LA</p>
                        <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setCourseType('Masters'); setCourseTypeClicked(false) }}>Masters</p>
                        <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setCourseType('Other'); setCourseTypeClicked(false) }}>Other</p>
                        <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setCourseType('Phd/ Doctorate'); setCourseTypeClicked(false) }}>Phd/ Doctorate</p>
                        <p className='w-[100%] h-[11%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setCourseType('State Exam'); setCourseTypeClicked(false) }}>State Exam</p>
                      </div>
                    }

                  </div>
                  <div className='w-[100%] h-[25%] flex flex-col justify-center items-center my-[1%] cursor-pointer ' >
                    <div className='w-[100%] h-[100%] flex justify-start shadow-lg pl-[5%] items-center  text-sm rounded-lg ' onClick={() => setTeachingLanguageClicked(!teachingLanguageClicked)} >
                      <ExplicitIcon sx={{ width: "10%", height: "60%", color: "black" }} />
                      <p className='ml-[10%]'>--Teaching Language--</p>
                    </div>
                    {teachingLanguageClicked &&
                      <div className='absolute w-[80%] mt-[43%] h-[15%] flex flex-col justify-center items-center text-white rounded-lg noOfItemsDiv ' >
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { setTeachingLanguage('Arabic'); setTeachingLanguageClicked(false) }} >Arabic</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center  cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { setTeachingLanguage('Chinese'); setTeachingLanguageClicked(false) }}>Chinese</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { setTeachingLanguage('Danish'); setTeachingLanguageClicked(false) }}>Danish</p>
                      </div>
                    }
                  </div>
                  <div className='w-[100%] h-[25%] flex flex-col justify-center items-center my-[1%] cursor-pointer ' >
                    <div className='w-[100%] h-[100%] flex shadow-lg justify-start pl-[5%] items-center  text-sm rounded-lg cursor-pointer ' onClick={() => setBeginingSemesterClicked(!beginingSemesterClicked)} >
                      <SchoolIcon sx={{ width: "10%", height: "60%", color: "black" }} />
                      <p className='ml-[10%]'>--Begining Semester--</p>
                    </div>
                    {beginingSemesterClicked &&
                      <div className='absolute  w-[80%] mt-[43%] h-[15%] flex flex-col justify-center items-center text-white rounded-lg noOfItemsDiv ' >
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { setBeginingSemester('All Quaters'); setBeginingSemesterClicked(false) }} >All Quaters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center  cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { setBeginingSemester('All Trimesters'); setBeginingSemesterClicked(false) }} >ALl Trimesters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5] ' onClick={() => { setBeginingSemester('Any Time'); setBeginingSemesterClicked(false) }}  >Any Time</p>
                      </div>
                    }
                  </div>
                  <div className='w-[100%] h-[25%] flex flex-col justify-center items-center my-[1%] cursor-pointer ' >
                    {durationClicked &&
                      <div className='absolute w-[80%] mb-[150%] p-[1%] overflow-scroll h-[75%] flex flex-col justify-center items-center text-white rounded-lg noOfItemsDiv1 ' >
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('1 Semesters'); setDurationClicked(false) }}>1 Semesters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('1 months'); setDurationClicked(false) }}>1 months</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('10 Semesters'); setDurationClicked(false) }}>10 Semesters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('10 Trimesters'); setDurationClicked(false) }}>10 Trimesters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('10 months'); setDurationClicked(false) }}>10 months</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('11 Semesters'); setDurationClicked(false) }}>11 Semesters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('11 Trimesters'); setDurationClicked(false) }}>11 Trimesters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('12 Semesters'); setDurationClicked(false) }}>12 Semesters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('12 Trimesters'); setDurationClicked(false) }}>12 Trimesters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('12 months'); setDurationClicked(false) }}>12 months</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('12 semesters'); setDurationClicked(false) }}>12 semesters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('13 Semesters'); setDurationClicked(false) }}>13 Semesters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('13 Trimesters'); setDurationClicked(false) }}>13 Trimesters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('13 months'); setDurationClicked(false) }}>13 months</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('14 Semesters'); setDurationClicked(false) }}>14 Semesters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('14 Trimesters'); setDurationClicked(false) }}>14 Trimesters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('15 months'); setDurationClicked(false) }}>15 months</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('16 months'); setDurationClicked(false) }}>16 months</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('17 months'); setDurationClicked(false) }}>17 months</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('18 Months'); setDurationClicked(false) }}>18 Months</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('18 months'); setDurationClicked(false) }}>18 months</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('All Quarters'); setDurationClicked(false) }}>All Quarters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('2 Quarters'); setDurationClicked(false) }}>2 Quarters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('2 Semesters'); setDurationClicked(false) }}>2 Semesters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('2 months'); setDurationClicked(false) }}>2 months</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('2 semesters'); setDurationClicked(false) }}>2 semesters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('20 Semesters'); setDurationClicked(false) }}>20 Semesters</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('20 months'); setDurationClicked(false) }}>20 months</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('21 months'); setDurationClicked(false) }}>21 months</p>
                        <p className='w-[100%] h-[33%] text-center bg-[#7e7ee5] flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#7e7ee5]' onClick={() => { setDuration('24 Months'); setDurationClicked(false) }}>24 Months</p>

                      </div>
                    }
                    <div className='w-[100%] h-[100%] flex shadow-lg justify-start pl-[5%] items-center  text-sm rounded-lg ' onClick={() => setDurationClicked(!durationClicked)} >
                      <TimelapseIcon sx={{ width: "10%", height: "60%", color: "black" }} />
                      <p className='ml-[10%]'>--Duration--</p>
                    </div>
                  </div>

                </div>
                <div className='w-[80%] h-[10%] flex flex-col shadow-lg justify-center items-center text-sm ' >
                  <p>Tution Fees - € {rangeValue} </p>
                  <input
                    id="default-range"
                    type="range"
                    value={rangeValue}
                    onChange={handleRangeChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>

              </div>
            </div>
          </>
        }

        {/* </div> */}
      </>}
    </>
  )
}

export default page
