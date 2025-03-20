import React from 'react';
import { Card, Image, Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const LectureCard = ({ image, title, description }) => {
    const navigate = useNavigate();
return (
    <Card 
        className="bg-white shadow-lg rounded-xl flex flex-col justify-center items-center max-h-80 h-72 w-full"
    >
        <Card.Section className='w-[90%] '>
            <Image
                src={image}
                alt={title}
                className="rounded-xl h-40 object-cover w-full"
            />
        </Card.Section>

        {/* Align text to the left */}
        <div className="w-[90%] text-left">
            <Text className="mt-2 capitalize text-textSecondColor font-bold text-lg">
                {title}
            </Text>
            <Text className="mt-2 text-textSecondColor font-medium text-sm">
                {description}
            </Text>
        </div>

        <Button
            className="!mt-4 !bg-textSecondColor !text-white hover:!bg-hoverColor !w-[90%] !rounded-lg !py-1.5"
            onClick={() => navigate('/questions')}
        >
            View All Questions
        </Button>
    </Card>
);
};

export default LectureCard;
