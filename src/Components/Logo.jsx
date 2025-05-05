import React from 'react'
import logo from '../assets/imageLogo.png'
import { useNavigate } from 'react-router-dom'

const Logo = ({showLabels}) => {
    const navigate = useNavigate();
return (
    <div 
        className='w-full flex justify-start items-center gap-2 pb-8 pt-10 cursor-pointer' 
        onClick={() => navigate('/dashboard/home')}
    >
        <div className={`${!showLabels ? "w-16 h-16" : "w-24 h-24"} 
            transition-[width] duration-300 ease-in-out animate-[slideIn_0.5s_ease-out] transform-gpu`}>
            <img src={logo} alt="QUERIUM" className='w-full h-full object-fill '/>
        </div>
        {showLabels && (
            <div>
                <h1 className='text-xl font-bold'>QUERIUM</h1>
                <p className='text-xs font-normal'>let’s start the journey.</p>
            </div>
        )}
    </div>
)
}

export default Logo
