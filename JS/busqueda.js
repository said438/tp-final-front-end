export function buscarPokemons(pokemons, textoBuscado) {
    const pokemonsEncontrados = pokemons.filter(pokemon => {
        return pokemon.nombre
            .trim()
            .toLowerCase()
            .includes(textoBuscado.toLowerCase());
    });

    return pokemonsEncontrados;
};