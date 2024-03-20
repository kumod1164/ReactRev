import {legacy_createStore} from "redux";
import quizReducer from './reducers';

const store = legacy_createStore(quizReducer);

export default store;
