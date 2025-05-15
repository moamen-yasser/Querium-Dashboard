import { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import Loader from "../../Components/Loader";
import QuestionCard from "../../Components/QuestionCard";
import { useGetQuestionsQuery } from "../../Service/Apis/subjectApi";
import { useMediaQuery } from "@mantine/hooks";

// Breadcrumb items
const breadcrumbItems = [
    { label: "Home", link: "/dashboard/home" },
    { label: "Questions", link: "/dashboard/questions" },
];

// Empty State Component
const EmptyState = () => (
    <div className="p-4 text-center text-gray-500 font-medium">
        No questions found.
    </div>
);


const Questions = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const isSmallScreen = useMediaQuery("(max-width: 1350px)");
    const isMobileScreen = useMediaQuery("(max-width: 768px)");
    
    const {data: getQuestions, isLoading: isLoadingGetQuestions } = useGetQuestionsQuery();

    useEffect(() => {
        if (isSmallScreen && !isMobileScreen) {
            setIsSidebarOpen(false);
        } else {
            setIsSidebarOpen(true);
        }
    }, [isSmallScreen, isMobileScreen]);
    
    return (
        <main className="bg-[#F8F8F6]">
            <Breadcrumb 
                title={"Questions"} 
                items={breadcrumbItems} 
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                isMobileScreen={isMobileScreen}
            />

            <section className="px-2 lg:px-12 ">
                <div className="w-full px-0 lg:px-6 py-3 mt-3 lg:mt-10">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-textSecondColor mb-6">
                        Questions with Answers
                    </h1>

                    {/* Cards Grid */}
                    <div className="flex flex-wrap gap-4">
                        {isLoadingGetQuestions ? (
                                <div className="p-4 w-full text-center">
                                    <Loader isLoading={true} />
                                </div>
                        ) : (
                            getQuestions?.questions?.length > 0 ? (
                                getQuestions?.questions?.map((question) => (
                                    <QuestionCard key={question?.id} question={question} index={question?.id} />
                                ))
                            ) : (
                                <EmptyState />
                            )
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Questions;