import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import QuizSetup from './Components/QuizSetup';
import QuizPage from './Components/QuizPage';
import Leaderboard from './Components/LeaderBoard';
import { Provider } from 'react-redux';
import store from './Redux/store'
import { ChakraProvider } from '@chakra-ui/react';


const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router> 
          <Routes>
            <Route exact path="/" element={<QuizSetup />} /> 
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
