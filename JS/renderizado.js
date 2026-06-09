export async function mostrarPokemons(pokemons){
    const listaPokemons = document.getElementById("lista-pokemons");
    
    listaPokemons.innerHTML = "";

    pokemons.map(pokemon => {
        listaPokemons.innerHTML += generarTarjetaPokemon(pokemon);
    });
}
        
//Funciones auxiliares
function generarTarjetaPokemon(pokemon){
    return `
    <!--Tarjeta pokemon-->
    <li id="pokemon-${pokemon.id}" class="card w25" data-bs-toggle="modal" data-bs-target="#tarjeta-pokemon-expandida">
        <img src="${pokemon.urlImagen}" class="card-img-top" alt="${pokemon.nombre}">
        <div class="card-body">
            <h5 class="card-title">${pokemon.nombre}</h5>
        </div>
    </li>
    `
}

export function actualizarModalPokemon(pokemon){
    document.getElementById("modal-titulo").textContent = pokemon.nombre;
    document.getElementById("modal-img").setAttribute("src", pokemon.urlImagen);
    document.getElementById("modal-img").setAttribute("alt", pokemon.urlImagen);
    console.log("Se actualizo el Modal");
}

//Función global para hacerle saber al usuario que hubo un error con la API
export function mostrarMensajeErrorApi(){
    document.body.innerHTML = `
        <p> Hubo un error. No se pudo obtener los datos de la API. </p>
        <script src="script.js"></script>
    `
}