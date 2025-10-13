import { useState, useEffect } from 'react'

const serverUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10';

function App() {
  const [count, setCount] = useState(0)
  const [pokemons, setPokemons] = useState([]);

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
  },[]) 

  return (
    <>
      <h1>Card Game</h1>
      {pokemons.map(pokemon => {
        return (
        <div key={pokemon.id}>
          <img src={pokemon.image} alt="" />
          <p>{pokemon.name}</p>
        </div>
        )
        })
      }
      
    </>
  )
}

export default App
