import { Card, Image, Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const LectureCard = ({ image, title, description }) => {
    const navigate = useNavigate();
return (
    <Card 
        className="!shadow-lg !rounded-lg flex flex-col justify-center items-center !max-h-[400px] w-full"
        p={0}
    >
        <Card.Section className='w-full px={0} py={0'>
            <Image
                src={image}
                alt={title}
                className="!object-cover !w-full"
            />
        </Card.Section>

        {/* Align text to the left */}
        <div className="w-[90%] text-left">
            <Text className="!mt-2 !capitalize !text-textSecondColor !font-bold !text-lg">
                {title}
            </Text>
            <Text className="!mt-2 !text-textSecondColor !font-medium !text-sm">
                {description}
            </Text>
        </div>

        <Button
            className="!mt-4 !bg-textSecondColor !text-white hover:!bg-hoverColor !w-[90%] !mb-2 !rounded-lg !py-1.5"
            onClick={() => navigate('/questions')}
        >
            View All Questions
        </Button>
    </Card>
);
};

export default LectureCard;
