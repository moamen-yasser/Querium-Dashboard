import React from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import QuestionCard from "../../Components/QuestionCard";

// Sample data
const mockQuestionsData = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris",
    },
    {
        id: 2,
        question: "Which programming language is used for web development?",
        options: ["Java", "Python", "JavaScript", "C++"],
        correctAnswer: "JavaScript",
    },
    {
        id: 3,
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4",
    },
    {
        id: 4,
        question: "What is the largest planet in the solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Jupiter",
    },
    {
        id: 5,
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
        correctAnswer: "William Shakespeare",
    },
    {
        id: 6,
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: "H2O",
    },
    {
        id: 7,
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "South Korea", "Thailand"],
        correctAnswer: "Japan",
    },
    {
        id: 8,
        question: "What is the smallest prime number?",
        options: ["1", "2", "3", "5"],
        correctAnswer: "2",
    },
    {
        id: 9,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars",
    },
    {
        id: 10,
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        correctAnswer: "8",
    },
];

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
    return (
        <main className="bg-[#F8F8F6]">
            <Breadcrumb title={"Questions"} items={breadcrumbItems} />

            <section className="px-12 ">
                <div className="w-full px-6 py-3 mt-10">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-textSecondColor mb-6">
                        Questions with Answers
                    </h1>

                    {/* Cards Grid */}
                    <div className="flex flex-wrap gap-4">
                        {mockQuestionsData?.length > 0 ? (
                            mockQuestionsData?.map((question, idx) => (
                                <QuestionCard key={question.id} question={question} index={idx} />
                            ))
                        ) : (
                            <EmptyState />
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Questions;