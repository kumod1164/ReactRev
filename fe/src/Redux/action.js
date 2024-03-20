
export const START_QUIZ = 'START_QUIZ';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const FINISH_QUIZ = 'FINISH_QUIZ';

export const startQuiz = (quizSetup) => ({
  type: START_QUIZ,
  payload: quizSetup,
});

export const answerQuestion = (answerIndex) => ({
  type: ANSWER_QUESTION,
  payload: answerIndex,
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const finishQuiz = () => ({
  type: FINISH_QUIZ,
});
