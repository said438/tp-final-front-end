export function buscarCartas(cartas, textoBuscado) {
    const pokemonsEncontrados = cartas.filter(carta => {
        return carta.nombre
            .trim()
            .toLowerCase()
            .includes(textoBuscado.toLowerCase());
    });

    return pokemonsEncontrados;
};