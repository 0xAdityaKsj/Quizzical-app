import React, { useEffect } from "react";
import he from 'he';
import Question from "./Question";

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import { Grid } from 'react-loader-spinner'

// Utility function to decode HTML entities
const decodeHTML = (html) => {
    return he.decode(html);
}

export default function QuizPage() {
    const [quizData, setQuizData] = React.useState(null);
    const [userAnswers, setUserAnswers] = React.useState({})
    const [score, setScore] = React.useState(0)
    const [endQuiz, setEndQuiz] = React.useState(false)
    const { width, height } = useWindowSize()


    const fetchQuizData = async () => {
        try {
            const response = await fetch("https://opentdb.com/api.php?amount=7");
            const data = await response.json();
            setQuizData(data);  // Update the state with the quiz data
        } catch (error) {
            console.error("Error fetching quiz data:", error);
        }
    };

    useEffect(() => {
        fetchQuizData();
    }, []);


    function handleAnswers() {
        setEndQuiz(prevEndQuiz => !prevEndQuiz);
        let newCorrectness = {}
        Object.keys(userAnswers).forEach((questionIndex) => {
            if (userAnswers[questionIndex] === quizData.results[questionIndex].correct_answer) {
                console.log(`Question ${questionIndex} is correct`);
                setScore(prevScore => prevScore + 1)
            } else {
                console.log(`Question ${questionIndex} is incorrect`);
            }
        });
    }

    function newQuiz() {
        // Reset the states
        setQuizData(null);
        setUserAnswers({});
        setScore(0);
        setEndQuiz(false);

        // Fetch new quiz data
        fetchQuizData();
    }


    const updateUserAnswer = (questionIndex, selectedOption) => {
        setUserAnswers({ ...userAnswers, [questionIndex]: selectedOption })
    }

    console.log(userAnswers)

    return (
        <div className="quiz-page">
            {quizData && quizData.results ? (
                <>
                    {quizData.results.map((question, index) => (
                        <Question
                            key={index}
                            index={index}
                            question={decodeHTML(question.question)}
                            correctAnswer={decodeHTML(question.correct_answer)}
                            incorrectAnswers={question.incorrect_answers.map(answer => decodeHTML(answer))}
                            updateUserAnswer={updateUserAnswer}
                            endQuiz={endQuiz}
                            selectedOption={userAnswers[index]}
                        />
                    ))}
                    <div className="buttons-score">
                        {!endQuiz && <button onClick={handleAnswers} className="find-ans-btn">Find answers</button>}
                        {endQuiz && <button onClick={newQuiz}>New Quiz</button>}
                        {endQuiz && `Your Score : ${score}/10`}

                    </div>

                    {(endQuiz && score > 3) && <Confetti
                        width={width}
                        height={height}
                    />}
                </>
            ) : (
                <>
                    <div className="loading">
                        <Grid
                            height="80"
                            width="80"
                            color="#293264"
                            ariaLabel="grid-loading"
                            radius="12.5"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                        <p>Cooking Questions for you...</p>
                    </div>


                    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="270" viewBox="0 0 158 141" fill="none" className="svg1">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M63.4095 81.3947C35.1213 50.8508 -2.68211 21.7816 1.17274 -19.6933C5.43941 -65.599 39.854 -105.359 82.4191 -123.133C122.797 -139.994 170.035 -130.256 205.822 -105.149C235.947 -84.0141 236.823 -43.8756 246.141 -8.27104C256.17 30.0508 282.521 70.8106 260.501 103.779C237.538 138.159 188.991 143.432 147.931 138.768C112.318 134.723 87.7505 107.677 63.4095 81.3947Z" fill="#FFFAD1" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="160" viewBox="0 0 148 118" fill="none" className="svg2">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z" fill="#DEEBF8" />
                    </svg>
                </>

            )}
        </div>
    );

}
