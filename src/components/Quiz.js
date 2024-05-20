import { useContext, useEffect } from "react";
import Question from "./Question"
import { QuizContext } from "../contexts/Quiz";


const Quiz = () => {
    //to get global property
    const [quizState, dispatch] = useContext(QuizContext);
    const apiUrl = "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986";
    console.log('quizState', quizState)
    
    //to fetch data from API
    useEffect(() => {
        if(quizState.questions.length > 0 || quizState.error){
            return;
        }
        console.log("On initialize");
        fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            console.log("data", data);
            dispatch({type: "LOADED_QUESTIONS", payload: data.results});
        }).catch(err => {
            console.log("Error", err.message);
            dispatch({type: "SERVER_ERROR", payload: err.message});
        })
    });


    
    return (
        <div className="quiz">
            {quizState.error && (
                <div className="results">
                    <div className="congratulations">Server Error</div>
                    <div className="results-info">
                        <div>{quizState.error}</div>
                    </div>
                </div>
            )}
            {quizState.showResults && (
                <div className="results">
                    <div className="congratulations">Congratulations</div>
                    <div className="results-info">
                        <div>You have completed the quiz</div>
                        <div>You have got {quizState.correctAnswerCount} of {" "} {quizState.questions.length} correct</div>
                    </div>
                    <div className="next-button" onClick={() => dispatch({type: 'RESTART'})}>Restart</div>
                </div>
            )}
           {!quizState.showResults && quizState.questions.length > 0 && (
            <div>
                <div className="score">Question {quizState.currentQuesIndex+1}/
                {quizState.questions.length}</div>
                <Question />
                <div className="next-button" onClick={() => dispatch({type: 'NEXT_QUESTION'})}>
                    Next Question
                </div>
            </div>
        )}
        </div>    
    )
}
export default Quiz