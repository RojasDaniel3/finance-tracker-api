const {TIPO_VALIDOS} = require("../data/transaccionesData.js")
function validarTransacciones(datos){
            const {fecha, descripcion, tipo, monto, aDeQuien} = datos;
            
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
            const TIPO_PRESTAMOS_VALIDOS = ["PRÉSTAMO DADO", "PRÉSTAMO RECIBIDO", "COBRO RECUPERADO"];
            if (TIPO_PRESTAMOS_VALIDOS.includes(tipo)){ 
                if (!aDeQuien){
                return {valido:false, error: "Necesito saber nombre de la persona del prestamo"}
                }
            }

            return {valido: true};
        }


module.exports = {validarTransacciones}