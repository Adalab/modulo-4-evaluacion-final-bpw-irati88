const mysql = require("../database/mysql-pool");

const postRecipeController = async (req, res) => {
  try {
    const { name, ingredients, instructions } = req.body;
    const { id_user } = req.user;

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
      "INSERT INTO recipes (name, ingredients, instructions, fk_user) VALUES (?, ?, ?, ?)";

    const connection = await mysql.getConnection();
    await connection.query(query, [name, ingredients, instructions, id_user]);

    res.send("Receta creada");
  } catch (error) {
    res.status(500).send("Algo ha salido mal");
  }
};

module.exports = {
  postRecipeController,
};
