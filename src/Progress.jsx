function Progress({ points, numQuestions, index, totalPoints, answer }) {
  return (
    <>
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
        className="progress-bar"
      />
      <header class="progress">
        <p>
          Question <strong>{index + 1}</strong> / {numQuestions}
        </p>
        <p>
          <strong>{points}</strong> / {totalPoints}
        </p>
      </header>
    </>
  );
}

export default Progress;
