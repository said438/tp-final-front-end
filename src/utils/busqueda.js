export function buscarObjetosPorNombre(elementos, textoBuscado) {
    const elementosEncontrados = elementos.filter(elemento => {
        return elemento.nombre
            .trim()
            .toLowerCase()
            .includes(textoBuscado.toLowerCase());
    });

    return elementosEncontrados;
};