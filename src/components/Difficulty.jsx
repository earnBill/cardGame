import { div, h2 } from "framer-motion/client";

export default function Difficulty({easyImg, mediumImg, hardImg, playEasy, playMedium, playHard, visible}) {
    return (        
      <div className="main-container" style={{display:{visible}}}>
        <p className="intro">Select pokemons each turn to increase your score. But beware — pick the same one twice, and it's game over!</p>
        <h2 >Choose Difficulty:</h2>        
         <div className="difficulty-container">
          <div className="choose-container">
            <div 
              className="difficulty" 
              style={{backgroundImage:`url(${easyImg})`}}
              onClick={playEasy}
            > 
            </div>
            <h2>Easy</h2>
            <p>10 Cards, beginner friendly</p>
          </div>
          <div className="choose-container">
            <div 
              className="difficulty" 
              style={{backgroundImage:`url(${mediumImg})`}}
              onClick={playMedium}
            >
            </div>
            <h2>Medium</h2>
             <p>15 Cards, balanced challenge</p>
          </div>
          <div className="choose-container">
            <div 
              className="difficulty"
              style={{backgroundImage:`url(${hardImg})`}} 
              onClick={playHard}
            >
            </div>
            <h2>Hard</h2>
            <p>20 Cards, for memory masters</p>  
          </div>  
          
        </div>
      </div>
    )
}