import {Pokemon} from "/src/models/objPokemon.js"

export function mostrarCartas(cartas){
    const listaCartas = document.getElementById("lista-cartas");
    
    listaCartas.innerHTML = "";

    cartas.map(carta => {
        listaCartas.innerHTML += `
            <li class="col">
                <div id="carta-${carta.id}" class="card h-100">
                    <img src="${carta.urlImagen}" class="card-img-top" alt="${carta.nombre}">
                </div>
            </li>
            `;
    });
}