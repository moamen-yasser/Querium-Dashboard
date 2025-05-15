import { Card, Text, Group, Badge } from "@mantine/core";
const QuestionCard = ({ question, index }) => {
return (
    <Card className="!mb-4 !shadow-md !px-8 !py-4 !rounded-lg !flex-1 !min-w-[45%] !mx-2 !bg-white">
        <Text size="lg" weight={500} className="!mb-2 !text-textSecondColor !font-bold !text-xl">
            {question?.id}-{question?.questionText}
        </Text>

        <Group spacing="sm" className="!my-3 !w-full !flex !flex-row !gap-4 !items-center !text-textSecondColor !font-semibold !text-lg">
            {question?.answers?.map((option, index) => (
                <Badge 
                    key={index} 
                    color="blue" 
                    variant="light" 
                    radius="sm" 
                    className="!w-full !text-left !p-3 !cursor-pointer hover:!bg-blue-500 hover:!text-white transition-all duration-300 !flex !justify-start"
                >
                    {`${String.fromCharCode(65 + index)}) ${option}`}
                </Badge>
            ))}
        </Group>

        <Group spacing="sm" className="!flex !items-center !gap-4 !mt-4">
            <Text className="!text-base !font-semibold !text-textSecondColor">
                Correct Answer:
            </Text>
            <Badge variant="filled" radius="sm" className="!font-bold !bg-[#09C648] !p-3 !text-xs">
                {question?.correctAnswer}
            </Badge>
        </Group>
    </Card>
);
};

export default QuestionCard