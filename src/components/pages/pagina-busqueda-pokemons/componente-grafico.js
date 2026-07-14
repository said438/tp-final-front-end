
export default {
    name: 'ComponenteGrafico',

    props: {
        pokemons: {
            type: Array,
            required: true
        } 
    },
    
    //Actualiza los graficos al cargar más pokemons
    watch:{
        pokemons(nuevosPokemons){
            this.mostrarGraficos();
        }
    },

    methods: {
        mostrarGraficos(){
            const cantidadDeCadaTipoDePokemon = this.obtenerCantidadesDeTiposDePokemons(this.pokemons);
            const tipos = Object.keys(cantidadDeCadaTipoDePokemon);
            const cantidades = Object.values(cantidadDeCadaTipoDePokemon);

            //Inicializar el objeto echart
            let myChart = echarts.init(document.getElementById("grafico-barras"));

            //Hace que el grafico sea responsive
            window.addEventListener('resize', function (){
                myChart.resize();
            })

            //Especificar los datos del grafico
            let option = {
                title: {
                    text: 'Cantidad de tipos de pokemon'
                },
                tooltip: {},
                legend: {
                    data: ['tipos de pokemon']
                },
                xAxis: {
                    data: tipos
                },
                yAxis: {},
                series: [
                    {
                        name: 'tipo de pokemon',
                        type: 'bar',
                        data: cantidades
                    }
                ]
            };

            //Mostrar el grafico
            myChart.setOption(option);
        },

        //Obtiene la cantidad de cada tipo de pokemon
        obtenerCantidadesDeTiposDePokemons(){
            const contador = 0;

            //Objeto que almacena y lleva la cuenta de cada tipo
            function TiposPokemons(){}

            //Hace la operación de conteo
            this.pokemons.map(pokemon =>{
                pokemon.tipos.map(tipo =>{
                    if(!(tipo in TiposPokemons)){
                        TiposPokemons[tipo] = 1;
                    }else{
                        TiposPokemons[tipo] += 1;
                    }
                })
            });

            return TiposPokemons;
        }
    },

    template: `
        <section id="graficos">
            <h2>Graficos de Pokemons</h2>
            <div id="grafico-barras">
                <!--Genera un grafico de echart dinamicamente-->
            </div>
        </section>
    `,

    mounted(){
        this.mostrarGraficos(this.pokemons);
    }
}
