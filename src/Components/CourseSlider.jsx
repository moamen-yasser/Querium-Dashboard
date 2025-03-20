import React from 'react';
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/bundle'; 

const CourseSlider = () => {
const slides = [
    { id: 2, content: 'Computer Vision'},
    { id: 3, content: 'AI'},
    { id: 4, content: 'Software Engineer'},
    { id: 5, content: 'Network Engineer' },
    { id: 6, content: 'Data Science', },
    { id: 7, content: 'Web Development', },
    { id: 8, content: 'Mobile Development', },
    { id: 9, content: 'Cloud Computing', },
    { id: 10, content: 'DevOps',},
];

return (
    
    <div className="w-full flex flex-row items-center justify-between gap-12 px-12 py-2">
        <div
            style={{
                borderImage: 'linear-gradient(to right, #FF637B, #06939C) 1',
            }}
            className='flex items-center justify-center border text-center py-1.5 !rounded-full font-bold w-80 -mr-6'
        >
            <span
                style={{
                    background: 'linear-gradient(to right, #FF637B, #06939C)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                All Courses
            </span>
        </div>

        <Swiper
            spaceBetween={40}
            keyboard={true}
            modules={[Keyboard, Mousewheel]}
            className="flex flex-row"
            breakpoints={{
                1024: {
                    slidesPerView: 4, 
                    spaceBetween: 20,
                },
                1280: {
                    slidesPerView: 5, 
                    spaceBetween: 20,
                },
            }}
        >
            {slides?.map((slide) => (
            <SwiperSlide
                key={slide?.id}
                className='flex items-center justify-center border border-gray-500 
                text-center py-1.5 rounded-full text-gray font-bold px-0 gap-3'
            >
                {slide?.content}
            </SwiperSlide>
            ))}
        </Swiper>
    </div>
);
};

export default CourseSlider;