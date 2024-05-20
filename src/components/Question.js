import { useContext } from 'react';
import Answer from './Answer'
import { QuizContext } from '../contexts/Quiz';

const Question = ({questions}) => {
const [quizState, dispatch] = useContext(QuizContext);
const currentQues = quizState.questions[quizState.currentQuesIndex]
console.log('currentQuestion', currentQues)
console.log('Question', quizState)
    return (
        <div>
            <div className="question">{currentQues.question}</div>
            <div className='answers'>
                {quizState.answers.map((answer, index) => (
                    <Answer 
                    answerText={answer} 
                    key={index} 
                    index = {index}
                    currentAnswer = {quizState.currentAnswer}
                    correctAnswer = {currentQues.correctAnswer}
                    onSelectAnswer={(answerText) => 
                        dispatch({type: 'SELECT_ANSWER', payload: answerText})
                    }
                    />
                ))}
            </div>
        </div>       
    )
};
export default Question