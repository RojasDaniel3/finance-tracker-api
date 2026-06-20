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

// Put /transacciones/:id - editar por id
app.put("/transacciones/:id", (req, res) => {
    const { fecha, descripcion, categoria, tipo, monto, metodo, aDeQuien, notas} = req.body;
    const id = parseInt(req.params.id);
    const index = transacciones.findIndex(t => t.id === id);
    transacciones[index].fecha = fecha;
    transacciones[index].descripcion = descripcion;
    transacciones[index].categoria = categoria;
    transacciones[index].tipo = tipo;
    transacciones[index].monto = monto;
    transacciones[index].metodo = metodo;
    transacciones[index].aDeQuien = aDeQuien;
    transacciones[index].notas = notas;

    res.json(transacciones[index])
})


// Get /transacciones/:id traer informacion por id

app.get("/transacciones/:id", (req, res) => {
    const id  = parseInt(req.params.id);
    const index = transacciones.findIndex(t => t.id === id);
    res.json(transacciones[index]);
})


app.listen(PORT, () => {
    console.log(`Servidor corriendo http://localhost:${PORT}`);
});
