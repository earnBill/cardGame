export default function ScoreBars({bestScore, currentScore}) {
  return (
    <div className="score-board">
      <h2>Current Score:  <span>{currentScore}</span> </h2>
      <h2>Best Score :  <span>{bestScore}</span> </h2>
      
    </div>
  )
}