import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { numQuestions, totalPoints, points, index, answer } = useQuiz();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints} points
      </p>
    </header>
  );
}

export default Progress;
