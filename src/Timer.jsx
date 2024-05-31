import { useEffect } from "react";

function Timer({ dispatch, secondRemaining }) {
  const minutes = Math.floor(secondRemaining / 60);
  const seconds = secondRemaining % 60;
  useEffect(
    function () {
      const count = setInterval(() => {
        dispatch({ type: "tick" });
        if (secondRemaining === 0) {
          dispatch({ type: "finish" });
          clearInterval(count);
        }
      }, 1000);
      return () => clearInterval(count);
    },
    [dispatch, secondRemaining]
  );

  return (
    <div className="timer">
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
