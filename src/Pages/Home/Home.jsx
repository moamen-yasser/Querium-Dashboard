import Lecture from '../../assets/listing.jpg';
import LectureCard from '../../Components/LectureCard';
import NavBar from '../../Header/NavBar';
import CourseSlider from '../../Components/CourseSlider';
import { useMediaQuery } from "@mantine/hooks";
import { useGetChaptersQuery } from '../../Service/Apis/subjectApi';
import Loader from '../../Components/Loader';

const Home = ({isMobileScreen, isSidebarOpen, setIsSidebarOpen}) => {
    const isMobile = useMediaQuery("(max-width: 640px)");
    const {data: chapters, isLoading: isLoadingGetChapters} = useGetChaptersQuery(1);
    
    // Group chapters by subjectName
    const groupedBySubject = chapters?.reduce((acc, chapter) => {
        if (!acc[chapter?.subjectName]) {
            acc[chapter?.subjectName] = {
                subjectName: chapter?.subjectName,
                chapters: []
            };
        }
        acc[chapter?.subjectName]?.chapters?.push(chapter);
        return acc;
    }, {});

    const subjectGroups = groupedBySubject ? Object.values(groupedBySubject) : [];

    return (
        <>
            <NavBar 
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                isMobileScreen={isMobileScreen}
            />
            <CourseSlider />
            
            <div className="min-h-[60vh] flex flex-col">
                {isLoadingGetChapters ? (
                    <div className="flex-1 flex justify-center items-center">
                        <Loader isLoading={true} />
                    </div>
                ) : (
                    chapters?.length > 0 ? (
                        <div className={`grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                            xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 p-4 sm:p-6 md:p-8 ${isMobile ? 'px-3' : ''}`}>
                            {subjectGroups?.map((subjectGroup) => (
                                <div key={subjectGroup?.subjectName}>
                                    <LectureCard
                                        image={Lecture}
                                        title={subjectGroup?.subjectName}
                                        description={`${subjectGroup?.chapters?.length} chapters`}
                                        chapters={subjectGroup?.chapters}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col justify-center items-center text-gray-500 font-medium">
                            No Subjects Found.
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default Home;