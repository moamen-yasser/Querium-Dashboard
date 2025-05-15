import React from 'react';
import { Keyboard, Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/bundle';
import { useMediaQuery } from "@mantine/hooks";

const CourseSlider = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isSmallMobile = useMediaQuery("(max-width: 480px)");

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
        <div className={`w-full flex ${isMobile ? 'flex-col' : 'flex-row'} items-center ${isMobile ? 'gap-4' : 'justify-between gap-12'} ${isSmallMobile ? 'px-3' : isMobile ? 'px-6' : 'px-12'} py-2`}>
            <div
                style={{
                    borderImage: 'linear-gradient(to right, #FF637B, #06939C) 1',
                }}
                className={`flex items-center justify-center border text-center py-1.5 !rounded-full font-bold 
                    ${isMobile ? 'w-full max-w-[280px]' : 'w-80'} 
                    ${isMobile ? 'mb-2' : '-mr-6'}`}
            >
                <span
                    style={{
                        background: 'linear-gradient(to right, #FF637B, #06939C)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                    className={`${isSmallMobile ? 'text-sm' : ''} !rounded-full`}
                >
                    All Courses
                </span>
            </div>

            <Swiper
                spaceBetween={isSmallMobile ? 10 : 20}
                keyboard={true}
                modules={[Keyboard, Mousewheel, Navigation]}
                className={`flex flex-row ${isMobile ? 'w-full' : ''}`}
                slidesPerView={isSmallMobile ? 1.5 : isMobile ? 2.2 : "auto"}
                breakpoints={{
                    480: {
                        slidesPerView: 2.2,
                        spaceBetween: 15,
                    },
                    640: {
                        slidesPerView: 2.5,
                        spaceBetween: 15,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
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
                    className={`flex items-center justify-center border border-gray-500 
                    text-center py-1.5 rounded-full font-bold px-2 
                    ${isSmallMobile ? 'text-xs' : isMobile ? 'text-sm' : 'text-base'}`}
                >
                    {slide?.content}
                </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CourseSlider;