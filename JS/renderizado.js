export async function mostrarPokemons(nombresPokemons, urlImagenesPokemon){
    const ulListaPokemons = document.getElementById("lista-pokemons");
    const cantidadPokemons = nombresPokemons.length;
    
    ulListaPokemons.innerHTML = "";
    console.log("Lista Pokemons: ");

    for (let index = 0; index < nombresPokemons.length; index++) {
        console.log(nombresPokemons[index]);
        console.log(urlImagenesPokemon[index]);

        ulListaPokemons.innerHTML += 
            generarTarjetaDePokemon(nombresPokemons[index], urlImagenesPokemon[index]);
    }
}

//Funciones auxiliares
function generarTarjetaDePokemon(nombrePokemon, urlImagenPokemon){
    return `
        <li class="card">
        <img src="${urlImagenPokemon}" class="card-img-top" alt="pokemon">
            <div class="card-body">
                <h5 class="card-title">${nombrePokemon}</h5>
            </div>
        </li>
    `
}

export function mensajeErrorApi(){
    document.body.innerHTML = `
        <p> Hubo un error. No se pudo obtener los datos de la API. </p>
        <script src="script.js"></script>
    `
}