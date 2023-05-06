import "./AnswerTimer.scss";

import React, { useEffect, useRef, useState } from "react";

const AnswerTimer = ({ duration, onTimeUp }) => {
  const [counter, setCounter] = useState(0);
  const [progressbar, setProgressBar] = useState(0);

  const intervalRef = useRef();
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    setProgressBar(100 * (counter / duration));
    if (counter === duration) {
      clearInterval(intervalRef.current);
      setTimeout(() => {
        onTimeUp();
      }, 1000);
    }
  }, [counter]);

  return (
    <div className="answer-timer-container">
      <div
        style={{
          width: `${progressbar}%`,
          backgroundColor: `${
            progressbar < 40
              ? "lightgreen"
              : progressbar < 70
              ? "orange"
              : "red"
          }`,
        }}
        className="progress"
      >
      
      </div>
    </div>
  );
};

export default AnswerTimer;
