export function buscarNombresPokemons(listaNombresPokemons, textoBuscado) {
    const pokemonsEncontrados = listaNombresPokemons.filter(nombre => {
        return nombre
            .trim()
            .toLowerCase()
            .includes(textoBuscado.toLowerCase());
    });

    console.log(pokemonsEncontrados);
    

    return pokemonsEncontrados;
};