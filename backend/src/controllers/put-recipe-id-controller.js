const mysql = require("../database/mysql-pool");

const putRecipeIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, instructions } = req.body;

    // Tengo que validar que los campos sean correctos
    if (isNaN(Number(id))) {
      return res.status(400).send("ID inválido");
    }

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
      "UPDATE recipes SET name = ?, ingredients = ?, instructions = ? WHERE id_recipe = ?";

    const connection = await mysql.getConnection();
    await connection.query(query, [name, ingredients, instructions, id]);

    res.send("Receta actualizada");
  } catch {
    res.send("Algo ha ido mal");
  }
};

module.exports = {
  putRecipeIdController,
};
