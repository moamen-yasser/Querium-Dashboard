import Chapter from '../../assets/pdf.webp';
import LectureCard from '../../Components/LectureCard';
import { useMediaQuery } from "@mantine/hooks";
import { useGetChaptersQuery } from '../../Service/Apis/subjectApi';
import { Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../Components/Breadcrumb';
import Loader from '../../Components/Loader';

// Breadcrumb items
const breadcrumbItems = [
    { label: "Home", link: "/dashboard/home" },
    { label: "Chapters", link: "/dashboard/chapters" },
];

const Chapters = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const isSmallScreen = useMediaQuery("(max-width: 1350px)");
    const isMobileScreen = useMediaQuery("(max-width: 768px)");
    
    const { data: chapters, isLoading: isLoadingGetChapters } = useGetChaptersQuery(1);

    useEffect(() => {
        if (isSmallScreen && isMobileScreen) {
            setIsSidebarOpen(false);
        } else {
            setIsSidebarOpen(true);
        }
    }, [isSmallScreen, isMobileScreen]);

    return (
        <>
            <Breadcrumb 
                title={"Chapters"} 
                items={breadcrumbItems} 
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                isMobileScreen={isMobileScreen}
            />
            <div className="w-full">
                {isLoadingGetChapters ? (
                    <div className="flex-1 flex justify-center items-center">
                        <Loader isLoading={true} />
                    </div>
                ) : (
                    chapters?.length > 0 ? (
                    <div className={`grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 p-4 sm:p-6 md:p-8 ${isMobileScreen ? 'px-3' : ''}`}>
                        {chapters?.map((subjectGroup) => (
                            <LectureCard
                                key={subjectGroup?.subjectName}
                                id={subjectGroup?.id}
                                image={Chapter}
                                title={subjectGroup?.title}
                                description={subjectGroup?.description}
                                chapters={subjectGroup?.chapters}
                                chapterListing={true}
                            />
                        ))}
                    </div>
                ):(
                    <div className="flex-1 flex flex-col justify-center items-center text-gray-500 font-medium">
                        No Chapters Found.
                    </div>
                ))}
            </div>
        </>
    );
};

export default Chapters;