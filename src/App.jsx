import { useState, useEffect } from 'react';
import PokemonCard from './components/Card';
import Header from './components/Header';
import ScoreBars from './components/Score';
import Difficulty from './components/Difficulty';
import LoseBox from './components/Lose';
import Board from './components/Board';
import WinBox from './components/Win';


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [checkArray, setCheckArray] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [pokemonNum, setPokemonNum] = useState(10);
  const [displayDifficulty, setDisplayDifficulty] = useState(true);
  const [lose, setLose] = useState(false);
  const [win, setWin] = useState(false);

  const serverUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonNum}`;

  useEffect(()=> {
    async function getPokemon() {
      try {
        let response = await fetch(serverUrl);
        let pokemonList = await response.json();
        console.log(pokemonList.results);
        // let newResponse = await fetch(pokemonList.results[0].url);
        // let pokemonImage = await newResponse.json();
        // console.log(pokemonImage.sprites.front_default);
        // let imageUrl = pokemonImage.sprites.front_default;
        const urlList = pokemonList.results.map(pokemon => {
          const id = pokemon.url.split('/').filter(Boolean).pop();
          console.log(id);
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          return {id, name: pokemon.name, image}
        })
        setPokemons(urlList)
        console.log(urlList);
      } catch(err) {
        console.log(err);
      }
    }
    getPokemon();
  },[serverUrl]) 

  function randomOrder(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      //destructuring 
      // [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      let temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
      // console.log(shuffled[i]);
    }
    // console.log(shuffled);
    setPokemons(shuffled);
  }

  function checkPokemon(e) {
    // console.log(e.target.dataset.id)
    console.log(checkArray);
    const pokemon = e.target.dataset.id;
    console.log(pokemon);
    
    if (checkArray.includes(pokemon)) {
      console.log('Wrong choice!!!!!')
      checkBestScore();
      setLose(true);
    } else {
      randomOrder(pokemons);
      setCheckArray([...checkArray, pokemon]);
      increaceScore();
    }
  }

  function increaceScore() {
    console.log("current score: " + currentScore)
    let score = currentScore;
    score++
    console.log("score:" + score)
    setCurrentScore(score);
    if (score===pokemonNum) {
      setWin(true);
    } 
  }

  function checkBestScore() {
    if ( bestScore < currentScore ) {
        setBestScore(currentScore);
      }
  }

  function playEasy() {
    console.log('easy');
    setPokemonNum(10);
    setDisplayDifficulty(false);
  }

  function playMedium() {
    console.log('medium');
    setPokemonNum(15);
    setDisplayDifficulty(false);
  }

  function playHard() {
    console.log('hard');
    setPokemonNum(20);
    setDisplayDifficulty(false);
  }

  function resetGame() {
    setCheckArray([]);
    setCurrentScore(0);
  }

  function playAgain() {
    console.log('play again');
    randomOrder(pokemons);
    resetGame();
    setLose(false);
    setWin(false);
  }

  function backHome() {
    console.log('back to home');
    setLose(false);
    setWin(false);
    resetGame();
    setDisplayDifficulty(true);
  }

  return (
    <>
      <Header/>
      {displayDifficulty && <Difficulty
        playEasy={playEasy}
        playMedium={playMedium}
        playHard={playHard}
        easyImg={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`}
        mediumImg={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png`}
        hardImg={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png`}
      />}
      {!displayDifficulty && 
        <ScoreBars
          bestScore={bestScore}
          currentScore={currentScore}
      />
      }
      
      {!displayDifficulty && 
        <Board
          pokemons={pokemons}
          checkPokemon={checkPokemon}
        />
      }
      {lose && 
        <LoseBox
          score={currentScore}
          highScore={bestScore}
          playAgain={playAgain}
          backHome={backHome}
        />
      }
      {win && 
        <WinBox
          score={currentScore}
          highScore={bestScore}
          playAgain={playAgain}
          backHome={backHome}
        />
      }
    </>
  )

}

export default App
