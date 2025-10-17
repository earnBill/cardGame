import { useState, useEffect } from 'react';
import PokemonCard from './components/Card';
import Header from './components/Header';
import ScoreBars from './components/Score';


const serverUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10';

function App() {
  const [count, setCount] = useState(0)
  const [pokemons, setPokemons] = useState([]);
  const [checkArray, setCheckArray] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

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

  return (
    <>
      <Header/>
      <ScoreBars
        bestScore={bestScore}
        currentScore={currentScore}
      >
      </ScoreBars>
      <div className='container'>
        {pokemons.map(pokemon => {
          return (
            <PokemonCard 
              key={pokemon.id}
              id={pokemon.id}
              changeOrder={checkPokemon}
            
              source={pokemon.image}
              name={pokemon.name}
            >
            </PokemonCard>
        // <div key={pokemon.id}>
        //   <img src={pokemon.image} alt="" />
        //   <p>{pokemon.name}</p>
        // </div>
        )
        })
      }
      </div>
      
    </>
  )

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
    randomOrder(pokemons);
    const pokemon = e.target.dataset.id;
    console.log(pokemon);
    
    if (checkArray.includes(pokemon)) {
      console.log('Wrong choice!!!!!')
      setCheckArray([]);
      setCurrentScore(0);
      checkBestScore();
    } else {
      setCheckArray([...checkArray, pokemon]);
      increaceScore();
    }
  }

  function increaceScore() {
    setCurrentScore(prev => prev + 1 )
  }

  function checkBestScore() {
    if ( bestScore < currentScore ) {
        setBestScore(currentScore);
      }
  }

}

export default App
