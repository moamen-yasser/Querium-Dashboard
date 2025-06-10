import Lecture from '../../assets/listing.jpg';
import SubjectCard from '../../Components/SubjectCard';
import NavBar from '../../Header/NavBar';
import AcadmicYearSlider from '../../Components/AcadmicYearSlider';
import { useMediaQuery } from "@mantine/hooks";
import { useGetAllSubjectsQuery } from '../../Service/Apis/subjectApi';
import Loader from '../../Components/Loader';
import PropTypes from 'prop-types';
import { useState } from 'react';
import NoDataFound from '../../Components/NoDataFound';

const Home = ({isMobileScreen, isSidebarOpen, setIsSidebarOpen}) => {
    const[acadmicYear, setAcadminYear] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const isMobile = useMediaQuery("(max-width: 640px)");

    const {data: getSubjects, isLoading: isLoadingGetAllSubjects} = useGetAllSubjectsQuery({
        search: searchQuery,
        academicYear: acadmicYear,
    });

    return (
        <>
            <NavBar 
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                isMobileScreen={isMobileScreen}
                data={getSubjects}
            />

            <AcadmicYearSlider onSlideClick={setAcadminYear}/>

            <div className="min-h-[60vh] flex flex-col">
                {isLoadingGetAllSubjects ? (
                    <div className="flex-1 flex justify-center items-center">
                        <Loader isLoading={true} />
                    </div>
                ) : (
                    getSubjects?.length > 0 ? (
                        <div className={`grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                            xl:grid-cols-5 gap-4 sm:gap-5 md:gap-2 p-4 sm:p-6 md:p-8 ${isMobile ? 'px-3' : ''}`}>
                            {getSubjects?.map((subject) => (
                                <div key={subject?.id}>
                                    <SubjectCard
                                        image={Lecture}
                                        data={subject}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full h-[60vh] flex justify-center items-center">
                            <NoDataFound home={true} />
                        </div>
                    )
                )}
            </div>
        </>
    );
};

Home.propTypes = {
    isMobileScreen: PropTypes.bool.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
    setIsSidebarOpen: PropTypes.func.isRequired
};

export default Home;