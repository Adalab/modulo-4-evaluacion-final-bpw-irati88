const express = require("express");
const cors = require("cors");
const {
  getRecipesController,
  getRecipeIdController,
  postRecipeController,
  putRecipeIdController,
  patchRecipeIdController,
  postSignupController,
  postLoginController,
} = require("./controllers");
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
app.get("/recipes", getRecipesController);

// COGER RECETA ESPECÍFICA
app.get("/recipe/:id", getRecipeIdController);

// CREAR RECETA
app.post("/recipe", postRecipeController);

// ACTUALIZAR RECETA
app.put("/recipe/:id", putRecipeIdController);

// ELIMINAR RECETA
app.patch("/recipe/:id", patchRecipeIdController);


// Endpoints USUARIO

app.get("ruta");
// REGISTRO USUARIO
app.post("/signup", postSignupController);

// INICIO DE SESIÓN
app.post("/login", postLoginController);
