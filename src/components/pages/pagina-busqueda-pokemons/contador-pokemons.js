export default{

    props:{
        listaPokemons: {
            type: [],
            required: true
        }
    },

    data() {
        return {
            cantidadPokemonsEncontrados: this.listaPokemons.length
        }
    },
}