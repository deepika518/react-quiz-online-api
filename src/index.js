import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App';
import Quiz from './components/Quiz';
import './index.css'
import { QuizProvider } from './contexts/Quiz';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <QuizProvider>
      <Quiz />
    </QuizProvider>
 
);

//Quiz component inside React.StrictMode will be the first component to be rendered.
//previously App was the main component, inside which the whole application would have been rendered.
