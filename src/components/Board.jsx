import PokemonCard from "./Card"

export default function Board({ pokemons, checkPokemon }) {
  return (
    <div className='container'>
      {pokemons.map(pokemon => {
        return (
          <PokemonCard 
            key={pokemon.id}
            id={pokemon.id}
            changeOrder={checkPokemon}
            source={pokemon.image}
            name={pokemon.name}
          />
        );
       })
      }
    </div>
  )
} 