import reactLogo from "./assets/react.svg";
import "./App.css";
import Data from "./Data";
import { useEffect, useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initState = {
  questions: [],

  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * 20,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, status: "finish" };
    case "restart":
      return { ...initState, status: "ready", questions: state.questions };

    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        // status: state.secondRemaining === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("action not supported");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initState);
  const numQuestions = questions.length;

  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  console.log(totalPoints);
  useEffect(function () {
    fetch("https://react-quiz-json-server-4.onrender.com/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <>
      <header className="header">
        <img src={reactLogo} className="logo react" alt="React logo" />
        <h1>THE REACT QUIZ</h1>
      </header>
      <Data>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              points={points}
              numQuestions={numQuestions}
              index={index}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <NextButton
                numQuestions={numQuestions}
                dispatch={dispatch}
                index={index}
                answer={answer}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            dispatch={dispatch}
          />
        )}
      </Data>
    </>
  );
}
