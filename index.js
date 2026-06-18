const express = require("express");
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Base de datos temporal en memoria
let transacciones = [];
let siguienteId = 1;

const TIPO_VALIDOS = ['GASTO', 'INGRESO', 'RETIRO CAJERO', 'PRÉSTAMO DADO', 'PRÉSTAMO RECIBIDO', 'COBRO RECUPERADO'];
// Ruta prueba
app.get("/", (req, res) => {
    res.json({ message: "Finance tracker API" });
});

// Get /transacciones - ver todas
app.get("/transacciones", (req, res) => {
    res.json(transacciones);
});

//Post /transacciones - agregar nueva
app.post("/transacciones", (req, res) => {
    const { fecha, descripcion, categoria, tipo, monto, metodo, aDeQuien, notas} = req.body;

    if (!TIPO_VALIDOS.includes(tipo)) {
        return res.status(400).json({ error: "Tipo no valido", tiposPermitidos: TIPO_VALIDOS });
}


    const nuevaTransaccion = {
        id: siguienteId++,
        fecha,
        descripcion,
        categoria,
        tipo,
        monto,
        metodo,
        aDeQuien,
        notas
    };
    transacciones.push(nuevaTransaccion);
    res.status(201).json(nuevaTransaccion);
});


// Delete /transacciones/:id - eliminar por id
app.delete("/transacciones/:id", (req, res) => {
    const id = parseInt(req.params.id);
    transacciones = transacciones.filter(t => t.id !== id);
    res.json({ message: "Transacción eliminada" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo http://localhost:${PORT}`);
});
