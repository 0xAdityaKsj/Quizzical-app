import React from 'react';

export default function Question(props) {

  const [randomizedOptions, setRandomizedOptions] = React.useState([]);

  console.log("correctness:", props.correctness, "endQuiz:", props.endQuiz);


  React.useEffect(() => {
    setRandomizedOptions([props.correctAnswer, ...props.incorrectAnswers].sort(() => Math.random() - 0.5));
  }, []);


  return (
    <>
      <div className='quiz-template'>
        <h1>{props.question}</h1>
        <form>
          {randomizedOptions.map((option, index) => (
            <div className="radio-toolbar" key={index}>
              <input
                type="radio"
                disabled={props.endQuiz}
                onChange={() => props.updateUserAnswer(props.index, option)}
                id={`option-${index}-${props.index}`} name={`answer-${props.index}`}
                value={option}
              />
              <label
                htmlFor={`option-${index}-${props.index}`}
                className={
                  props.endQuiz
                    ? (
                      option === props.correctAnswer
                        ? 'correct'
                        : (option === props.selectedOption && option !== props.correctAnswer)
                          ? 'incorrect'
                          : ''
                    )
                    : ''
                }

              >
                {option}
              </label>

            </div>
          ))}
        </form>
      </div>

    </>
  );
}
