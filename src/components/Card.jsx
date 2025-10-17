export default function PokemonCard({id, changeOrder, source, name }) {
    return (
        <div className="pokemon-container">
        <div className="pokemon-card" data-id={id} onClick={changeOrder} style = {{backgroundImage:`url(${source})`}}>
        </div>
          <p>{name}</p>
        </div>
        
    )
}