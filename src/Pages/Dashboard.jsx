import React from 'react';
import SharedTabs from '../Menu/SharedTabs';
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import Home from './Home/Home';
import Students from './Student/Students';
import Upload from './Upload/Upload';
import Logo from '../Components/Logo';
import { TbHome } from "react-icons/tb";
import { PiUsersThreeFill } from "react-icons/pi";
import { TbCloudUpload } from "react-icons/tb";
import { FiTag } from "react-icons/fi";
import Logout from '../Components/Logout';
import Approve from './Approve/Approve';
import { Text } from '@mantine/core';
import { FaDesktop, FaExclamationCircle } from 'react-icons/fa';
import logo from '../assets/logo.svg'
import BackgroundImage from '../assets/bg.png'; 

const Dashboard = () => {
    const { tabValue } = useParams();
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery("(max-width: 1300px)");

    const tabValues = [
        {
            id: 1,
            value: "home",
            label: "Home",
            icon: <TbHome />,
            Panel: <Home />,
        },
        {
            id: 2,
            value: "students",
            label: "Students",
            icon: <PiUsersThreeFill />,
            Panel: <Students />,
        },
        {
            id: 3,
            value: "upload",
            label: "Upload",
            icon: <TbCloudUpload />,
            Panel: <Upload />,
        },
        {
            id: 4,
            value: "approve",
            label: "Approve",
            icon: <FiTag />,
            Panel: <Approve tabValue={tabValue} />,
        },
    ];

    // if (isSmallScreen) {
    //     return (
    //         <div 
    //             className="h-screen w-full flex items-center justify-center px-2 "
    //             style={{
    //                 backgroundImage: `url(${BackgroundImage})`, 
    //                 backgroundSize: 'cover', 
    //                 backgroundPosition: 'center', 
    //             }}
    //         >
    //             <div className='flex flex-col justify-center px-2 sm:px-8  bg-white opacity-75 py-4 rounded-lg'>
    //                 <figure className='flex justify-center items-center my-5'>
    //                     <img
    //                         src={logo}
    //                         alt="QUERIUM Logo"
    //                         className="w-48 mb-6 bg-main rounded-full"
    //                     />
    //                 </figure>
    //                 <FaDesktop size={64} className="text-gray-600" />
    //                 <Text className="text-3xl font-bold text-gray-800">
    //                     Please Use a Larger Screen
    //                 </Text>
    //                 <Text className="text-lg text-gray-600 max-w-md">
    //                     This dashboard is optimized for larger screens. Please switch to a PC or tablet for the best experience.
    //                 </Text>
    //                 <div className='flex items-center gap-2 mt-2 '>
    //                     <FaExclamationCircle size={24} className="text-yellow-500" />
    //                     <Text className="text-sm text-gray-500">
    //                         Mobile view is not supported at this time.
    //                     </Text>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="h-screen w-full flex overflow-x-auto">
            <div className="w-[18%] bg-main text-white px-6 flex flex-col justify-start items-start">
                <Logo />
                <SharedTabs
                    tabValue={tabValue}
                    onChange={(value) => {navigate(`/dashboard/${value}`)}}
                    tabValues={tabValues}
                    orientation={isSmallScreen ? "horizontal" : "vertical"}
                    defaultValue={"home"}
                    color={"#fff"}
                    variant={"pills"}
                    isSmallScreen={isSmallScreen}
                />
                <Logout />
                {/* <UserLogo /> */}
            </div>
            <div className="flex-1 overflow-y-scroll bg-[#F8F8F6] ">
                {tabValues?.map((tab) => (
                    tabValue === tab?.value && <div key={tab?.id}>{tab?.Panel}</div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;