import Chapter from '../../assets/pdf.webp';
import SubjectCard from '../../Components/SubjectCard';
import { useMediaQuery } from "@mantine/hooks";
import { useGetChaptersQuery } from '../../Service/Apis/subjectApi';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../Components/Breadcrumb';
import Loader from '../../Components/Loader';
import { useSearchParams } from 'react-router-dom';
import NoDataFound from '../../Components/NoDataFound';
import { Text } from '@mantine/core';

const breadcrumbItems = [
    { label: "Home", link: "/dashboard/home" },
    { label: "Chapters", link: "/dashboard/chapters" },
];

const Chapters = () => {
    const [searchParams] = useSearchParams();
    const subjectId = searchParams.get('id');
    const subjectTitle = searchParams.get('title');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const isSmallScreen = useMediaQuery("(max-width: 1350px)");
    const isMobileScreen = useMediaQuery("(max-width: 768px)");

    const { data: chapters, isLoading: isLoadingGetChapters } = useGetChaptersQuery(subjectId);

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
                    <div className="flex justify-center items-center h-screen w-full">
                        <Loader isLoading={true} />
                    </div>
                ) : (
                    <>
                        {chapters?.length > 0 ? (
                            <>
                                <Text className='!px-8 !pt-5 !text-main !font-bold !text-lg '>{subjectTitle}</Text>
                                <div className={`grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 
                                    p-4 sm:p-6 md:px-8 ${isMobileScreen ? 'px-3' : ''}`}>
                                    {chapters?.map((chapter) => (
                                        <div key={chapter?.id}>
                                            <SubjectCard
                                                image={Chapter}
                                                data={chapter}
                                                chapterListing={true}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </>
                    ):(
                        <div className="w-full h-[60vh] flex justify-center items-center">
                            <NoDataFound />
                        </div>
                    )}
                </>
                )}
            </div>
        </>
    );
};

export default Chapters;