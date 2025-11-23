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

// Endpoints RECETAS

// COGER RECETAS
app.get("/recipes", async (req, res) => {
  try {
    const query = "SELECT * FROM recipes WHERE deleted_at IS NULL";

    const connection = await mysql.getConnection();
    const data = await connection.query(query);
    res.json(data[0]);
  } catch {
    res.send("Algo ha ido mal");
  }
});

// COGER RECETA ESPECÍFICA
app.get("/recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query =
      "SELECT * FROM recipes WHERE id_recipe = ? AND deleted_at IS NULL";

    const connection = await mysql.getConnection();
    const data = await connection.query(query, [id]);

    res.json(data[0]);
  } catch {
    res.send("Algo ha ido mal");
  }
});

// CREAR RECETA
app.post("/recipe", async (req, res) => {
  try {
    const { name, ingredients, instructions } = req.body;

    // Tengo que validar que los campos sean correctos
    if (!name || !ingredients || !instructions) {
      return res.status(400).send("Faltan campos obligatorios");
    }

    const query =
      "INSERT INTO recipes (name, ingredients, instructions) VALUES (?, ?, ?)";

    const connection = await mysql.getConnection();
    await connection.query(query, [name, ingredients, instructions]);

    res.send("Receta creada");
  } catch {
    res.send("Algo ha ido mal");
  }
});

// ACTUALIZAR RECETA
app.put("/recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { name, ingredients, instructions } = req.body;

    // Tengo que validar que los campos sean correctos
    if (!name || !ingredients || !instructions) {
      return res.status(400).send("Faltan campos obligatorios");
    }

    const query =
      "UPDATE recipes SET name = ?, ingredients = ?, instructions = ? WHERE id_recipe = ?";

    const connection = await mysql.getConnection();
    await connection.query(query, [name, ingredients, instructions, id]);

    res.send("Receta actualizada");
  } catch {
    res.send("Algo ha ido mal");
  }
});

// ELIMINAR RECETA
app.patch("/recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = "UPDATE recipes SET deleted_at = NOW() WHERE id_recipe = ?";

    const connection = await mysql.getConnection();
    await connection.query(query, [id]);

    res.send("Receta eliminada");
  } catch {
    res.send("Algo ha ido mal");
  }
});

// Endpoints USUARIOS

// REGISTRO USUARIO
app.post("/registro", async (req, res) => {
  try {
  } catch {
    res.send("Algo ha ido mal");
  }
});

// INICIO DE SESIÓN
app.post("/login", async (req, res) => {
  try {
  } catch {
    res.send("Algo ha ido mal");
  }
});
