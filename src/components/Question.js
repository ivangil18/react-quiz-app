import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

function Question() {
  const { questions, index } = useQuiz();
  const currQuestion = questions[index].question;
  return (
    <div>
      <h4>{currQuestion}</h4>
      <Options />
    </div>
  );
}

export default Question;
