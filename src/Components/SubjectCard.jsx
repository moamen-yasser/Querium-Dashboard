import { Card, Image, Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "@mantine/hooks";
import PropTypes from 'prop-types';

const SubjectCard = ({ image, data, chapterListing }) => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width: 768px)");
    
    return (
        <Card 
            className="!shadow-smoothCard hover:!shadow-smoothCardHover transition-shadow duration-300 !rounded-lg flex flex-col justify-center items-center !max-h-auto w-full"
            p={0}
        >
            <Card.Section className='w-full px={0} py={0}'>
                <div className={`${isMobile ? 'max-h-[320px]' : chapterListing ? "max-h-[240px]" : "max-h-[205px]"} overflow-hidden w-full`}>
                    <Image
                        src={image}
                        alt={data?.title}
                        className="!object-fill !w-full h-full"
                    />
                </div>
            </Card.Section>

            <div className={`w-full px-3 text-left h-[110px] ${isMobile ? 'pb-1' : ''}`}>
                <Text className={`!mt-2 !capitalize !text-textSecondColor !font-bold !line-clamp-2 ${isMobile ? '!text-base' : '!text-lg'}`}>
                    {`${data?.title}.`}
                </Text>
                <Text className={`!mt-1 !text-textSecondColor !font-medium !line-clamp-2 ${isMobile ? '!text-xs' : '!text-sm'}`}>
                    {`${data?.description}.`}
                </Text>
            </div>

            <Button
                className={`!mt-2 !text-white !w-[90%] !mb-2 !rounded-lg 
                    !bg-gradient-to-r from-[#023336] to-[#045056] 
                    hover:from-[#045056] hover:to-[#023336] 
                    ${isMobile ? '!py-1 !text-sm' : '!py-1.5'}`}
                onClick={() => navigate(`/${chapterListing ? 'questions' : 'chapters'}?id=${data?.id}&title=${data?.title}`)}
            >
                {`View All ${chapterListing ? "Questions" : "Chapters"}`}
            </Button>
        </Card>
    );
};

SubjectCard.propTypes = {
    image: PropTypes.string.isRequired,
    chapterListing: PropTypes.bool.isRequired,
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

export default SubjectCard;
