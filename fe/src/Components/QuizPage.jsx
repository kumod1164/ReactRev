import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { answerQuestion, nextQuestion, finishQuiz } from '../Redux/action';
import Question from './Question';

const QuizPage = ({ questions }) => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(null); // State to track the remaining time
  const [remainingTime, setRemainingTime] = useState(null); 
  const [answered, setAnswered] = useState(false); 

  useEffect(() => {
    // Start the timer when a new question is rendered
    if (questions && questions.length > 0) {
      const questionTimeLimit = getQuestionTimeLimit(questions[currentQuestionIndex].difficulty);
      setRemainingTime(questionTimeLimit);
      setTimer(
        setInterval(() => {
          setRemainingTime((prevTime) => {
            if (prevTime === 0) {
              clearInterval(timer);
              handleNextQuestion(); // Automatically proceed to the next question when time runs out
              return prevTime;
            }
            return prevTime - 1;
          });
        }, 1000)
      );
    }
   
    return () => {
      clearInterval(timer);
    };
  }, [questions,timer]); // Re-run effect when questions change

  const handleAnswerQuestion = (answerIndex) => {
    dispatch(answerQuestion(answerIndex));
    setAnswered(true); 
    clearInterval(timer);
  };

  const handleNextQuestion = () => {
    dispatch(nextQuestion());
    setAnswered(false);
    clearInterval(timer); 
  };

  const handleFinishQuiz = () => {
    dispatch(finishQuiz());
  };

  const getQuestionTimeLimit = (difficulty) => {
    // Define time limits for each difficulty level (in seconds)
    switch (difficulty) {
      case 'easy':
        return 30;
      case 'medium':
        return 20;
      case 'hard':
        return 10;
      default:
        return 30; // Default to 30 seconds if difficulty is not specified
    }
  };

  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex);

  if (!questions || questions.length === 0) {
    return <div>No questions available</div>;
  }

  if (currentQuestionIndex >= questions.length) {
  
    return <div>Quiz finished</div>;
  }

  return (
    <div>
      <h1>Quiz Page</h1>
      <div>Remaining Time: {remainingTime} seconds</div>
      {questions[currentQuestionIndex] && (
        <Question
          questionText={questions[currentQuestionIndex].questionText}
          answerOptions={questions[currentQuestionIndex].answerOptions}
          onAnswerQuestion={handleAnswerQuestion}
          onNextQuestion={handleNextQuestion}
          onFinishQuiz={handleFinishQuiz}
        />
      )}
      {answered && (
        <button onClick={handleNextQuestion}>Next</button>
      )}
    </div>
  );
};

export default QuizPage;
