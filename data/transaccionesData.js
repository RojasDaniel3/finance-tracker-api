    const fs = require('fs');


    function guardarTransacciones(){
        fs.writeFileSync("./data/transacciones.json", JSON.stringify(transacciones, null, 3))
    }

    const transaccionesVacia= fs.readFileSync('./data/transacciones.json')
    // Base de datos temporal en memoria
    let transacciones = JSON.parse(transaccionesVacia)
    let mayorId = Math.max(...transacciones.map(t => t.id));
    let siguienteId;

    if (mayorId === -Infinity) {
    siguienteId = 1;
    } else {
    siguienteId = mayorId + 1;
}
    const TIPO_VALIDOS = ['GASTO', 'INGRESO', 'RETIRO CAJERO', 'PRÉSTAMO DADO', 'PRÉSTAMO RECIBIDO', 'COBRO RECUPERADO'];

    function obtenerSiguienteId() {
    return siguienteId++;
    }

    module.exports = {transacciones, obtenerSiguienteId, TIPO_VALIDOS, guardarTransacciones}