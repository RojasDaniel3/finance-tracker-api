const {TIPO_VALIDOS} = require("../data/transaccionesData.js")
function validarTransacciones(datos){
            const {fecha, descripcion, tipo, monto} = datos;
            
            if (!TIPO_VALIDOS.includes(tipo)) {
                return {valido: false, error: "Tipo no valido", tiposPermitidos: TIPO_VALIDOS };
            }
        
            if (typeof monto !== "number" || monto <= 0){
                return {valido: false, error: "No es numero o es menor que cero."};
            }
    
            if (!descripcion){
                return {valido: false, error: "No puede estar vacia."};
            }

            if (!fecha){
                return {valido: false, error: "No puede estar vacio la fecha."};
            }
            return {valido: true};
        }

module.exports = {validarTransacciones}