// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

import { useState, useEffect } from 'react';

const PokemonList = () => {
    const [ count, setCount ] = useState(0);
    const [ total, setTotal ] = useState(0);
    const [ pokemons, setPokemons ] = useState([]);
    
    const [ current, setCurrent ] = useState(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=0`);

    const [ next, setNext ] = useState('');
    
    useEffect(() => {
        fetch(current)
            .then(response => response.json())
            .then(data => {
                setTotal(data.count);
                setPokemons((prev) => [...prev, ...data.results]);
                setNext(data.next);
                setCount((prev) => prev + 5);
            });
    }, [current]);

    const onClickHandler = (e) => {
        setCurrent(next);
    }

    return (
        <div>
            <ul>
                {pokemons.map((pokemon) => <li key={pokemon.url}>{pokemon.name}</li>)}
            </ul>
            <p>Displaying {pokemons.length} of {total} results</p>
            {next && <button onClick={onClickHandler}>Load more</button>}
        </div>
    );
};

export default PokemonList;
