import { Pokemon } from '/src/models/objPokemon.js'

export default {
    props:{
        pokemon:{
            type: Pokemon,
            required: true
        }
    },

    template: `
    <slot>
        <!--Tarjeta pokemon expandida actualizable con Vue (en proceso)-->
        <div id="tarjeta-pokemon-expandida" class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 id="modal-titulo" class="modal-title">{{pokemon.nombre}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img id="modal-img" class="card-img-top" :src="pokemon.urlImagen" :alt="pokemon.nombre">

                        </img>
                        <ul>
                            <li>Altura: {{pokemon.altura}}</li>
                            <li>Peso: {{pokemon.peso}}</li>
                            <li>Tipo/s: {{pokemon.tipos}}</li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </slot>
    `
}