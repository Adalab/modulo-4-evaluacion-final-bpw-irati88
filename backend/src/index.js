const express = require("express");
const cors = require("cors");
const { authenticateToken } = require("./middlewares/authenticate-token");
const {
  postSignupController,
  postLoginController,
  getRecipesController,
  getRecipeIdController,
  postRecipeController,
  putRecipeIdController,
  patchRecipeIdController,
} = require("./controllers");
const app = express();
const port = 3000;

require("dotenv").config();

app.use(express.json({ limit: "25mb" }));

app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Endpoints USUARIO

// REGISTRO USUARIO
app.post("/signup", postSignupController);

// INICIO DE SESIÓN
app.post("/login", postLoginController);

// Endpoints RECETAS

// COGER RECETAS
app.get("/recipes", authenticateToken, getRecipesController);

// COGER RECETA ESPECÍFICA
app.get("/recipe/:id", authenticateToken, getRecipeIdController);

// CREAR RECETA
app.post("/recipe", authenticateToken, postRecipeController);

// ACTUALIZAR RECETA
app.put("/recipe/:id", authenticateToken, putRecipeIdController);

// ELIMINAR RECETA
app.patch("/recipe/:id", authenticateToken, patchRecipeIdController);
