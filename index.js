    const express = require("express");
    const routes = require("./routes/transacciones.js")
    const app = express();
    const PORT = 3000;
   
    // Middleware para parsear JSON
    app.use(express.json());
    app.use("/", routes)



    
   
// Ruta prueba
    app.get("/", (req, res) => {
        res.json({ message: "Finance tracker API" });
    });


    app.listen(PORT, () => {
        console.log(`Servidor corriendo http://localhost:${PORT}`);
    });

