import React from 'react';

export default function Question(props) {

    const options = [props.correctAnswer, ...props.incorrectAnswers].sort(() => Math.random() - 0.5);


    return (
        <>
            <div className='quiz-template'>
                <h1>{props.question}</h1>
                <form>
                    {options.map((option, index) => (
                        <div key={index} className="radio-toolbar">
                            <label>
                                <input type="radio" name="answer" value={option} />
                                {option}
                            </label>
                        </div>
                    ))}
                </form>
            </div>

        </>
    );
}
