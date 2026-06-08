export async function buscarPokemons(event, listaPokemons) {
    const textoBuscado = event.target.value.toLowerCase();

    console.log("Texto de busqueda: " + textoBuscado);

    if(textoBuscado.trim() === ""){
        console.log("Texto de busqueda vacio -> Salir");
        return;
    }

    mostrarPokemons(obtenerPokemonsBuscados(textoBuscado, listaPokemons));
};

//Funciones auxiliares
function obtenerPokemonsBuscados(textoDeBusqueda, listaPokemons){
    const ulListaPokemons = document.getElementById("lista-Pokemons");

    return Array.from(listaPokemons).filter(pokemon => {
        return pokemon.nombre
            .trim()
            .toLowerCase()
            .startsWith(textoDeBusqueda);
    });
}

/*
Cordenadas:<br>
latitud: ${pokemon.centroide.lat}<br>
longitud: ${pokemon.centroide.lon}
*/ 