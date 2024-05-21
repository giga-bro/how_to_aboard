// @ts-nocheck
"use client"
import React,{useState} from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import './index.css'

interface LayoutProps {
    children: React.ReactNode
}

const layout: React.FC<LayoutProps> = (props) => {
    const [active, setActive] = useState<string>('');

    const handleSetActive = (path:string) => {
        setActive(path);
    };

    return (
        <>
            <div className='w-screen h-screen ' >
                <div className='navbar'>
                    <Link href="/pages/home" className='m-[0px]' onClick={() => handleSetActive('/pages/home')}>
                        <div className={`nav-item ${active === '/pages/home' ? 'active' : ''}`}>
                            <HomeIcon className="nav-icon" />
                            <p>Home</p>
                        </div>
                    </Link>
                    <Link href="/pages/searchcourse" onClick={() => handleSetActive('/pages/searchcourse')}>
                        <div className={`nav-item ${active === '/pages/searchcourse' ? 'active' : ''}`}>
                            <SearchIcon className="nav-icon" />
                            <p>Search Course</p>
                        </div>
                    </Link>
                    <Link href="/pages/login" onClick={() => handleSetActive('/pages/login')}>
                        <div className={`nav-item ${active === '/pages/login' ? 'active' : ''}`}>
                            <LoginIcon className="nav-icon" />
                            <p>Login</p>
                        </div>
                    </Link>
                    <Link href="/pages/portal" onClick={() => handleSetActive('/pages/portal')}>
                        <div className={`nav-item ${active === '/pages/portal' ? 'active' : ''}`}>
                            <PersonIcon className="nav-icon" />
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



