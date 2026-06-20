const express = require("express");
const router = express.Router();


    // Get /transacciones - ver todas
    router.get("/transacciones", (req, res) => {
        res.json(transacciones);
    });

    //Post /transacciones - agregar nueva
    router.post("/transacciones", (req, res) => {
        const { fecha, descripcion, categoria, tipo, monto, metodo, aDeQuien, notas} = req.body;

        if (!TIPO_VALIDOS.includes(tipo)) {
            return res.status(400).json({ error: "Tipo no valido", tiposPermitidos: TIPO_VALIDOS });
    }


        const nuevaTransaccion = {
            id: obtenerSiguienteId(),
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
        guardarTransacciones()
        res.status(201).json(nuevaTransaccion);
    });


    // Delete /transacciones/:id - eliminar por id
    router.delete("/transacciones/:id", (req, res) => {
        const id = parseInt(req.params.id);
        transacciones = transacciones.filter(t => t.id !== id);
        guardarTransacciones()
        res.json({ message: "Transacción eliminada" });
    });

    // Put /transacciones/:id - editar por id
    router.put("/transacciones/:id", (req, res) => {
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
        guardarTransacciones()
        res.json(transacciones[index])
    })


    // Get /transacciones/:id traer informacion por id

    router.get("/transacciones/:id", (req, res) => {
        const id  = parseInt(req.params.id);
        const index = transacciones.findIndex(t => t.id === id);
        res.json(transacciones[index]);
    })

module.exports = router
const { transacciones, obtenerSiguienteId, TIPO_VALIDOS, guardarTransacciones } = require('../data/transaccionesData');