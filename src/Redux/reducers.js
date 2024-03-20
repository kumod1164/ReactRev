
import { START_QUIZ, ANSWER_QUESTION, NEXT_QUESTION, FINISH_QUIZ } from './action';

const initialState = {
  quizSetup: {},
  currentQuestionIndex: 0,
  userAnswers: [],
  showFeedback: false,
  showResult: false,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_QUIZ:
      return {
        ...state,
        quizSetup: action.payload,
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        userAnswers: [...state.userAnswers, action.payload],
        showFeedback: true,
      };
    case NEXT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        showFeedback: false,
      };
    case FINISH_QUIZ:
      return {
        ...state,
        showResult: true,
      };
    default:
      return state;
  }
};

export default quizReducer;
