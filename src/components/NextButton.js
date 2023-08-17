import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
  const { answer, dispatch, index, numQuestions } = useQuiz();

  if (answer === null) return null;

  return (
    <div>
      {index < numQuestions - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )}
      {index === numQuestions - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      )}
    </div>
  );
}

export default NextButton;
