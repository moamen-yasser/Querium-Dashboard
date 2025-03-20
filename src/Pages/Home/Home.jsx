import React from 'react';
import Lecture from '../../assets/listing.jpg';
import LectureCard from '../../Components/LectureCard';
import NavBar from '../../Header/NavBar';
import CourseSlider from '../../Components/CourseSlider';

const cardData = Array.from({ length: 17 }, (_, index) => ({
    id: index + 1, 
    title: `Lecture ${index + 1}`, 
    description: 'test test', 
    image: Lecture, 
}));

const Home = () => {
return (
    <>
        <NavBar />
        <CourseSlider />
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-8">
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
