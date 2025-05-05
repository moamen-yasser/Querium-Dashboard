// Utility function to transform the quiz data
export const transformQuizData = (inputData) => {
    console.log(inputData);
    try {
        // Handle both string and array input
        const fullString = Array.isArray(inputData) ? inputData.join('\n') : inputData;
        
        // Extract the JSON content between the markers
        const jsonStart = fullString.indexOf('{');
        const jsonEnd = fullString.lastIndexOf('}') + 1;
        const jsonContent = fullString.slice(jsonStart, jsonEnd);
        
        // Parse the JSON data
        const quizData = JSON.parse(jsonContent);
        
        // Process each question
        return quizData.questions.map(question => {
            const questionText = question.question || question.statement;
            
            const answers = question.type === 'multiple_choice' 
                ? question.options 
                : ['True', 'False'];
            
            let correctAnswer;
            if (question.type === 'multiple_choice') {
                correctAnswer = question.correct_answer;
            } else {
                correctAnswer = question.correct_answer ? 'True' : 'False';
            }
            
            return {
                type: question.type,
                question: questionText,
                answers: answers,
                correctAnswer: correctAnswer
            };
        });
        
    } catch (error) {
        console.error('Error processing quiz questions:', error.message);
        return [];
    }
};