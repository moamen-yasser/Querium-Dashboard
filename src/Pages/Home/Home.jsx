import Lecture from '../../assets/listing.jpg';
import LectureCard from '../../Components/LectureCard';
import NavBar from '../../Header/NavBar';
import CourseSlider from '../../Components/CourseSlider';
import { useMediaQuery } from "@mantine/hooks";

const cardData = Array.from({ length: 17 }, (_, index) => ({
    id: index + 1, 
    title: `Lecture ${index + 1}`, 
    description: 'test test', 
    image: Lecture, 
}));

const Home = ({isMobileScreen, isSidebarOpen, setIsSidebarOpen}) => {
    const isMobile = useMediaQuery("(max-width: 640px)");
    
    return (
        <>
            <NavBar 
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                isMobileScreen={isMobileScreen}
            />
            <CourseSlider />
            <div className="w-full">
                <div className={`grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 p-4 sm:p-6 md:p-8 ${isMobile ? 'px-3' : ''}`}>
                    {cardData?.map((card) => (
                        <LectureCard
                            key={card?.id}
                            image={card?.image}
                            title={card?.title}
                            description={card?.description}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;