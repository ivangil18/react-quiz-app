import { useQuiz } from "../contexts/QuizContext";

function FinishScreen() {
  const { points, totalPoints, highscore, dispatch } = useQuiz();
  const percentage = (points / totalPoints) * 100;

  let emoji;

  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage <= 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil(percentage)}%)
      </p>

      <p className="highscore">(Highscore: {highscore} points) </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
