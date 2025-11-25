const mysql = require("../database/mysql-pool");

const postRecipeController = async (req, res) => {
  try {
    const { name, ingredients, instructions } = req.body;

    // Tengo que validar que los campos sean correctos
    if (!name || !ingredients || !instructions) {
      return res.status(400).send("Faltan campos obligatorios");
    }

    if (
      typeof name !== "string" ||
      typeof ingredients !== "string" ||
      typeof instructions !== "string"
    ) {
      return "Los campos deben ser texto";
    }
    const query =
      "INSERT INTO recipes (name, ingredients, instructions) VALUES (?, ?, ?)";

    const connection = await mysql.getConnection();
    await connection.query(query, [name, ingredients, instructions]);

    res.send("Receta creada");
  } catch {
    res.send("Algo ha ido mal");
  }
};

module.exports = {
  postRecipeController,
};
