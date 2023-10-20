import React, { useEffect } from "react";
import he from 'he';
import Question from "./Question";

// Utility function to decode HTML entities
const decodeHTML = (html) => {
    return he.decode(html);
}

export default function QuizPage() {
    const [quizData, setQuizData] = React.useState(null);
    const [userAnswers, setUserAnswers] = React.useState([])

    useEffect(() => {
        const getQuiz = async () => {
            try {
                const response = await fetch("https://opentdb.com/api.php?amount=10");
                const data = await response.json();
                setQuizData(data);  // Update the state with the quiz data
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            }
        };

        getQuiz();
    }, []);

    function handleAnswers() {
        const checkedRadioButtons = document.querySelectorAll('input[name="answer"]:checked');
        const answers = Array.from(checkedRadioButtons).map((element) => element.value);

        setUserAnswers(answers);
        console.log(answers);
    }


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

                        />
                    ))}
                    <button onClick={handleAnswers}>Find answers</button>
                </>
            ) : (
                <p>Loading quiz data...</p>
            )}
        </div>
    );

}
