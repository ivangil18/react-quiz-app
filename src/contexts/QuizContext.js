import { createContext, useContext, useEffect, useReducer } from "react";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "quiz/started":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const gainedPoints =
        state.questions.at(state.index).correctOption === action.payload
          ? state.questions[state.index].points
          : 0;
      return {
        ...state,
        answer: action.payload,
        points: state.points + gainedPoints,
      };
    case "nextQuestion":
      return { ...state, index: state.index++, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "reset":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}

// 1) Create context
const QuizContext = createContext();

// 2) Create Provider and returned with the needed values
function QuizProvider({ children }) {
  const [
    { questions, status, index, points, answer, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  const totalPoints = questions.reduce(
    (partialSum, a) => partialSum + a.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        points,
        answer,
        highscore,
        secondsRemaining,
        numQuestions,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

// 3) Create custom hook to provide state all over the application
function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("Context used outside of Quiz provider");
}

// 4) Use export naming to broacast the Provider and the Custom Hook
export { QuizProvider, useQuiz };
