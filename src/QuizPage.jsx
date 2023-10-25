import React, { useEffect } from "react";
import he from 'he';
import Question from "./Question";

// Utility function to decode HTML entities
const decodeHTML = (html) => {
    return he.decode(html);
}

export default function QuizPage() {
    const [quizData, setQuizData] = React.useState(null);
    const [userAnswers, setUserAnswers] = React.useState({})
    const [score, setScore] = React.useState(0)
    const [endQuiz, setEndQuiz] = React.useState(false)

    const fetchQuizData = async () => {
        try {
            const response = await fetch("https://opentdb.com/api.php?amount=10");
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
                    {!endQuiz && <button onClick={handleAnswers}>Find answers</button>}

                    {endQuiz && `Your Score : ${score}/10`}
                    {endQuiz && <button onClick={newQuiz}>New Quiz</button>}

                </>
            ) : (
                <p>Loading quiz data...</p>
            )}
        </div>
    );

}
