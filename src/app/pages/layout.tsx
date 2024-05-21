// @ts-nocheck
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode
}

const layout: React.FC<LayoutProps> = (props) => {
    return (
        <>
            <div className='w-screen h-screen ' >
                <div className='w-[100%] h-[10%]   flex justify-center items-center '>
                    <Link href="/pages/home" className='w-[25%] h-[100%]  flex justify-center items-center' >
                        <div className='w-[100%] h-[100%] flex  justify-center items-center   text-center text-black lg:text-2xl cursor-pointer  flex-col  text-[0.60rem]' >
                            <HomeIcon className='w-[60%]  h-[50%] m-0 p-0 mt-[2%] text-black ' />
                            <p> Home</p>
                        </div>
                    </Link>
                    <Link href="/pages/searchcourse" className='w-[25%] h-[100%]  flex justify-center items-center' >
                        <div className='w-[100%] h-[100%] flex justify-center items-center   text-center text-black lg:text-2xl cursor-pointer flex-col  text-[0.60rem]' >
                            <SearchIcon className='w-[60%]  h-[50%] m-0 p-0 mt-[2%] text-black ' />
                            <p>Search Course</p>
                        </div>
                    </Link>
                    <Link href="/pages/login" className='w-[25%] h-[100%]  flex justify-center items-center' >
                        <div className='w-[100%] h-[100%] flex justify-center items-center   text-center text-black lg:text-2xl cursor-pointer flex-col  text-[0.60rem]' >
                            <LoginIcon className='w-[60%]  h-[50%] m-0 p-0 mt-[2%] text-black ' />
                            <p>Login</p>
                        </div>
                    </Link>
                    <Link href="/pages/portal" className='w-[25%] h-[100%]  flex justify-center items-center' >
                        <div className='w-[100%] h-[100%] flex justify-center items-center   text-center text-black lg:text-2xl cursor-pointer flex-col  text-[0.60rem]' >
                            <PersonIcon className='w-[60%]  h-[50%] m-0 p-0 mt-[2%] text-black '/> 
                            <p>Portal</p>
                        </div>
                    </Link>

                </div>
                {props.children}
            </div >
        </>
    )
}

export default layout



