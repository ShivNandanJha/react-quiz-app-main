import { useState, useEffect } from "react";
import { resultInitalState } from "../../constants";
import "./Quiz.scss";
import AnswerTimer from "../AnswerTimer/AnswerTimer";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx]             = useState(null);
  const [answer, setAnswer]                   = useState(null);
  const [result, setResult]                   = useState(resultInitalState);
  const [showResult, setShowResult]           = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  

  const [randomQuestions, setRandomQuestions] = useState(shuffleArray(questions).slice(0, 10)
  );

  const { question, choices, correctAnswer, type } = 
    randomQuestions[currentQuestion % 10];

  const onAnwswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = (finalAnswer) => {
    setAnswerIdx(null);
    setShowTimer(false);

    setResult((prev) =>
      finalAnswer
        ? {
            ...prev,
            score         : prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestion !== randomQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setRandomQuestions(shuffleArray(questions).slice(0, 10));
      setShowResult(true);
    }
    setTimeout(() => {
      setShowTimer(true);
    });
  };

  const onTryAgain = () => {
    setResult(resultInitalState);
    setRandomQuestions(shuffleArray(questions).slice(0, 10));
    setShowResult(false);
  };

  const handleTimeUp = () => {
    setAnswer(false);
    onClickNext(false);
  };

  const getanswerUI = () => {
    if (type === "FIB") {
      return <input />;
    } else {
      return (
        <ul>
          {choices.map((choice, index) => (
            <li
              onClick   = {() => onAnwswerClick(choice, index)}
              key       = {choice}
              className = {answerIdx === index ? "selected-answer" : null}
            >
              {choice}
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div className = "quiz-container">
      {!showResult ? (
        <>
          {showTimer && <AnswerTimer duration={10} onTimeUp={handleTimeUp} />}

          <span className = "active-question-no">{currentQuestion + 1}</span>
          <span className = "total-question">/10</span>
          <h2>{question}</h2>
          {getanswerUI()}
          <div    className = "footer">
          <button onClick   = {() => onClickNext(answer)} disabled = {answerIdx === null}>
              {currentQuestion === 9 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className = "result">
          <h3>Result</h3>
          <p className = "totalQuestion">
            Total Questions: <span>10</span>
          </p>
          <p className = "totalScore">
            Total Score: <span>{result.score}</span>

          </p>
          <p className = "correctAnswer">
            Correct Answers: <span>{result.correctAnswers}</span>
          </p>
          <p className="wrongAnswer">
            Wrong Answers: <span>{result.wrongAnswers}</span>
          </p>
          <button onClick={onTryAgain}>Try again</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
