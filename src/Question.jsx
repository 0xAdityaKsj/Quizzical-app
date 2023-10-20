import React from 'react';

export default function Question(props) {

  const options = [props.correctAnswer, ...props.incorrectAnswers].sort(() => Math.random() - 0.5);


  return (
    <>
      <div className='quiz-template'>
        <h1>{props.question}</h1>
        <form>
          {options.map((option, index) => (
            <div className="radio-toolbar" key={index}>
              <input type="radio" id={`option-${index}-${props.index}`} name={`answer-${props.index}`} value={option} />
              <label htmlFor={`option-${index}-${props.index}`}>{option}</label>
            </div>
          ))}
        </form>
      </div>

    </>
  );
}
