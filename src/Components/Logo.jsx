import React from 'react'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'

const Logo = () => {
    const navigate = useNavigate();
return (
    <div 
        className='w-full flex justify-center items-center gap-2 pb-8 pt-10 cursor-pointer' 
        onClick={() => navigate('/dashboard/home')}
    >
        <img src={logo} alt="QUERIUM" className='w-20 h-20'/>
        <div>
            <h1 className='text-xl font-bold'>QUERIUM</h1>
            <p className='text-xs font-normal'>let’s start the journey.</p>
        </div>
    </div>
)
}

export default Logo
