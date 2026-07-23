export async function consultarAPI(url){
    try{
        const respuesta = await fetch(url);
        return respuesta.json();
    }catch(ex){
        console.log(`Ocurrio un error al obtener datos de la API: ${ex}`);
        throw ex;
    }
}