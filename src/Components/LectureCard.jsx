import { Card, Image, Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "@mantine/hooks";

const LectureCard = ({ image, title, description }) => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width: 768px)");
    
    return (
        <Card 
            className="!shadow-lg !rounded-lg flex flex-col justify-center items-center !max-h-auto w-full"
            p={0}
        >
            <Card.Section className='w-full px={0} py={0}'>
                <div className={`${isMobile ? 'max-h-[320px]' : 'max-h-[205px]'} overflow-hidden w-full`}>
                    <Image
                        src={image}
                        alt={title}
                        className="!object-fill !w-full h-full"
                    />
                </div>
            </Card.Section>

            {/* Align text to the left */}
            <div className={`w-[90%] text-left ${isMobile ? 'pb-1' : ''}`}>
                <Text className={`!mt-2 !capitalize !text-textSecondColor !font-bold ${isMobile ? '!text-base' : '!text-lg'}`}>
                    {title}
                </Text>
                <Text className={`!mt-1 !text-textSecondColor !font-medium ${isMobile ? '!text-xs' : '!text-sm'}`}>
                    {description}
                </Text>
            </div>

            <Button
                className={`!mt-2 !bg-textSecondColor !text-white hover:!bg-hoverColor !w-[90%] !mb-2 !rounded-lg ${isMobile ? '!py-1 !text-sm' : '!py-1.5'}`}
                onClick={() => navigate('/questions')}
            >
                View All Questions
            </Button>
        </Card>
    );
};

export default LectureCard;
