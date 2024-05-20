import { createContext, useReducer } from "react";
//import questions from '../data';
import { shuffleAnswers, normalizeQuestions } from "../helpers";

const initialState = {
    currentQuesIndex: 0,
    questions: [],
    showResults: false,
    //answers: shuffleAnswers(questions[0]),
    answers: [],
    currentAnswer: '',
    correctAnswerCount: 0,
    error: null
};
//func where we define how the user action must change the state. we write it outside to keep the view
//and business logic separate
const reducer = (state, action) => {
    console.log('reducer', state, action);

    switch (action.type) {
        case "SELECT_ANSWER": {
            const correctAnswerCount = 
            action.payload === state.questions[state.currentQuesIndex].correctAnswer 
            ? state.correctAnswerCount + 1 
            : state.correctAnswerCount;
            return {
                ...state,
                currentAnswer: action.payload,
                correctAnswerCount
            }
        }
        case "NEXT_QUESTION": {
            const showResults = state.currentQuesIndex === state.questions.length - 1;
            const currentQuesIndex = showResults ? state.currentQuesIndex : state.currentQuesIndex+1;
            const answers = showResults ? [] : shuffleAnswers(state.questions[currentQuesIndex]);
            return {...state, 
                    currentQuesIndex,
                    showResults,
                    answers,
                    currentAnswer: ""
                };
        }
        case "RESTART": {
            return initialState;
        }
        case "LOADED_QUESTIONS": {
            console.log("LOADED_QUESTIONS", state, action)
            const normalizedQuestions = normalizeQuestions(action.payload)
            return {
                ...state,
                questions: normalizedQuestions,
                answers: shuffleAnswers(normalizedQuestions[0])
            }
        }
        case "SERVER_ERROR": {
            return {
                ...state,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }

}

export const QuizContext = createContext();

//below QuizProvider object is available globally
export const QuizProvider = ({children}) => {
    const value = useReducer(reducer, initialState);
    console.log('state', value);
    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}