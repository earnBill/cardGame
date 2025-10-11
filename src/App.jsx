import { useState, useEffect } from 'react'

const serverUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10';

function App() {
  const [count, setCount] = useState(0)

  useEffect(()=> {
    async function getPokemon() {
      try {
        let response = await fetch(serverUrl);
        let pokemonList = await response.json();
        console.log(pokemonList.results[0]);
        let newResponse = await fetch(pokemonList.results[0].url);
        let pokemonImage = await newResponse.json();
        console.log(pokemonImage.sprites.front_default);
      } catch(err) {
        console.log(err);
      }
    }
    getPokemon();
  },[]) 

  return (
    <>
      <h1>Card Game</h1>
    </>
  )
}

export default App
