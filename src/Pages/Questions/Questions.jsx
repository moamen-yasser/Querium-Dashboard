import { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import Loader from "../../Components/Loader";
import QuestionCard from "../../Components/QuestionCard";
import { useGetQuestionsQuery } from "../../Service/Apis/subjectApi";
import { useMediaQuery } from "@mantine/hooks";
import { useSearchParams } from "react-router-dom";
import NoDataFound from "../../Components/NoDataFound";

const breadcrumbItems = [
    { label: "Home", link: "/dashboard/home" },
    { label: "Questions", link: "/dashboard/questions" },
];

const Questions = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const isSmallScreen = useMediaQuery("(max-width: 1350px)");
    const isMobileScreen = useMediaQuery("(max-width: 768px)");
    const [searchParams] = useSearchParams();  
    const id = searchParams.get('id');
    
    const {data: getQuestions, isLoading: isLoadingGetQuestions } = useGetQuestionsQuery(id);

    useEffect(() => {
        if (isSmallScreen && isMobileScreen) {
            setIsSidebarOpen(false);
        } else {
            setIsSidebarOpen(true);
        }
    }, [isSmallScreen, isMobileScreen]);
    
    return (
        <main>
            <Breadcrumb 
                title={"Questions"} 
                items={breadcrumbItems} 
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                isMobileScreen={isMobileScreen}
            />

            <section className="px-2">
                <div className="w-full px-0 lg:px-6 py-3 mt-3 lg:mt-10">
                    <div className="flex flex-wrap gap-4">
                        {isLoadingGetQuestions ? (
                            <div className="flex justify-center items-center h-screen w-full">
                                <Loader isLoading={true} />
                            </div>
                        ) : (
                            getQuestions?.length > 0 ? (
                                getQuestions?.map((question, index) => (
                                    <QuestionCard 
                                        key={question?.id} 
                                        question={question} 
                                        index={index} 
                                    />
                                ))
                            ) : (
                                <div className="w-full h-[46vh] flex justify-center items-center">
                                    <NoDataFound />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Questions;