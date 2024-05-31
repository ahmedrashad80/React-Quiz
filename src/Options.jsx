function Options({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""}
           ${
             hasAnswer
               ? index === answer
                 ? answer === question.correctOption
                   ? "correct"
                   : "wrong"
                 : index === question.correctOption
                 ? "correct"
                 : "wrong"
               : ""
           } `}
          disabled={hasAnswer}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
          {answer === index ? (
            answer === question.correctOption ? (
              <span className="correctAnswer">Correct</span>
            ) : (
              <span className="correctAnswer"> Wrong</span>
            )
          ) : (
            ""
          )}
        </button>
      ))}
    </div>
  );
}

export default Options;
