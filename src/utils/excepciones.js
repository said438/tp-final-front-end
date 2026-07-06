//Función global para hacerle saber al usuario que hubo un error con la API
export function mostrarMensajeErrorApi(){
    document.body.innerHTML = `
        <p> Hubo un error. No se pudo obtener los datos de la API. </p>
        <script src="script.js"></script>
    `;
}