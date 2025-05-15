import SharedTabs from '../Menu/SharedTabs';
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import Home from './Home/Home';
import Students from './Student/Students';
import Upload from './Upload/Upload';
import Logo from '../Components/Logo';
import { TbHome } from "react-icons/tb";
import { PiUsersThree } from "react-icons/pi";
import { TbCloudUpload } from "react-icons/tb";
import { FiTag } from "react-icons/fi";
import Logout from '../Components/Logout';
import Approve from './Approve/Approve';
import { IoIosArrowBack } from "react-icons/io";
import { FaDesktop, FaExclamationCircle, FaBars } from "react-icons/fa";
import { useState, useEffect } from 'react';

const Dashboard = () => {
    const { tabValue } = useParams();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const isSmallScreen = useMediaQuery("(max-width: 1350px)");
    const isMobileScreen = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        if (isSmallScreen && !isMobileScreen) {
            setIsSidebarOpen(false);
        } else {
            setIsSidebarOpen(true);
        }
    }, [isSmallScreen, isMobileScreen]);

    const tabValues = [
        {
            id: 1,
            value: "home",
            label: "Home",
            icon: <TbHome size={28}/>,
            Panel: 
            <Home 
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                isMobileScreen={isMobileScreen}
            />,
        },
        {
            id: 2,
            value: "students",
            label: "Students",
            icon: <PiUsersThree size={28}/>,
            Panel: 
            <Students 
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                isMobileScreen={isMobileScreen}
            />,
        },
        {
            id: 3,
            value: "upload",
            label: "Upload",
            icon: <TbCloudUpload size={28}/>,
            Panel: 
            <Upload 
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                isMobileScreen={isMobileScreen}
            />,
        },
        {
            id: 4,
            value: "approve",
            label: "Approve",
            icon: <FiTag size={28}/>,
            Panel: 
            <Approve 
                tabValue={tabValue}
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                isMobileScreen={isMobileScreen} 
            />,
        },
    ];

    // if (isMobileView) {
    //     return (
    //         <div 
    //             className="h-screen w-full flex items-center justify-center px-2 bg-[#F8F8F6]"
    //         >
    //             <div className='flex flex-col items-center justify-center p-4 sm:p-8 bg-white shadow-lg rounded-lg max-w-md mx-auto'>
    //                 <Logo />
    //                 <FaDesktop size={64} className="text-gray-600 mt-6" />
    //                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4 text-center">
    //                     Please Use a Larger Screen
    //                 </h1>
    //                 <p className="text-base sm:text-lg text-gray-600 max-w-md mt-2 text-center">
    //                     This dashboard is optimized for larger screens. Please switch to a PC or tablet for the best experience.
    //                 </p>
    //                 <div className='flex items-center gap-2 mt-4'>
    //                     <FaExclamationCircle size={24} className="text-yellow-500" />
    //                     <p className="text-sm text-gray-500">
    //                         Mobile view is not supported at this time.
    //                     </p>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="h-screen w-full overflow-hidden">
            {isMobileScreen && isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-10"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Main layout */}
            <div className="w-full flex h-full">
                {(!isMobileScreen || (isMobileScreen && isSidebarOpen)) && (
                    <div 
                        className={`
                            ${isMobileScreen 
                                ? 'fixed inset-y-0 left-0 w-[250px] z-20'
                                : isSidebarOpen 
                                    ? 'w-[15.5%] min-w-[230px] relative' 
                                    : 'w-[6%] min-w-[80px] relative'
                            } 
                            bg-main text-white px-2 flex flex-col justify-start items-start h-full
                            transition-all duration-300 ease-in-out
                        `}
                    >
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className={`
                                ${isMobileScreen 
                                    ? 'absolute -right-12 top-4'
                                    : 'absolute -right-4 top-1/2 transform -translate-y-1/2'
                                } 
                                bg-[#F8F8F6] hover:bg-opacity-90 rounded-full p-2 cursor-pointer shadow-xl z-30
                            `}
                        >
                            <IoIosArrowBack 
                                size={20} 
                                className={`text-main transition-transform duration-300 ${!isSidebarOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        <Logo showLabels={isSidebarOpen || isMobileScreen}/>
                        <SharedTabs
                            tabValue={tabValue}
                            onChange={(value) => {
                                navigate(`/dashboard/${value}`);
                                if (isMobileScreen) setIsSidebarOpen(false);
                            }}
                            tabValues={tabValues}
                            orientation={isSmallScreen ? "horizontal" : "vertical"}
                            defaultValue={"home"}
                            color={"#fff"}
                            variant={"pills"}
                            isSmallScreen={isSmallScreen}
                            showLabels={isSidebarOpen || isMobileScreen}
                        />
                        <Logout showLabels={isSidebarOpen || isMobileScreen}/>
                    </div>
                )}

                <div 
                    className={
                        `flex-1 w-0 overflow-y-auto bg-[#F8F8F6] transition-all duration-300 ease-in-out`
                    }
                    style={{
                        height: '100%',
                    }}
                >
                    {tabValues?.map((tab) => (
                        tabValue === tab?.value && <div key={tab?.id}>{tab?.Panel}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;