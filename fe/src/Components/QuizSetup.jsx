import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startQuiz } from '../Redux/action';
import { Button, Input, Stack, Select } from '@chakra-ui/react';
import axios from 'axios';
import QuizPage from './QuizPage'; 
const QuizSetup = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [quizStarted, setQuizStarted] = useState(false); 

  const handleStartQuiz = async () => {
    if (name && category && difficulty && numQuestions) {
      try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`);
        const questions = response.data.results;
        dispatch(startQuiz({ name, category, difficulty, numQuestions, questions }));
        setQuizStarted(true); 
      } catch (error) {
        console.error('Error fetching questions:', error);
       
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div>
      {!quizStarted ? (
        <Stack spacing={4}>
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Select placeholder="Select Category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="25">Art</option>
          </Select>
          <Select placeholder="Select Difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
          <Input placeholder="Number Of Questions" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} />
          
          <Button colorScheme="teal" onClick={handleStartQuiz}>Start Quiz</Button>
        </Stack>
      ) : (
        <QuizPage />
      )}
    </div>
  );
};

export default QuizSetup;
