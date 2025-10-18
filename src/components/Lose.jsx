
export default function LoseBox({score, highScore}) {
  return (
    <div className="layout">
      <div className="message">
        <h1>Game Over</h1>
        <div className="message-container">
          <p>Score: <span>{score}</span></p>
          <p>High Score: <span>{highScore}</span> </p>
        </div>
        <div className="button-container">
            <button>Play Again</button>
            <button>Back to Home</button>
        </div>
      </div>
    </div>
  )
}