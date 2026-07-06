export function mostrarPokemons(pokemons){
    const carruselPokemons = document.querySelector(".carousel-inner");
    
    carruselPokemons.innerHTML = `
        <div class="carousel-item active">
            <img src="${pokemons[0].urlImagen}" class="d-block w-100" alt="${pokemons[0].nombre}">
        </div>
    `;

    pokemons.shift();

    pokemons.map(pokemon => {
        carruselPokemons.innerHTML += `
            <div class="carousel-item">
                <img src="${pokemon.urlImagen}" class="d-block w-100" alt="${pokemon.nombre}">
            </div>
        `
    });
}