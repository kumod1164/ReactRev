import React from 'react';
import { Button, Text } from '@chakra-ui/react';

const Question = ({ questionText, answerOptions, onAnswerQuestion, onNextQuestion, onFinishQuiz }) => {
return (
 <div>
   <Text fontSize="xl">{questionText}</Text>
   {answerOptions.map((option, index) => (
     <Button key={index} onClick={() => onAnswerQuestion(index)}>{option}</Button>
   ))}
 </div>
);
};

export default Question;