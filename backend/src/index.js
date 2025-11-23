const express = require("express");
const cors = require("cors");
const mysql = require("./database/mysql-pool");
const app = express();
const port = 3000;

require("dotenv").config();

app.use(express.json({ limit: "25mb" }));

app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// Endpoints

// Pasos para completar el endpoint:
// 1. Poner el método
// 2. Poner la ruta
// 3. Coger de los parámetros los datos que voy a necesitar
// 4. Crear la query
// 5. Crear conexión y pasar la query
// 6. Retornar los datos

// COGER RECETAS
app.get("/recipes", async (req, res) => {
    try {
        const query = "SELECT * FROM recipes WHERE deleted_at IS NULL";

        const connection = await mysql.getConnection();
        const data = await connection.query(query);
        res.json(data[0]);
    } catch {
        res.status(400).send("Algo ha ido mal");
    }
});

// COGER RECETA ESPECÍFICA
app.get("/recipe/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const query = "SELECT * FROM recipes WHERE id_recipe = ?";

        const connection = await mysql.getConnection();
        const data = await connection.query(query, [id]);

        res.json(data[0]);
    } catch {
        res.status(400).send("Algo ha ido mal");
    }
});

// CREAR RECETA
app.post("/recipe", async (req, res) => {
    try {
        const { name, ingredients, instructions } = req.body;

        const query = "INSERT INTO recipes (name, ingredients, instructions) VALUES (?, ?, ?)";
        
        const connection = await mysql.getConnection();
        await connection.query(query, [
            name,
            ingredients,
            instructions
        ]);

        res.status(201).send("Receta creada");
    } catch {
        res.status(400).send("Algo ha ido mal");
    }
});

// ACTUALIZAR RECETA

app.put("/modify/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const { name, ingredients, instructions } = req.body;

        const query =
            "UPDATE recipes SET name = ?, ingredients = ?, instructions = ? WHERE id_recipe = ?";

        const connection = await mysql.getConnection();
        await connection.query(query, [name, ingredients, instructions, id]);

        res.send("Receta modificada");
    } catch {
        res.status(400).send("Algo ha ido mal");
    }
});

app.patch("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const query = "UPDATE recipes SET deleted_at = NOW() WHERE id_recipe = ?";

        const connection = await mysql.getConnection();
        await connection.query(query, [id]);

       res.status(400).send("Algo ha ido mal");
    } catch {
        res.send("Algo ha ido mal");
    }
});


