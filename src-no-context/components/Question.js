import Options from "./Options";

function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      {console.log(question)}
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
