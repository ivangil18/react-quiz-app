import { useQuiz } from "../contexts/QuizContext";

function Options() {
  const { questions, index, dispatch, answer } = useQuiz();
  const currOptions = questions[index].options;
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {currOptions.map((option, i) => (
        <button
          className={`btn btn-option 
            ${i === answer ? "answer" : ""} 
            ${
              hasAnswered
                ? i === questions[index].correctOption
                  ? "correct"
                  : "wrong"
                : null
            }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
