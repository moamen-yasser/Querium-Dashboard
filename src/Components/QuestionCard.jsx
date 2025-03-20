import React from 'react'
import { Card, Text, Group, Badge } from "@mantine/core";

const QuestionCard = ({ question, index }) => {
return (
    <Card className="mb-4 shadow-md px-8 py-4 rounded-lg flex-1 min-w-[45%] mx-2 bg-white">
        <Text size="lg" weight={500} className="mb-2 text-textSecondColor font-bold text-xl">
            {index + 1}-{question.question}
        </Text>

        <Group spacing="sm" className="my-3 w-full flex justify-between items-center text-textSecondColor font-semibold text-lg">
            {question.options.map((option, index) => (
                <Badge key={index} color="blue" variant="light" className="w-full text-left">
                    {`${String.fromCharCode(65 + index)}) ${option}`}
                </Badge>
            ))}
        </Group>

        <Group spacing="sm" className="flex items-center gap-4">
            <Text className="text-base font-medium text-textSecondColor">
                Correct Answer:
            </Text>
            <Badge color="green" variant="filled" className="font-bold">
                {question.correctAnswer}
            </Badge>
        </Group>
    </Card>
);
};

export default QuestionCard